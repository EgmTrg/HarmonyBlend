using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM.TableORMs
{
	public class ProductsORM : ORMBase<Entity.Products>
	{
		public DataTable GetActiveProducts(bool? activePassive = null) {
			// It will be revised with customized ExecuteNonQuery. (Tools.ExecuteNonQuery)

			SqlDataAdapter sqlAdapter = new SqlDataAdapter();
			SqlCommand sqlCommand = new SqlCommand();
			DataTable dataTable = new DataTable();

			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"Select_GetProductsByActivity");
			sqlCommand.CommandType = CommandType.StoredProcedure;

			if(activePassive is not null) {
				sqlCommand.Parameters.AddWithValue("@Activity", activePassive);
			}

			sqlAdapter.SelectCommand = sqlCommand;
			sqlAdapter.Fill(dataTable);

			return dataTable;
		}
	}
}
