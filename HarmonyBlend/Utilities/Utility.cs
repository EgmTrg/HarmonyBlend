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

		public static string? CurrentUserID {
			get => GetAppSetting("CurrentUserID");
			set => SetAppSetting("CurrentUserID", value);
		}

		public static string? CurrentUserName {
			get => GetAppSetting("CurrentUserName");
			set => SetAppSetting("CurrentUserName", value);
		}

		public static string? Password {
			get => GetAppSetting("Password");
			set => SetAppSetting("Password", value);
		}

		public static string? UserType {
			get => GetAppSetting("UserType");
			set => SetAppSetting("UserType", value ?? "NONE");
		}

		public static string? UserBrand {
			get => GetAppSetting("UserBrand");
			set => SetAppSetting("UserBrand", value ?? "NONE");
		}

		public static Image ChangeColorOfObject(Image image, Color targetColor) {
			string transparent_Code = "0";
			Bitmap originalImage = (Bitmap)image;
			for(int x = 0; x < originalImage.Width; x++) {
				for(int y = 0; y < originalImage.Height; y++) {
					var currentColor = originalImage.GetPixel(x, y).ToArgb().ToString();
					if(currentColor != transparent_Code) {
						originalImage.SetPixel(x, y, targetColor);
					}
				}
			}
			return originalImage;
		}

		internal static float CurrencyToFloat(this string currency) {
			string convertedValue = currency.Replace("₺", "").Replace(".", "").Replace(",", ".");
			return float.Parse(convertedValue, NumberStyles.Float, new CultureInfo("tr-TR"));
		}

		internal static string FloatToCurrency(this float value) {
			return value.ToString("C", new CultureInfo("tr-TR"));
		}
	}
}
