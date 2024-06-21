using HarmonyBlend.ORM;
using System.Configuration;
using System.Globalization;

namespace HarmonyBlend.Utilities
{
	internal static class Utility
	{
		internal static string EMPTY_MASKEDTEXTBOX { get { return "   .  ."; } }

		private static string GetAppSetting(string key) {
			return ConfigurationManager.AppSettings[key];
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
	}
}
