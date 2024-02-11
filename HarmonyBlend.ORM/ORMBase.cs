using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace HarmonyBlend.ORM
{

	interface IORM<tTable>
	{
		DataTable Select();
		bool Insert(tTable table);
		bool Update(tTable table);
		bool Delete(tTable table);
	}

	public class ORMBase<tTable> : IORM<tTable> where tTable : class
	{
		public Type getPropertyType {
			get { return typeof(tTable); }
		}

		public DataTable Select() {
			// It will be revised with customized ExecuteNonQuery. (Tools.ExecuteNonQuery)

			SqlDataAdapter sqlAdapter = new SqlDataAdapter();
			SqlCommand sqlCommand = new SqlCommand();
			DataTable dataTable = new DataTable();

			sqlCommand.Connection = Tools.Connection;
			sqlCommand.CommandText = string.Format($"Select{getPropertyType.Name}"); // Example: commandText = SelectUsers
			sqlCommand.CommandType = CommandType.StoredProcedure;

			sqlAdapter.SelectCommand = sqlCommand;
			sqlAdapter.Fill(dataTable);

			return dataTable;
		}

		public bool Insert(tTable table) {
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

		public bool Update(tTable table) {
			throw new NotImplementedException();
		}

		public bool Delete(tTable table) {
			throw new NotImplementedException();
		}
	}


}
