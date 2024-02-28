
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

		private void menu_button_Click(object sender, EventArgs e) {
			menuButtonTransition.Start();
		}
	}
}
