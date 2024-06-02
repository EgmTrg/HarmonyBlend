using HarmonyBlend.Entity;

namespace HarmonyBlend.ORM.TableORMs
{
	public class OrderDetailedORM:ORMBase<OrderDetailed>
	{
		public Result_ORM<List<CartItem>> Insert_OrderUsingByCartManager(List<CartItem> productsList) {
			if(productsList == null) {
				return new Result_ORM<List<Products>>() {
					isSuccess = false,
					Message = "Product List Empty!",
				};
			};


			throw new NotImplementedException();
		}
	}
}
