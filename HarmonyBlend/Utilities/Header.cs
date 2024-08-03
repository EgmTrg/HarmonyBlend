using System.Runtime.InteropServices;

namespace HarmonyBlend.Utilities
{
	public partial class Header : UserControl
	{
		private Form BaseForm;

		public Header() {
			InitializeComponent();
			this.Load += Header_Load;
			this.MouseDown += HeaderMouseDown_Event;
		}

		private void Header_Load(object? sender, EventArgs e) {
			BaseForm = this.FindForm();

			header_label.Text = "Harmony Blend | " +
								Utility.CurrentUserName.ToUpper() + " | " +
								Utility.UserType.ToUpper() + " | " +
								BaseForm?.Name;
		}

		#region ControlBox

		private void exit_button_Click(object sender, EventArgs e) {
			BaseForm.Close();
		}

		private void minimize_button_Click(object sender, EventArgs e) {
			BaseForm.WindowState = FormWindowState.Minimized;
		}

		private void maximaze_button_Click(object sender, EventArgs e) {
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
			if(e.Button == MouseButtons.Left) {
				ReleaseCapture();
				if(BaseForm != null) {
					SendMessage(BaseForm.Handle, WM_NCLBUTTONDOWN, (IntPtr)HTCAPTION, IntPtr.Zero);
				}
			}
		}
		#endregion
	}
}
