using HarmonyBlend.Entity;
using System.Collections;

namespace HarmonyBlend.ORM.TableORMs
{
	public class OrderDetailedORM:ORMBase<OrderDetailed>
	{
		public Result_ORM<bool> Insert_OrderUsingByCartManager(ArrayList? productsList) {
			if(productsList == null) {
				return new Result_ORM<bool>() {
					isSuccess = false,
					Message = "Product List Empty!",
				};
			};

			throw new NotImplementedException();
		}
	}
}
