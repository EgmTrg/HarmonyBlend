using HarmonyBlend.Pages.Order;
using HarmonyBlend.Utilities;
using System.Globalization;

namespace HarmonyBlend.Pages.OrderDetailed
{
	internal class OrderDetailedHelper
	{
		public Entity.OrderDetailed GetOrderDetailed(CartItem cartItem) {
			Entity.OrderDetailed od = new Entity.OrderDetailed();
			od.SellerID = int.Parse(Utility.CurrentUserID ?? "-1");
			od.SellerName = Utility.CurrentUserName;
			od.ProductCode = cartItem.ProductCode;
			od.ProductName = cartItem.ProductName;
			od.Amount = cartItem.Amount;
			od.Unit = cartItem.Unit;
			od.KDV = decimal.Parse(cartItem.KDV.ToString());
			od.Price = decimal.Parse(cartItem.ListPrice.ToString()) * decimal.Parse(cartItem.Amount.ToString());
			od.TotalPrice = decimal.Parse(cartItem.TotalPrice.ToString());

			return od;
		}
	}
}
