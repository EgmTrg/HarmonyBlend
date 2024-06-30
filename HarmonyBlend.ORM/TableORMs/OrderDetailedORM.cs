using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM.TableORMs
{
	public class OrderDetailedORM : ORMBase<Entity.OrderDetailed>
	{
		public DataTable GetDetailedOrder(int orderID, string currentUserID) {

			using SqlCommand sqlCommand = new SqlCommand();
			using SqlDataAdapter adapter = new SqlDataAdapter();
			DataTable data = new DataTable();

			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"SelectOrderDetailed");
			sqlCommand.CommandType = CommandType.StoredProcedure;

			sqlCommand.Parameters.AddWithValue("@SellerID", currentUserID);
			sqlCommand.Parameters.AddWithValue("@OrderID", orderID);

			adapter.SelectCommand = sqlCommand;
			adapter.Fill(data);

			return data;
		}
	}
}