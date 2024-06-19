
using HarmonyBlend.ORM;
using HarmonyBlend.Utilities;
using System.Data;

namespace HarmonyBlend
{
	public partial class Login : Form
	{
		public Login() {
			InitializeComponent();
		}

		#region Events
		private void Exit_button_Click(object sender, EventArgs e) {
			Application.Exit();
		}

		private void Login_button_Click(object sender, EventArgs e) {
			GetUserDataByName(username_textBox.Text);

			if(!string.IsNullOrEmpty(Utility.CurrentUserName)) {
				try {
					if(Utility.Password.Equals(password_maskedTextBox.Text)) {
						MainForm mainform = new MainForm(Utility.CurrentUserName.ToUpper(), Utility.CurrentUserID);
						mainform.Show();
						this.Hide();
					} else {
						MessageBox.Show("Þifre yanlýþ.", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
					}
				} catch(Exception ex) {
					MessageBox.Show(ex.Message, "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
				}
			} else {
				MessageBox.Show("Kullanýcý bulunamadý.", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
			}
		}

		#endregion

		public void GetUserDataByName(string name) {
			string username = "", password = "", userID = "", userType = "", userBrand = "";

			var usersTable = new ORMBase<Entity.Users>().Select()?.Data;
			var sellersTable = new ORMBase<Entity.Sellers>().Select()?.Data;

			// Kullanýcýlar tablosunda arama (adminler icin)
			var userRow = usersTable?.AsEnumerable()
									 .FirstOrDefault(row => row.Field<string>("Username") == name);
			if(userRow != null) {
				username = userRow.Field<string>("Username") ?? "";
				password = userRow.Field<string>("Password") ?? "";
				userID = userRow.Field<Int16>("UserID").ToString() ?? "";
				userType = "ADMIN"; // Kullanýcý türü belirtilmeli
				userBrand = "MERKEZ"; // Kullanýcý markasý (varsayýlan olarak boþ)
			} else {
				// Satýcýlar tablosunda arama (bayiler icin)
				var sellerRow = sellersTable?.AsEnumerable()
											 .FirstOrDefault(row => row.Field<string>("Name") == name);
				if(sellerRow != null) {
					userID = sellerRow.Field<Int16>("ID").ToString() ?? "";
					username = sellerRow.Field<string>("Name") ?? "";
					password = sellerRow.Field<string>("Password") ?? "";
					userType = "User"; // Satýcý türü belirtilmeli
					userBrand = sellerRow.Field<string>("Brand") ?? "";
				}
			}

			// Save user informations to app.config using by ConfiguteManager
			Utility.CurrentUserID = userID;
			Utility.CurrentUserName = username;
			Utility.Password = password;
			Utility.UserType= userType;
			Utility.UserBrand = userBrand;
		}


		private void button1_Click(object sender, EventArgs e) {
			new MainForm("ADMIN", "-1").Show();
		}

		private void password_maskedTextBox_KeyDown(object sender, KeyEventArgs e) {
			if(e.KeyCode == Keys.Enter) {
				login_button.PerformClick();
			}
		}

		private void username_textBox_Leave(object sender, EventArgs e) {
			((TextBox)sender).Text = username_textBox.Text.ToUpper();
		}
	}
}
