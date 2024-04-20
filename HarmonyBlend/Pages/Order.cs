using HarmonyBlend.Properties;
using System.Data;

namespace HarmonyBlend.Pages
{
	public partial class Order : Form, IPages_Mdi
	{
		public Order() {
			InitializeComponent();
		}

		private void Order_Load(object sender, EventArgs e) {
			DataGridStyle();
			CreateRows();
			DataGridSettings();
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

		#region Control for Amount Value
		private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e) {
			if(e.RowIndex < 0 || e.RowIndex >= dataGridView1.Rows.Count || dataGridView1.Rows[e.RowIndex].IsNewRow)
				return;

			if(e.ColumnIndex == 5) {
				DataGridViewCell amountCell = dataGridView1.Rows[e.RowIndex].Cells[5];

				// Önce amountCell.Value'ın null olup olmadığını kontrol edin
				if(amountCell.Value == null || string.IsNullOrEmpty(amountCell.Value.ToString()) || amountCell.Value.ToString() == "0") {
					dataGridView1.Rows[e.RowIndex].Cells[2].Value = false;
				}

				// Ardından amountCell.Value'ı null değilse ve int'e dönüştürülebilirse işlem yapın
				int miktar;
				if(amountCell.Value != null && int.TryParse(amountCell.Value.ToString(), out miktar) && miktar >= 1) {
					dataGridView1.Rows[e.RowIndex].Cells[2].Value = true;
				}
			}
		}

		private void dataGridView1_EditingControlShowing(object sender, DataGridViewEditingControlShowingEventArgs e) {
			if(e.Control is TextBox) {
				TextBox textBox = (TextBox)e.Control;
				textBox.KeyPress += TextBox_KeyPress;
			}
		}

		private void TextBox_KeyPress(object? sender, KeyPressEventArgs e) {
			if(!char.IsDigit(e.KeyChar) && e.KeyChar != 8 && e.KeyChar != 127 && e.KeyChar != 22 && e.KeyChar != 3 && e.KeyChar != 24 && e.KeyChar != 26) {
				// Geçersiz bir karakter olduğunu belirtmek için olayı işaretle
				e.Handled = true;
			}
		}
		#endregion
	}
}
