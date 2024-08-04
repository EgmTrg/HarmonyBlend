using HarmonyBlend.Utilities;

namespace HarmonyBlend.Pages.Cart
{
	internal static class CartManager
	{
		internal static List<CartItem>? ListOfProducts { get; set; }

		internal static void ClearCart() => ListOfProducts = null;

		internal static Result<bool> AddToCart(CartItem item) {
			if(ListOfProducts is null)
				ListOfProducts = new List<CartItem>();

			List<CartItem>? copyOfList = ListOfProducts;
			if(copyOfList.Count > 0) {
				bool productFound = false;
				foreach(var product in ListOfProducts) {
					if(product.ProductCode == item.ProductCode) {
						productFound = true;
						break;
					}
				}
				if(productFound) {
					return new Result<bool> {
						isSuccess = false,
						Message = item.ProductName + " Product already added to cart."
					};
				}
			}

			copyOfList.Add(item);
			return new Result<bool> {
				isSuccess = true,
				Message = "Product added successfully."
			};
		}

		internal static Result<bool> RemoveFromCart(int pCode) {
			return new Result<bool> {
				isSuccess = false,
				Message = "."
			};
		}

		internal static Result<bool> RemoveFromCart(DataGridViewRow pRow) {
			return new Result<bool> {
				isSuccess = false,
				Message = "."
			};
		}
	}
}
