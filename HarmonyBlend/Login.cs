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
						Utility.SetUserOnlineOrOffline(true);
					} else {
						MessageBox.Show("�ifre yanl��.", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
					}
				} catch(Exception ex) {
					MessageBox.Show(ex.Message, "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
				}
			} else {
				MessageBox.Show("Kullan�c� bulunamad�.", "Hata", MessageBoxButtons.OK, MessageBoxIcon.Error);
			}
		}

		#endregion

		public void GetUserDataByName(string name) {
			string userID = "", username = "", password = "", email = "", userType = "", userBrand = "", status = "";

			var usersTable = new ORMBase<Entity.Users>().Select()?.Data;
			var sellersTable = new ORMBase<Entity.Sellers>().Select()?.Data;

			// Kullan�c�lar tablosunda arama (adminler icin)
			var userRow = usersTable?.AsEnumerable()
									 .FirstOrDefault(row => row.Field<string>("Username") == name);
			if(userRow != null) {
				userID = userRow.Field<int>("ID").ToString() ?? "";
				username = userRow.Field<string>("Username") ?? "";
				password = userRow.Field<string>("Password") ?? "";
				email = userRow.Field<string>("Email") ?? "";
				status = userRow.Field<bool>("Status").ToString() ?? "";
				userType = "ADMIN"; // Kullan�c� t�r� belirtilmeli
				userBrand = "MERKEZ"; // Kullan�c� markas� (varsay�lan olarak bo�)
			} else {
				// Sat�c�lar tablosunda arama (bayiler icin)
				var sellerRow = sellersTable?.AsEnumerable()
											 .FirstOrDefault(row => row.Field<string>("Name") == name);
				if(sellerRow != null) {
					userID = sellerRow.Field<int>("ID").ToString() ?? "";
					userBrand = sellerRow.Field<string>("Brand") ?? "";
					username = sellerRow.Field<string>("Name") ?? "";
					password = sellerRow.Field<string>("Password") ?? "";
					email = sellerRow.Field<string>("Email") ?? "";
					status = sellerRow.Field<bool>("Status").ToString() ?? "";
					userType = "User"; // Sat�c� t�r� belirtilmeli
				}
			}

			// Save user informations to app.config using by ConfiguteManager
			
			Utility.CurrentUserID = userID;
			Utility.CurrentUserName = username;
			Utility.Password = password;
			Utility.Email = email;
			Utility.UserType = userType;
			Utility.UserBrand = userBrand;
			Utility.Status = status;
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
