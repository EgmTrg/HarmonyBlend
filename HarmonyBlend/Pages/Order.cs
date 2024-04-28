﻿using HarmonyBlend.Pages.Order;
using HarmonyBlend.Properties;
using System.Data;
using System.Globalization;
using System.Security.AccessControl;
using System.Windows.Forms;
using HarmonyBlend.Utilities;

namespace HarmonyBlend.Pages
{
	public partial class Orders : Form, IPages_Mdi
	{
		public Orders() {
			InitializeComponent();
		}

		private void Order_Load(object sender, EventArgs e) {
			DataGridStyle();
			CreateRows();
			DataGridSettings();

			totalOrderCount_label.Text = 0.ToString();
			totalKDV_label.Text = 0.ToString();
			totalPayment_label.Text = 0.ToString();
		}

		private void CreateRows() {
			var productsORM = new ORM.TableORMs.ProductsORM();
			DataTable activeProducts = productsORM.GetActiveProducts();
			foreach(DataRow product in activeProducts.Rows) {
				DataGridViewRow row = new DataGridViewRow();
				if(product != null) {
					row.CreateCells(dataGridView1);

					row.Cells[0].Value = Resources.no_image_64x64;
					row.Cells[1].Value = false;
					row.Cells[2].Value = false;
					row.Cells[3].Value = product.ItemArray[0]?.ToString();
					row.Cells[4].Value = product.ItemArray[1]?.ToString();
					row.Cells[6].Value = product.ItemArray[4]?.ToString();
					row.Cells[7].Value = product.ItemArray[3]?.ToString();
				}
				dataGridView1.Rows.Add(row);
			}
		}

		#region DataGridView Style And Settings
		private void DataGridSettings() {
			dataGridView1.EditMode = DataGridViewEditMode.EditOnEnter;

			dataGridView1.Columns["Image"].ReadOnly = true;
			dataGridView1.Columns["PCode"].ReadOnly = true;
			dataGridView1.Columns["PName"].ReadOnly = true;
			dataGridView1.Columns["Unit"].ReadOnly = true;
			dataGridView1.Columns["ListPrice"].ReadOnly = true;
			dataGridView1.Columns["KDV"].ReadOnly = true;
			dataGridView1.Columns["TotalPrice"].ReadOnly = true;
		}

		private void DataGridStyle() {
			Color KoyuRenk = Color.FromArgb(39, 47, 59);

			// Başlık fontu ve kalın punto
			dataGridView1.ColumnHeadersDefaultCellStyle.Font = new Font(dataGridView1.Font.FontFamily, 13, FontStyle.Bold);
			// Başlık arka plan rengi
			dataGridView1.ColumnHeadersDefaultCellStyle.BackColor = KoyuRenk;
			// Başlık metin ortalama
			dataGridView1.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
			// Başlık yazı rengi
			dataGridView1.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;

			// Satır arka plan renkleri (sıradaki satır belirtilen renk, sıradışı satır ise hafif açık renk)
			dataGridView1.RowsDefaultCellStyle.BackColor = Color.White;
			dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.White;
			//dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(KoyuRenk.R + 20, KoyuRenk.G + 20, KoyuRenk.B + 20);

			// Kenarlık rengi
			dataGridView1.GridColor = KoyuRenk;

			// Seçili hücre rengi
			dataGridView1.DefaultCellStyle.SelectionBackColor = Color.FromArgb(KoyuRenk.R + 10, KoyuRenk.G + 10, KoyuRenk.B + 10);
			dataGridView1.DefaultCellStyle.SelectionForeColor = Color.WhiteSmoke;

			// Tüm metinlerin ortalama hizalanması
			dataGridView1.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridView1.DefaultCellStyle.ForeColor = Color.FromArgb(KoyuRenk.R + 20, KoyuRenk.G + 20, KoyuRenk.B + 20);
			dataGridView1.DefaultCellStyle.Font = new Font(dataGridView1.Font.FontFamily, 11);
		}

		#endregion

		#region Events
		private void productName_textBox_TextChanged(object sender, EventArgs e) {
			string searchText = (sender as TextBox).Text.ToUpper();

			foreach(DataGridViewRow row in dataGridView1.Rows) {
				if(!string.IsNullOrEmpty(row.Cells[4].Value.ToString()) || row.Cells[4].Value.ToString().Contains(searchText)) {
					row.Visible = true;
					break;
				}
			}
		}

		private void dataGridView1_EditingControlShowing(object sender, DataGridViewEditingControlShowingEventArgs e) {
			if(e.Control is TextBox textBox) {
				textBox.KeyPress += TextBox_KeyPress;
			}
		}

