using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace HarmonyBlend.ORM
{
	interface IORM<tTable>
	{
		Result<DataTable> Select();
		Result<bool> Insert(tTable table);
		Result<bool> Update(tTable table, string ID);
		Result<bool> Delete(int ID);
	}

	public class ORMBase<tTable> : IORM<tTable> where tTable : class
	{
		public Type getPropertyType {
			get { return typeof(tTable); }
		}

		public Result<DataTable> Select() {
			// It will be revised with customized ExecuteNonQuery. (Tools.ExecuteNonQuery)

			SqlDataAdapter sqlAdapter = new SqlDataAdapter();
			SqlCommand sqlCommand = new SqlCommand();
			DataTable dataTable = new DataTable();

			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"Select{getPropertyType.Name}");
			sqlCommand.CommandType = CommandType.StoredProcedure;

			sqlAdapter.SelectCommand = sqlCommand;
			sqlAdapter.Fill(dataTable);

			return new Result<DataTable> {
				isSuccess = true,
				Data = dataTable,
				Message = "True"
			};
		}

		public Result<bool> Insert(tTable table) {
			SqlCommand command = new SqlCommand();
			command.CommandText = string.Format($"Insert{getPropertyType.Name}");
			command.CommandType = CommandType.StoredProcedure;
			command.Connection = Tools.Connection;

			PropertyInfo[] properties = getPropertyType.GetProperties();
			foreach(PropertyInfo property in properties) {
				command.Parameters.AddWithValue($"@{property.Name}", property.GetValue(table));
			}

			return Tools.ExecuteNonQuery(command);
		}

		public Result<bool> Update(tTable table, string ID) {
			// veritabaninda procedure olusturulmadi

			SqlCommand cmd = new();
			cmd.CommandText = string.Format("Update{0}", getPropertyType.Name);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Connection = Tools.Connection;

			PropertyInfo[] props = getPropertyType.GetProperties();

			foreach(PropertyInfo property in props) {
				if(property.Name == "PrimaryKey") {
					cmd.Parameters.AddWithValue($"@{property.GetValue(table)}", ID);
					continue;
				}
				cmd.Parameters.AddWithValue($"@{property.Name}", property.GetValue(table));
			}
			return Tools.ExecuteNonQuery(cmd);
		}

		public Result<bool> Delete(int ID) {
			// veritabaninda procedure olusturulmadi.

			tTable table = Activator.CreateInstance<tTable>();
			SqlCommand cmd = new SqlCommand();
			cmd.CommandText = string.Format("Delete{0}", getPropertyType.Name);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Connection = Tools.Connection;

			PropertyInfo? property = getPropertyType.GetProperty("PrimaryKey");

			cmd.Parameters.AddWithValue($"@{property?.GetValue(table)}", ID);

			return Tools.ExecuteNonQuery(cmd);
		}
	}


}
