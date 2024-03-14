using HarmonyBlend.ORM;
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
			var userDataRow = GetOneDataRowByName(username_textBox.Text);

			if(userDataRow is not null) {
				try {
					string username = userDataRow.Field<string>("Username") ?? "";
					string password = userDataRow.Field<string>("Password") ?? "";
					if(username.Equals(username_textBox.Text) && password.Equals(password_maskedTextBox.Text)) {
						MainForm mainform = new MainForm(username.ToUpper());
						mainform.Show();
						this.Hide();
					}
				} catch(Exception ex) {
					MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
					throw;
				}

			}
		}
		#endregion

		public DataRow? GetOneDataRowByName(string name) {
			var selectDT = new ORMBase<Entity.Users>().Select();
			if(selectDT is null) {
				throw new DeletedRowInaccessibleException();
			}

			return selectDT.AsEnumerable()
						   .Where(row => row.Field<string>("Username") == name)
						   .FirstOrDefault();
		}

		private void button1_Click(object sender, EventArgs e) {
			new MainForm("ADMIN").Show();
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