		private void TextBox_KeyPress(object? sender, KeyPressEventArgs e) {
			if(!char.IsDigit(e.KeyChar) && e.KeyChar != 8 && e.KeyChar != 127 && e.KeyChar != 22 && e.KeyChar != 3 && e.KeyChar != 24 && e.KeyChar != 26) {
				e.Handled = true;
			}
		}
		#endregion

		#region Control for Amount Value

		#region Detect Column
		private bool IsInvalidRowIndex(int rowIndex) {
			return rowIndex < 0 || rowIndex >= dataGridView1.Rows.Count;
		}

		private bool IsAmountColumn(int columnIndex) {
			return columnIndex == 5;
		}

		private bool IsCheckColumn(int columnIndex) {
			return columnIndex == 2;
		}
		#endregion

		private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e) {
			if(IsInvalidRowIndex(e.RowIndex) || dataGridView1.Rows[e.RowIndex].IsNewRow)
				return;

			int columnIndex = e.ColumnIndex;

			if(IsAmountColumn(columnIndex) || IsCheckColumn(columnIndex))
				HandleAmountOrCheckColumnChange(e);
		}

		private void HandleAmountOrCheckColumnChange(DataGridViewCellEventArgs e) {
			int rowIndex = e.RowIndex;

			if(IsAmountColumn(e.ColumnIndex))
				CalculateTotalPriceAndKDV(rowIndex);
		}

		private void CalculateTotalPriceAndKDV(int rowIndex) {
			var amountCell = dataGridView1.Rows[rowIndex].Cells[5];
			if(amountCell.Value != null && float.Parse(amountCell.Value.ToString()) != 0f) {
				CalculateTotalPriceForRow(rowIndex);
				CalculateTotalKDVForRow(rowIndex);
				SetValueToCell(rowIndex, "Check", true);
			} else {
				ClearCorrespondingRow(rowIndex);
			}
		}

		private void CalculateTotalPriceForRow(int rowIndex) {
			float unitPrice = 0f;
			float.TryParse(dataGridView1.Rows[rowIndex].Cells[7].Value.ToString(), CultureInfo.InvariantCulture.NumberFormat, out unitPrice);
			float amount = 0f;
			float.TryParse(dataGridView1.Rows[rowIndex].Cells[5].Value.ToString(), CultureInfo.InvariantCulture.NumberFormat, out amount);

			if(unitPrice != 0f && amount != 0f) {
				float total_Price = amount * unitPrice;
				SetValueToCell(rowIndex, "TotalPrice", total_Price.ToString("C", new CultureInfo("tr-TR")));
			}
		}

		private void CalculateTotalKDVForRow(int rowIndex) {
			var totalPriceCell = dataGridView1.Rows[rowIndex].Cells[9];
			if(totalPriceCell.Value != null) {
				float total_KDV = totalPriceCell.Value.ToString().CurrencyToFloat() * 0.01f;
				SetValueToCell(rowIndex, "KDV", total_KDV.FloatToCurrency());
			}
		}

		private void SetValueToCell(int rowIndex, string columnName, object? newValue) {
			dataGridView1.Rows[rowIndex].Cells[columnName].Value = newValue;
		}

		private void ClearCorrespondingRow(int rowIndex) {
			SetValueToCell(rowIndex, "Amount", null);
			SetValueToCell(rowIndex, "Check", false);
			SetValueToCell(rowIndex, "TotalPrice", null);
			SetValueToCell(rowIndex, "KDV", null);
		}
		#endregion

		private void Order_Button_Click(object sender, EventArgs e) {
			for(int i = 0; i < dataGridView1.Rows.Count; i++) {
				var currentRow = dataGridView1.Rows[i];
				if((bool)currentRow.Cells[2].Value == true) {
					CartItem item = new CartItem(currentRow);
					var result = CartManager.AddToCart(item);
					if(!result.isSuccess) {
						MessageBox.Show(result.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
						return;
					}
				}
			}
			MessageBox.Show("All products added successfully.", "Added Successfully!", MessageBoxButtons.OK, MessageBoxIcon.Information);
		}

		private void getCartInfos_button_Click(object sender, EventArgs e) {
			string allInfos = "__Informations__ \n";

			if(CartManager.ListOfProducts is null) {
				MessageBox.Show("Cart is Empty. ListOfProducts is null", "Cart Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
			} else {
				foreach(var item in CartManager.ListOfProducts) {
					allInfos += '\n' + item.GetDetailsAnItem();
				}
			}

			MessageBox.Show('\n' + allInfos);
		}
	}
}
