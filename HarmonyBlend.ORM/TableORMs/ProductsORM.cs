using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM.TableORMs
{
	public class ProductsORM : ORMBase<Entity.Products>
	{
		public DataTable GetActiveProducts(bool? activePassive = null) {
			// It will be revised with customized ExecuteNonQuery. (Tools.ExecuteNonQuery)

			using SqlDataAdapter sqlAdapter = new SqlDataAdapter();
			using SqlCommand sqlCommand = new SqlCommand();
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

		public DataTable GetProducts_Settings(string? productCodeBegin = null, string? productCodeEnd = null, string? category = null, bool? activity = false) {
			if(productCodeBegin?.StartsWith(" ") == true) { productCodeBegin = null; }
			if(productCodeEnd?.StartsWith(" ") == true) { productCodeEnd = null; }
			if(string.IsNullOrEmpty(category)) { category = null; }

			using SqlDataAdapter sqlAdapter = new SqlDataAdapter();
			using SqlCommand sqlCommand = new SqlCommand();
			DataTable dataTable = new DataTable();

			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"Select_Products_For_Settings");
			sqlCommand.CommandType = CommandType.StoredProcedure;

			if(productCodeBegin is not null) { sqlCommand.Parameters.AddWithValue("@ProductCodeBegin", productCodeBegin); }
			if(productCodeEnd is not null) { sqlCommand.Parameters.AddWithValue("@ProductCodeEnd", productCodeEnd); }
			if(category is not null) { sqlCommand.Parameters.AddWithValue("@Category", category); }
			if(activity is not null) { sqlCommand.Parameters.AddWithValue("@Activity", activity); }

			sqlAdapter.SelectCommand = sqlCommand;
			sqlAdapter.Fill(dataTable);

			return dataTable;
		}
	}
}
