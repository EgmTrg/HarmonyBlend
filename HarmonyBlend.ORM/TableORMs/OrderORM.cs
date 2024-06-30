using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;
using System.Reflection;

namespace HarmonyBlend.ORM.TableORMs
{
	public class OrderORM : ORMBase<Entity.Order>
	{
		public DataTable GetPastOrders(DateTime BeginDate, DateTime EndDate, int? SellerID = null, string? UserType = null) {
			if(SellerID == null) { throw new ArgumentException("SellerID bos olamaz!", "sellerID"); }

			using SqlCommand sqlCommand = new SqlCommand();
			using SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCommand);
			DataTable data = new DataTable();
			
			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"Select_PastOrderbyDate");
			sqlCommand.CommandType = CommandType.StoredProcedure;

			SqlDateTime beginDate_SQL = new DateTime(BeginDate.Year, BeginDate.Month, BeginDate.Day);
			SqlDateTime endDate_SQL = new DateTime(EndDate.Year, EndDate.Month, EndDate.Day);

			sqlCommand.Parameters.AddWithValue("@BeginDate", beginDate_SQL);
			sqlCommand.Parameters.AddWithValue("@EndDate", endDate_SQL);
			if(SellerID is not null) { sqlCommand.Parameters.AddWithValue("@SellerID", SellerID); }
			if(UserType?.ToUpper() == "ADMIN") { sqlCommand.Parameters.AddWithValue("@isAdmin", true); } 
				else { sqlCommand.Parameters.AddWithValue(@"isAdmin", false); }

			sqlAdapter.SelectCommand = sqlCommand;
			sqlAdapter.Fill(data);

			return data;
		}
	}
}
