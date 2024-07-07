using HarmonyBlend.Pages;
using HarmonyBlend.Utilities;
using System.Runtime.InteropServices;

namespace HarmonyBlend
{
	public partial class MainForm : Form
	{
		public bool MenuExpand { get; set; }

		public MainForm(string user, string id) {
			InitializeComponent();
			loggedInUsername_label.Text = "User: " + Utility.CurrentUserName +
										 " | ID: " + Utility.CurrentUserID +
										 " | Brand: " + Utility.UserBrand +
										 " | HarmonyBlend";
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

		private void information_button_Click(object sender, EventArgs e) {
			MessageBox.Show(Utility.CurrentUserName + "\n" +
							Utility.CurrentUserID + "\n" +
							Utility.Password + "\n" +
							Utility.UserBrand + "\n" +
							Utility.UserType + "\n");
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
				"Siparişlerim" => new PastOrders(),
				"Settings" => new Settings(),
				"About" => new About(),
				_ => null
			};

			if(page == null)
				Application.Exit();

#pragma warning disable CS8603 // Possible null reference return.
			return page;
#pragma warning restore CS8603 // Possible null reference return.
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

		private void MainForm_FormClosed(object sender, FormClosedEventArgs e) {
			Utility.SetOnlineOrOfflineStatus(false);
		}
	}
}