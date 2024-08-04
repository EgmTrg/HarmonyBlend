using HarmonyBlend.Pages.Cart;
using HarmonyBlend.Properties;
using System.Data;
using System.Globalization;
using HarmonyBlend.Utilities;
using Microsoft.Identity.Client.NativeInterop;

namespace HarmonyBlend.Pages
{
	public partial class Orders : Form, IPages_Mdi
	{
		private bool _ARE_PULLEDDATAS { get; set; }

		public Orders() {
			InitializeComponent();
		}

		private void Order_Load(object sender, EventArgs e) {
			Utility.DataGridStyle(dataGridView1);
			CreateRows();
			DataGridReadOnlySettings();
		}

		private void CreateRows() {
			var productsORM = new ORM.TableORMs.ProductsORM();
			DataTable activeProducts = productsORM.GetActiveProducts(true);

			foreach(DataRow product in activeProducts.Rows) {
				DataGridViewRow row = new DataGridViewRow();
				if(product != null) {
					row.CreateCells(dataGridView1);
					row.Cells[dataGridView1.Columns["Image"].Index].Value = Resources.no_image_64x64;
					row.Cells[dataGridView1.Columns["Favorite"].Index].Value = false;
					row.Cells[dataGridView1.Columns["Check"].Index].Value = false;
					row.Cells[dataGridView1.Columns["PCode"].Index].Value = product.ItemArray[0]?.ToString();
					row.Cells[dataGridView1.Columns["PName"].Index].Value = product.ItemArray[1]?.ToString();
					row.Cells[dataGridView1.Columns["Unit"].Index].Value = product.ItemArray[4]?.ToString();
					row.Cells[dataGridView1.Columns["ListPrice"].Index].Value = product.ItemArray[3]?.ToString();
					row.Cells[dataGridView1.Columns["KDVPercent"].Index].Value = product.ItemArray[7]?.ToString();

					SeperateCategories(product);
				}
				dataGridView1.Rows.Add(row);
			}
			_ARE_PULLEDDATAS = true;
		}

		private void SeperateCategories(DataRow product) {
			string? category = product.ItemArray[6]?.ToString();
			bool categoryFound = false;
			foreach(string item in categories_checkedListBox.Items) {
				if(item == category) {
					categoryFound = true;
				}
			}
			if(!categoryFound && category is not null) {
				categories_checkedListBox.Items.Add(category);
			}
		}

		#region DataGridView Custom Settings
		private void DataGridReadOnlySettings() {
			dataGridView1.EditMode = DataGridViewEditMode.EditOnEnter;

			dataGridView1.Columns["Image"].ReadOnly = true;
			dataGridView1.Columns["PCode"].ReadOnly = true;
			dataGridView1.Columns["PName"].ReadOnly = true;
			dataGridView1.Columns["Unit"].ReadOnly = true;
			dataGridView1.Columns["ListPrice"].ReadOnly = true;
			dataGridView1.Columns["KDV"].ReadOnly = true;
			dataGridView1.Columns["TotalPrice"].ReadOnly = true;
			dataGridView1.Columns["KDVPercent"].ReadOnly = true;
		}

		#endregion

		#region Events
		private void productName_textBox_TextChanged(object sender, EventArgs e) {
			string? searchText = (sender as TextBox)?.Text.ToUpper();

			if(searchText is not null) {
				foreach(DataGridViewRow row in dataGridView1.Rows) {
					string? productName = row.Cells[4].Value.ToString();
					if(!string.IsNullOrEmpty(productName) && productName.Contains(searchText)) {
						row.Visible = true;
					} else {
						row.Visible = false;
					}
				}
			}
		}

