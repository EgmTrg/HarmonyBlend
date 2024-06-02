using System.Globalization;

namespace HarmonyBlend.Utilities
{
	internal static class Utility
	{
		public static string? CurrentUser = null;
		public static int CurrentUserID = -1;
		internal static string EMPTY_MASKEDTEXTBOX { get { return "   .  ."; } }

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
