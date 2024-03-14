using HarmonyBlend.Entity;
using System.Data;

namespace HarmonyBlend.Pages
{
	public partial class Settings : Form, IPages_Mdi
	{
		public Settings() {
			InitializeComponent();
		}

		private void deleteProduct_button_Click(object sender, EventArgs e) {
			deleteActivate_checkBox.Checked = false;
		}

		private void checkBox1_CheckedChanged(object sender, EventArgs e) {
			if(((CheckBox)sender).Checked == true) {
				deleteProduct_button.Enabled = true;
			} else {
				deleteProduct_button.Enabled = false;
			}
		}

		private void Settings_Load(object sender, EventArgs e) {
			allProducts_dataGridView.DataSource = new ORM.TableORMs.ProductsORM().GetActiveProducts();
			activeProducts_dataGridView.DataSource = new ORM.TableORMs.ProductsORM().GetActiveProducts(activePassive: false);

			allProducts_dataGridView.DefaultCellStyle.ForeColor = Color.Black;
			activeProducts_dataGridView.DefaultCellStyle.ForeColor = Color.Black;
		}

		private void allProducts_dataGridView_CellContentClick(object sender, DataGridViewCellEventArgs e) {
			DataGridViewRow selectedRow = allProducts_dataGridView.Rows[e.RowIndex];

			productCode_maskedTextBox.Text = selectedRow.Cells[0].Value.ToString();
			productName_textBox.Text = selectedRow.Cells[1].Value.ToString();
			productPrice_textbox.Text = selectedRow.Cells[3].Value.ToString();
			productUnit_comboBox.Text = selectedRow.Cells[4].Value.ToString();
			activePassive_comboBox.Text = selectedRow.Cells[5].Value.ToString() == 1.ToString() ? "Aktif" : "Pasif";
		}
	}
}
