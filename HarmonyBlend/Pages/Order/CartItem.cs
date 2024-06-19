using HarmonyBlend.Utilities;

namespace HarmonyBlend.Pages.Order
{
	internal class CartItem
	{
		public string ProductCode { get; set; }
		public string ProductName { get; set; }
		public int Amount { get; set; }
		public string? Unit { get; set; }
		public float ListPrice { get; set; }
		public float KDV { get; set; }
		public float TotalPrice { get; set; }

		public CartItem(DataGridViewRow row) {
			try {
				this.ProductCode = row.Cells[3].Value.ToString() ?? "NULL";
				this.ProductName = row.Cells[4].Value.ToString() ?? "NULL";
				this.Amount = int.Parse(row.Cells[5].Value.ToString() ?? "0");
				this.Unit = row.Cells[6].Value.ToString() ?? "NULL";
				this.ListPrice = float.Parse(row.Cells[7].Value.ToString() ?? "0");
				this.KDV = (row.Cells[8].Value.ToString() ?? "0").CurrencyToFloat();
				this.TotalPrice = (row.Cells[9].Value.ToString() ?? "0").CurrencyToFloat();
			} catch(Exception ex) {
				MessageBox.Show("Error: " + ex.Message);
				throw;
			}
		}

		public string GetDetailsAnItem() {
			string details = "__Details__";

			try {
				details += "\n" + ProductCode;
				details += "\n" + ProductName;
				details += "\n" + Amount;
				details += "\n" + Unit;
				details += "\n" + ListPrice;
				details += "\n" + KDV;
				details += "\n" + TotalPrice;
			} catch(Exception ex) {
				MessageBox.Show("Error: " + ex.Message);
				throw;
			}

			return details;
		}
	}
}
