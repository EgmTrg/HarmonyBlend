using HarmonyBlend.Utilities;
using System.Runtime.InteropServices;

namespace HarmonyBlend.Pages.Setting
{
	internal partial class NewProductForm : Form
	{
		public required List<string> all_productCode = new List<string>();
		private bool isUpdating = false;
		private int selectedKDV = 0;

		public NewProductForm() {
			InitializeComponent();
		}

		#region ControlBox

		private void exit_button_Click(object sender, EventArgs e) {
			this.Close();
			this.Dispose();
		}

		private void minimize_button_Click(object sender, EventArgs e) {
			WindowState = FormWindowState.Minimized;
		}

		private void maximaze_button_Click(object sender, EventArgs e) {
			if(WindowState == FormWindowState.Normal) {
				WindowState = FormWindowState.Maximized;
			} else {
				WindowState = FormWindowState.Normal;
			}
		}

		#endregion

		#region ControlBox - Header
		public const int WM_NCLBUTTONDOWN = 0XA1;
		public const int HTCAPTION = 0x2;
		[DllImport("user32.dll")] public static extern bool ReleaseCapture();
		[DllImport("user32.dll")] public static extern int SendMessage(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

		private void HeaderMouseDown_Event(object sender, MouseEventArgs e) {
			if(e.Button == MouseButtons.Left) {
				ReleaseCapture();
				SendMessage(Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
			}
		}
		#endregion


		private void NewProductForm_Load(object sender, EventArgs e) {
			if(all_productCode == null) {
				MessageBox.Show("Product Code List is empty. Please reopen current window.", "Datas is empty.", MessageBoxButtons.OK, MessageBoxIcon.Error);

				saveProduct_button.Enabled = false;
			}
		}

		private void saveProduct_button_Click(object sender, EventArgs e) {
			if(CheckEmpty(pShortNametextBox, "Product Name") ||
			CheckEmpty(pname_textBox, "Description") ||
			CheckEmpty(category_textBox, "Category") ||
			CheckEmpty(productUnit_comboBox, "Unit") ||
			CheckEmpty(activePassive_comboBox, "Active/Passive") ||
			CheckEmpty(KDV_except_textBox, "Price") ||
			CheckEmpty(KDV_Include_textBox, "Price")) {
				return;
			}

			var newProduct = new Entity.Products() {
				ProductID = pcode_maskedTextBox.Text,
				ProductName = pShortNametextBox.Text,
				Description = pname_textBox.Text,
				Category = category_textBox.Text,
				Unit = productUnit_comboBox.Text,
				ActivePassive = activePassive_comboBox.Text == "Aktif" ? true : false,
				KDV = selectedKDV,
				Price = Convert.ToDecimal(KDV_except_textBox.Text)
			};

			var result = new ORM.ORMBase<Entity.Products>().Insert(newProduct);

			if(result.isSuccess) {
				MessageBox.Show("Success! " + result.Message);
			} else {
				MessageBox.Show("Error! " + result.Message);
			}
		}

		private bool CheckEmpty(Control control, string fieldName) {
			if(string.IsNullOrWhiteSpace(control.Text)) {
				MessageBox.Show($"{fieldName} cannot be empty.");
				control.Focus();
				return true;
			}
			return false;
		}

		

		private void KDV_Calculate_textBox_TextChanged(object sender, EventArgs e) {
			if(isUpdating)
				return;

			try {
				// isUpdating bayrağını true yaparak güncellemenin başladığını işaret ediyoruz
				isUpdating = true;

				bool VAT_Included = false;
				decimal currentValue = 0;

				// Textbox'tan sayısal değeri güvenli şekilde okumaya çalışıyoruz
				if(!decimal.TryParse((sender as TextBox)?.Text, out currentValue))
					return;

				if((sender as TextBox)?.Name == "KDV_Include_textBox") {
					VAT_Included = true;
				}

				// Her bir RadioButton'u kontrol ediyoruz
				foreach(RadioButton VAT_radiobutton in kdv_groupBox.Controls) {
					if(VAT_radiobutton.Checked) {
						// KDV hesaplaması yapıyoruz
						selectedKDV = Convert.ToInt32(VAT_radiobutton.Text);
						(decimal VAT_Included_Value, decimal VAT_NotIncluded_Value) = CalculateKDV(currentValue, Convert.ToDecimal(VAT_radiobutton.Text) / 100);

						// İlgili textbox'ı güncelliyoruz
						if(VAT_Included)
							KDV_except_textBox.Text = VAT_NotIncluded_Value.ToString("F6");
						else
							KDV_Include_textBox.Text = VAT_Included_Value.ToString("F6");
					}
				}
			} finally {
				// isUpdating bayrağını false yaparak güncellemenin bittiğini işaret ediyoruz
				isUpdating = false;
			}
		}

		private (decimal kdvDahil, decimal kdvHaric) CalculateKDV(decimal amount, decimal kdvRate) {
			decimal kdvHaric = amount / (1 + kdvRate);
			decimal kdvDahil = amount * (1 + kdvRate);
			return (kdvDahil, kdvHaric);
		}

		private void pcode_maskedTextBox_Leave(object sender, EventArgs e) {
			if(all_productCode.Contains(pcode_maskedTextBox.Text)) {
				label5.Text = "Product Code NOT Avaliable!";
				label5.ForeColor = Color.Red;
			} else if(pcode_maskedTextBox.Text == Utility.EMPTY_MASKEDTEXTBOX) {
				label5.Text = "Product Code CAN NOT Empty!";
				label5.ForeColor = Color.Red;
			} else {
				label5.Text = "Product Code Avaliable!";
				label5.ForeColor = Color.LimeGreen;
			}
		}

		private void cancel_button_Click(object sender, EventArgs e) {
			this.Close();
		}
	}
}
