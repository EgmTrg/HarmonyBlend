namespace HarmonyBlend.Utilities
{
	internal static class Utility
	{
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
	}
}
