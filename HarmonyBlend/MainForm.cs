using HarmonyBlend.Pages;
using System.Runtime.InteropServices;

namespace HarmonyBlend
{
	public partial class MainForm : Form
	{
		public string CurrentUser { get; set; }
		public bool MenuExpand { get; set; }

		public MainForm(string user) {
			InitializeComponent();
			CurrentUser = user;
			loggedInUsername_label.Text = CurrentUser + " | HarmonyBlend";
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

		#region Sidebar
		private bool sidebar_Expand = true;

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

		private void sideBar_button_Click(object sender, EventArgs e) {
			sidebarTransition.Start();
			if(MenuExpand == true)
				menuButtonTransition.Start();
		}

		private void menuTransition_Tick(object sender, EventArgs e) {
			if(MenuExpand == false) {
				menuButton_flowLayoutPanel.Height += 10;
				if(menuButton_flowLayoutPanel.Height >= 150) {
					menuButtonTransition.Stop();
					MenuExpand = true;
				}
			} else {
				menuButton_flowLayoutPanel.Height -= 10;
				if(menuButton_flowLayoutPanel.Height <= 50) {
					menuButtonTransition.Stop();
					MenuExpand = false;
				}
			}
		}

		private void menu_button_Click(object sender, EventArgs e) {
			menuButtonTransition.Start();
		}
		#endregion

		#region Page Manager

		private IPages_Mdi InstantiatePage(string buttonText) {
			IPages_Mdi? page = buttonText switch {
				"Dashboard" => new Dashboard(),
				"Sipariş Ver" => new Orders(),
				"Sub Menu 2" => new SubPage2(),
				"Settings" => new Settings(),
				"About" => new About(),
				_ => null
			};

			if(page == null)
				Application.Restart();

			return page;
		}


		private void OpenPage_button_Click(object sender, EventArgs e) {
			string? clickedButtonText = (sender as Button)?.Text;
			if(clickedButtonText is null)
				return;

			Form page = (Form)InstantiatePage(clickedButtonText);
			if(page is not null) {
				page.FormClosed += OnFormClosed;
				page.MdiParent = this;
				page.Dock = DockStyle.Fill;
				page.Show();
			} else {
				page?.Activate();
			}
		}

		private void OnFormClosed(object? sender, FormClosedEventArgs e) {
			(sender as Form)?.Dispose();
		}


		#endregion
	}
}