		private void productCode_maskedTextBox_TextChanged(object sender, EventArgs e) {
			string? searchText = (sender as MaskedTextBox)?.Text;

			if((searchText == Utility.EMPTY_MASKEDTEXTBOX) || searchText is null) {
				foreach(DataGridViewRow row in dataGridView1.Rows) {
					row.Visible = true;
				}
			} else {
				foreach(DataGridViewRow row in dataGridView1.Rows) {
					string? productCode = row.Cells[dataGridView1.Columns["PCode"].Index].Value.ToString();
					if(!string.IsNullOrEmpty(productCode) && productCode.StartsWith(searchText)) {
						row.Visible = true;
					} else {
						row.Visible = false;
					}
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

		private void AddAllProductsToCart_Button_Click(object sender, EventArgs e) {
			int addedCount = 0;
			for(int i = 0; i < dataGridView1.Rows.Count; i++) {
				var currentRow = dataGridView1.Rows[i];
				if((bool)currentRow.Cells[2].Value == true /*&& int.Parse(currentRow.Cells["Amount"].Value) > 0*/) {
					CartItem item = new CartItem(currentRow);
					var result = CartManager.AddToCart(item);
					if(!result.isSuccess) {
						MessageBox.Show(result.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
					}
					addedCount++;
				}
			}
			if(addedCount > 0) {
				MessageBox.Show("All products added successfully.", "Added Successfully!", MessageBoxButtons.OK, MessageBoxIcon.Information);
			} else {
				MessageBox.Show("Could't found any checked product.", "Warning!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
			}
		}

		private void getCartInfos_button_Click(object sender, EventArgs e) {
			CartDetails cartDetails = new CartDetails("Cart Details");
			cartDetails.ShowDialog();

			DialogResult = MessageBox.Show("Sepetiniz Temizlensin mi?", "Sepet", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
			if(DialogResult == DialogResult.Yes) {
				CartManager.ClearCart();
				clearSelected_button.PerformClick();
			}
		}

		private void clearCart_button_Click(object sender, EventArgs e) {
			DialogResult dialogResult = MessageBox.Show("Are you sure about clear the cart?", "Clear the Cart", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

			if(dialogResult == DialogResult.Yes)
				CartManager.ClearCart();
		}

		private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e) {
			if(_ARE_PULLEDDATAS) {
				if(e.ColumnIndex == dataGridView1.Columns["Amount"].Index) {
					CalculatePriceAndKDV(e.RowIndex);
					UpdateLabels();
				}
			}
		}

		private void CalculatePriceAndKDV(int rowIndex) {
			DataGridViewRow row = dataGridView1.Rows[rowIndex];

			int amountValue = Convert.ToInt32(row.Cells["Amount"].Value);
			int kdvPercent = Convert.ToInt32(row.Cells["KDVPercent"].Value);
			decimal listPrice = Convert.ToDecimal(row.Cells["ListPrice"].Value);

			float totalPrice = (float)listPrice * amountValue;
			float kdv = totalPrice * kdvPercent / 100f;

			row.Cells["TotalPrice"].Value = totalPrice.FloatToCurrency();
			row.Cells["KDV"].Value = kdv.FloatToCurrency();

			// Checks the check column if new amount is upper than zero
			dataGridView1.Rows[rowIndex].Cells["Check"].Value = amountValue > 0;
		}

		private void UpdateLabels() {
			decimal total_Amount = 0m, total_Price = 0m, total_KDV = 0m;
			foreach(DataGridViewRow row in dataGridView1.Rows) {
				if(row.Cells["Amount"].Value != null && Convert.ToInt32(row.Cells["Amount"].Value) > 0) {
					total_Amount += Convert.ToDecimal(row.Cells["Amount"].Value);
					total_Price += Convert.ToDecimal(row.Cells["TotalPrice"].Value?.ToString()?.CurrencyToFloat());
					total_KDV += Convert.ToDecimal(row.Cells["KDV"].Value?.ToString()?.CurrencyToFloat());
				}
			}
			totalOrderCount_label.Text = total_Amount.ToString();
			totalPayment_label.Text = total_Price.ToString("C");
			totalKDV_label.Text = total_KDV.ToString("C");
		}

		private void clearFilter_button_Click(object sender, EventArgs e) {
			productName_textBox.Clear();
			for(int i = 0; i < categories_checkedListBox.Items.Count; i++) {
				categories_checkedListBox.SetItemCheckState(i, CheckState.Unchecked);
			}
			categories_checkedListBox.SetItemCheckState(0, CheckState.Checked);
		}

		private void clearSelected_button_Click(object sender, EventArgs e) {
			foreach(DataGridViewRow row in dataGridView1.Rows) {
				row.Cells["Amount"].Value = null;
				row.Cells["Check"].Value = CheckState.Unchecked;
			}
		}
	}
}
