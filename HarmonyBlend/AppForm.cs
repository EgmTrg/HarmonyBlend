using System.Runtime.InteropServices;

namespace HarmonyBlend
{
	public partial class AppForm : Form
	{
		public string CurrentUser { get; set; }
		public bool MenuExpand { get; set; }

		public AppForm(string user) {
			InitializeComponent();
			CurrentUser = user;
		}

		private void menuTransition_Tick(object sender, EventArgs e) {
			if(MenuExpand == false) {
				menuButton_flowLayoutPanel.Height += 10;
				if(menuButton_flowLayoutPanel.Height >= 157) {
					menuButtonTransition.Stop();
					MenuExpand = true;
				}
			} else {
				menuButton_flowLayoutPanel.Height -= 10;
				if(menuButton_flowLayoutPanel.Height <= 51) {
					menuButtonTransition.Stop();
					MenuExpand = false;
				}
			}
		}

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

		#region ControlBox

		private void exit_button_Click(object sender, EventArgs e) {
			Application.Exit();
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

		private void menu_button_Click(object sender, EventArgs e) {
			menuButtonTransition.Start();
		}

		private void ExitButtonEvent(object sender, EventArgs e) {
			Button? btn = sender as Button;
			if(btn?.BackColor == Color.White)
				btn.BackColor = Color.LightCoral;
			else {
				btn.BackColor = Color.White;
			}
		}

		bool sidebar_Expand = true;

		private void sidebarTransition_Tick(object sender, EventArgs e) {
			if(sidebar_Expand) {
				//MessageBox.Show("kapaniyor");
				sidebar_flowLayoutPanel.Width -= 10;
				if(sidebar_flowLayoutPanel.Width <= 57) {
					sidebar_Expand = false;
					sidebarTransition.Stop();
				}
			} else {
				//MessageBox.Show("aciliyor");
				sidebar_flowLayoutPanel.Width += 10;
				if(sidebar_flowLayoutPanel.Width >= 177) {
					sidebar_Expand = true;
					sidebarTransition.Stop();
				}
			}
		}

		private void button1_Click(object sender, EventArgs e) {
			sidebarTransition.Start();
		}
	}
}