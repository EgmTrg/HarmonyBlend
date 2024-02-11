using System.Diagnostics;

namespace HarmonyBlend.Update
{
	internal class Updater : SetupBase
	{
		#region Singleton
		private static Updater? _instance;
		private static readonly object _instanceLock = new object();

		public static Updater Instance() {
			if(_instance == null) {
				lock (_instanceLock) {
					if (_instance == null) {
						_instance = new Updater();
					}
				}
			}
			return _instance;
		}
        #endregion

        public override void Setup() {
			bool downloadResult = DownloadSetup();

			if(downloadResult) {
				DialogResult result = MessageBox.Show("The setup file has been downloaded! Would you like to open the Downloads folder?", "Update!", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
				if(result == DialogResult.Yes) {
					OpenDownloadsFolder();
				}
			}
		}

		private bool DownloadSetup() {
			if(File.Exists(SetupFileFullPath)) {
				File.Delete(SetupFileFullPath);
			}

			try {
				using(HttpClient client = new HttpClient()) {
					var stream = client.GetStreamAsync(SetupFileUrl);
					FileStream fs = new FileStream(SetupFileFullPath, FileMode.OpenOrCreate);
					stream.Result.CopyTo(fs);
				}
				return File.Exists(SetupFileFullPath);

			} catch(Exception ex) {
				MessageBox.Show("Error while downloading setup file. \n\n" + ex.Message);
				return false;
			}
		}

		private void OpenDownloadsFolder() {
			try {
				Process.Start("explorer.exe", GetDownloadsFolderPath);
			} catch(Exception ex) {
				MessageBox.Show("An error occurred while opening the Downloads folder. \n\n" + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
				throw;
			}
		}
	}
}
