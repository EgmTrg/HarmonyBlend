using System.Runtime.InteropServices;

namespace HarmonyBlend.UserControls
{
	public partial class Header : UserControl
	{
		private Form BaseForm { get; set; }

		public Header() {
			InitializeComponent();
		}

		private void Header_Paint(object sender, PaintEventArgs e) {
			BaseFormControl();
			BaseForm = FindForm();
		}

		#region ControlBox
		private void exit_button_Click(object sender, EventArgs e) {
			BaseFormControl();
			BaseForm.Close(); // not enabled
							  //BaseForm.Dispose(); // not enabled
		}

		private void minimize_button_Click(object sender, EventArgs e) {
			BaseFormControl();
			BaseForm.WindowState = FormWindowState.Minimized; // not enabled
		}

		private void maximaze_button_Click(object sender, EventArgs e) {
			BaseFormControl();
			if(BaseForm.WindowState == FormWindowState.Normal) {
				BaseForm.WindowState = FormWindowState.Maximized;
			} else {
				BaseForm.WindowState = FormWindowState.Normal;
			}
		}

		#endregion

		#region ControlBox - Header
		public const int WM_NCLBUTTONDOWN = 0XA1;
		public const int HTCAPTION = 0x2;
		[DllImport("user32.dll")] public static extern bool ReleaseCapture();
		[DllImport("user32.dll")] public static extern int SendMessage(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

		private void HeaderMouseDown_Event(object sender, MouseEventArgs e) {
			try {
				if(e.Button == MouseButtons.Left) {
					ReleaseCapture();
					SendMessage(BaseForm.Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
				}
			} catch(Exception ex) {
				throw;
			}
		}
		#endregion

		private void button1_Click(object sender, EventArgs e) {
			BaseFormControl();
		}

		private void BaseFormControl() {
			int findCount = 1;
			if(BaseForm == null) {
				MessageBox.Show("BaseForm bulunamadi!\n BaseForm Araniyor.\n Deneme: " + findCount, "BaseForm Kontrol", MessageBoxButtons.OK, MessageBoxIcon.Error);
				if(findCount > 4) {
					MessageBox.Show("BaseForm bulunamadi!\n BaseForm bulunamadi.\n Lütfen yetkili ile iletişime geçiniz.", "BaseForm Kontrol", MessageBoxButtons.OK, MessageBoxIcon.Error);
				} else {
					findCount++;
					BaseForm = FindForm();
					button1.PerformClick();
				}
			} else {
				// MessageBox.Show("BaseForm is: " + BaseForm.Name, "BaseForm Kontrol", MessageBoxButtons.OK, MessageBoxIcon.Information);
			}
		}
	}
}
