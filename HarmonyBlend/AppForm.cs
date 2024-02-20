
namespace HarmonyBlend
{
	public partial class AppForm : Form
	{
        public string CurrentUser { get; set; }

        public AppForm(string user) {
			InitializeComponent();
			CurrentUser = user;
		}
	}
}
