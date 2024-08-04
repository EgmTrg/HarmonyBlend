using HarmonyBlend.ORM;
using System.Configuration;
using System.Globalization;
using System.Windows.Forms;

namespace HarmonyBlend.Utilities
{
	internal static class Utility
	{
		internal static string EMPTY_MASKEDTEXTBOX { get { return "   .  ."; } }

		private static string GetAppSetting(string key) {
			return ConfigurationManager.AppSettings[key] ?? "NONE";
		}

		private static void SetAppSetting(string key, string value) {
			ConfigurationManager.AppSettings[key] = value;
		}

		#region App.Config Manager
		public static string CurrentUserID {
			get => GetAppSetting("CurrentUserID");
			set => SetAppSetting("CurrentUserID", value);
		}

		public static string CurrentUserName {
			get => GetAppSetting("CurrentUserName");
			set => SetAppSetting("CurrentUserName", value);
		}

		public static string Password {
			get => GetAppSetting("Password");
			set => SetAppSetting("Password", value);
		}

		public static string UserType {
			get => GetAppSetting("UserType");
			set => SetAppSetting("UserType", value ?? "NONE");
		}

		public static string UserBrand {
			get => GetAppSetting("UserBrand");
			set => SetAppSetting("UserBrand", value ?? "NONE");
		}

		public static string Status {
			get => GetAppSetting("Status");
			set => SetAppSetting("Status", value ?? "False");
		}

		public static string Email {
			get => GetAppSetting("Email");
			set => SetAppSetting("Email", value ?? "NONE");
		}

		public static Entity.Users GetUserInformations {
			get {
				return new Entity.Users() {
					Username = CurrentUserName,
					Password = Utility.Password,
					Email = Utility.Email,
					IsAdmin = UserType == "ADMIN" ? true : false,
					Status = bool.Parse(Utility.Status)
				};
			}
		}

		public static Entity.Sellers GetSellerInformations {
			get {
				return new Entity.Sellers() {
					Brand = UserBrand,
					Name = CurrentUserName,
					Password = Utility.Password,
					Email = Utility.Email,
					Status = bool.Parse(Utility.Status)
				};
			}
		}
		#endregion

		internal static float CurrencyToFloat(this string currency) {
			string convertedValue = currency.Replace("₺", "").Replace(".", "").Replace(",", ".");
			return float.Parse(convertedValue, NumberStyles.Float, new CultureInfo("tr-TR"));
		}

		internal static string FloatToCurrency(this float value) {
			return value.ToString("C", new CultureInfo("tr-TR"));
		}

		internal static void SetOnlineOrOfflineStatus(bool isOnline) {
			if(Utility.UserType == "ADMIN") {
				Entity.Users userInfo = Utility.GetUserInformations;
				userInfo.Status = isOnline;
				new ORMBase<Entity.Users>().Update(userInfo, Utility.CurrentUserID);
			} else {
				Entity.Sellers sellerInfo = Utility.GetSellerInformations;
				sellerInfo.Status = isOnline;
				new ORMBase<Entity.Sellers>().Update(sellerInfo, Utility.CurrentUserID);
			}
		}

		internal static void DataGridStyle(DataGridView dataGridView1) {
			Color KoyuRenk = Color.FromArgb(39, 47, 59);

			// Başlık fontu ve kalın punto
			dataGridView1.ColumnHeadersDefaultCellStyle.Font = new Font(dataGridView1.Font.FontFamily, 13, FontStyle.Bold);
			// Başlık arka plan rengi
			dataGridView1.ColumnHeadersDefaultCellStyle.BackColor = KoyuRenk;
			// Başlık metin ortalama
			dataGridView1.ColumnHeadersDefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
			// Başlık yazı rengi
			dataGridView1.ColumnHeadersDefaultCellStyle.ForeColor = Color.White;

			// Satır arka plan renkleri (sıradaki satır belirtilen renk, sıradışı satır ise hafif açık renk)
			dataGridView1.RowsDefaultCellStyle.BackColor = Color.White;
			dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.White;
			//dataGridView1.AlternatingRowsDefaultCellStyle.BackColor = Color.FromArgb(KoyuRenk.R + 20, KoyuRenk.G + 20, KoyuRenk.B + 20);

			// Kenarlık rengi
			dataGridView1.GridColor = KoyuRenk;

			// Seçili hücre rengi
			dataGridView1.DefaultCellStyle.SelectionBackColor = Color.FromArgb(KoyuRenk.R + 10, KoyuRenk.G + 10, KoyuRenk.B + 10);
			dataGridView1.DefaultCellStyle.SelectionForeColor = Color.WhiteSmoke;

			// Tüm metinlerin ortalama hizalanması
			dataGridView1.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridView1.DefaultCellStyle.ForeColor = Color.FromArgb(KoyuRenk.R + 20, KoyuRenk.G + 20, KoyuRenk.B + 20);
			dataGridView1.DefaultCellStyle.Font = new Font(dataGridView1.Font.FontFamily, 11);
		}

		internal static void DataGridBehaviorAndLayoutProps(DataGridView dataGridView1) {
			// BEHAVIOR
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridView1.MultiSelect = false;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

			// LAYOUT
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.ScrollBars = ScrollBars.Vertical;
		}
	}
}
