using HarmonyBlend.Entity;
using HarmonyBlend.ORM;
using HarmonyBlend.Pages.Order;
using HarmonyBlend.Pages.Setting;
using HarmonyBlend.Utilities;
using System.Data;

namespace HarmonyBlend.Pages
{
	public partial class Settings : Form, IPages_Mdi
	{
		public Settings() {
			InitializeComponent();
		}

		#region Events
		private void Settings_Load(object sender, EventArgs e) {
			allProducts_dataGridView.DataSource = new ORM.TableORMs.ProductsORM().GetActiveProducts();
			activeProducts_dataGridView.DataSource = new ORM.TableORMs.ProductsORM().GetActiveProducts(false);

			allProducts_dataGridView.DefaultCellStyle.ForeColor = Color.Black;
			activeProducts_dataGridView.DefaultCellStyle.ForeColor = Color.Black;

			SetCategoriesValues();

			activePassive_comboBox.SelectedIndex = 1;
			activePassive_AllProducts_comboBox.SelectedIndex = 0;
			category_comboBox.SelectedIndex = 0;
			category_AllProducts_comboBox.SelectedIndex = 0;
		}

		private void deleteProduct_button_Click(object sender, EventArgs e) {
			deleteActivate_checkBox.Checked = false;
		}

		private void deleteActivate_checkBox_CheckedChanged(object sender, EventArgs e) {
			/*if(((CheckBox)sender).Checked == true) {
				deleteProduct_button.Enabled = true;
			} else {
				deleteProduct_button.Enabled = false;
			}*/

			deleteProduct_button.Enabled = ((CheckBox)sender).CheckState == CheckState.Checked;
		}

		private void allProducts_dataGridView_CellClick(object sender, DataGridViewCellEventArgs e) {
			// When clicking on any row in the Datagridview, all product data in that row will be copied to the textbox and combobox.
			// Then we will be able to make changes to the product data.

			if(e.RowIndex != -1) {
				DataGridViewRow selectedRow = allProducts_dataGridView.Rows[e.RowIndex];

				productCode_maskedTextBox.Text = selectedRow.Cells[0].Value.ToString();
				productName_textBox.Text = selectedRow.Cells[1].Value.ToString();
				desc_textBox.Text = selectedRow.Cells[2].Value.ToString();
				productPrice_textbox.Text = selectedRow.Cells[3].Value.ToString();
				productUnit_comboBox.SelectedItem = selectedRow.Cells[4].Value.ToString();
				activePassive_AllProducts_comboBox.SelectedItem = selectedRow.Cells[5].Value.ToString() == "True" ? "Aktif" : "Pasif";
				category_AllProducts_comboBox.Text = selectedRow.Cells[6].Value.ToString();
			}
		}

		private void refreshData_AllProducts_button_Click(object sender, EventArgs e) {
			RefreshDataGridViews(true);
		}

		private void RefreshDataGridViews(bool willUseFilter = false) {
			if(willUseFilter == false) {
				allProducts_dataGridView.DataSource = new ORM.TableORMs.ProductsORM().GetActiveProducts();
				return;
			}

			var productORM = new ORM.TableORMs.ProductsORM();
			DataTable dataTable = productORM.GetProducts_Settings(
				productCodeBegin: productCodeBegin_maskedTextBox.Text,
				productCodeEnd: productCodeEnd_maskedTextBox.Text,
				category: category_comboBox.Text,
				activity: activePassive_comboBox.Text == "Aktif");

			if(allProducts_radioButton.Checked) {
				allProducts_dataGridView.DataSource = dataTable;
			} else {
				activeProducts_dataGridView.DataSource = dataTable;
			}
		}

		private void addProduct_button_Click(object sender, EventArgs e) {
			List<string> all_productCode = AllProductsColumnDatasToList("ProductID");

			NewProductForm newProduct = new NewProductForm() {
				all_productCode = all_productCode
			};
			newProduct.ShowDialog();
		}

		private void saveChanges_button_Click(object sender, EventArgs e) {
			if(productCode_maskedTextBox.Text.StartsWith(' ')) {
				MessageBox.Show("Ürün kodu boş olduğundan dolayı herhangi bir veri kaydedilemiyor.\n" +
					"Lütfen yukarıdaki veri tablosundan değişiklik yapmak istediğiniz ürünü tıklayınız.", "İşlem Başlatılamadı!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
				return;
			}

			DialogResult saveChanges = MessageBox.Show("Değişiklikleri kaydetmek istiyor musunuz?", "Kaydet!", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
			Result_ORM<bool> result = new();

			if(saveChanges == DialogResult.Yes) {
				Products product = new() {
					ProductName = productName_textBox.Text,
					Price = decimal.Parse(productPrice_textbox.Text),
					Unit = productUnit_comboBox.Text,
					ActivePassive = activePassive_AllProducts_comboBox.Text == "Aktif",
					Category = category_AllProducts_comboBox.Text,
					Description = desc_textBox.Text
				};
				if(!changePCode_checkBox.Checked) {
					MessageBox.Show("Ürün kodu değiştirme daha yapılmadı. Yapım Aşamasında");
				} else {
					MessageBox.Show("Ürün kodu değiştirme daha yapılmadı. Yapım Aşamasında");
				}
			}
			MessageBox.Show("Message: " + result.Message);

			if(result.isSuccess) {
				allProducts_radioButton.Checked = true;
				RefreshDataGridViews(false);
			}
		}

		#endregion

		private List<string> AllProductsColumnDatasToList(string columnName) {
			List<string> category_items = new List<string>();

			int index = allProducts_dataGridView.Columns[columnName].Index;
			foreach(DataGridViewRow row in allProducts_dataGridView.Rows) {
				if(row.Cells[index].Value != null) {
					category_items.Add(row.Cells[index].Value.ToString());
				}
			}
			return category_items;
		}

		private void SetCategoriesValues() {
			List<string> category_items = AllProductsColumnDatasToList("Category");
			category_comboBox.Items.AddRange(category_items.Distinct().ToArray());
			category_AllProducts_comboBox.Items.AddRange(category_items.Distinct().ToArray());
		}

		private void changePCode_checkBox_CheckedChanged(object sender, EventArgs e) {
			if(changePCode_checkBox.Checked) {
				productCode_maskedTextBox.Enabled = true;
			} else {
				productCode_maskedTextBox.Enabled = false;
			}
		}

		private void connectionTestDB_button_Click(object sender, EventArgs e) {
			try {
				var result = ORM.Tools.ConnectionTest();
				if(result)
					MessageBox.Show("Veritabanına başarıyla bağlandı.", "Bağlantı Denemesi", MessageBoxButtons.OK, MessageBoxIcon.Information);
				else
					MessageBox.Show("Veritabanı bağlantısı başarısız oldu.", "Bağlantı Denemesi", MessageBoxButtons.OK, MessageBoxIcon.Information);
			} catch(Exception ex) {
				Console.WriteLine("Veritabanı bağlantı test edilirken hata meydana geldi: \n\n" + ex.Message, "Bağlantı Denemesi", MessageBoxButtons.OK, MessageBoxIcon.Error);
			}
		}
	}
}
