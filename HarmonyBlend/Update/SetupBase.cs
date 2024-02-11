namespace HarmonyBlend.Update
{
	internal abstract class SetupBase : ISetupBase
	{
		#region Properties
		public string WebVersion { get; private set; }

		string VersionControlUrl => "https://raw.githubusercontent.com/EgmTrg/HarmonyBlend/main/Update/Update.txt";

		protected string SetupFileUrl => "https://github.com/EgmTrg/HarmonyBlend/raw/main/Update/HarmonyBlendSetup.msi";

		protected string SetupFileFullPath { get { return Path.Combine(GetDownloadsFolderPath, SetupFileName); } }

		protected string GetDownloadsFolderPath {
			get {
				string downloadsPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
				return downloadsPath.Replace("Documents", "Downloads");
			}
		}

		protected readonly string SetupFileName = "HarmonyBlend.msi";
		#endregion


		public SetupBase() {
			HttpClient client = new HttpClient();
			string webVersion = client.GetStringAsync(VersionControlUrl).Result;
			WebVersion = webVersion;
		}

		public abstract void Setup();
	}

	public interface ISetupBase
	{
		string WebVersion { get; }
		void Setup();
	}
}
