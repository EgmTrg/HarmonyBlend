using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM
{
	public class Tools
	{
		private static SqlConnection _connection;

		public static SqlConnection Connection {
			get {
				if(_connection == null) {
					// The connection string will be implement.
					_connection = new SqlConnection("Server=EGEMENPC\\SQLEXPRESS;" +
													"Database=TestDatabase;" +
													"User Id=Egemen;" +
													"Password=123456;" +
													"TrustServerCertificate=true");
				}
				return _connection;
			}
			private set { _connection = value; }
		}

		public static bool ExecuteNonQuery(SqlCommand command) {
			try {
				if(command.Connection.State == ConnectionState.Closed)
					command.Connection.Open();

				int affectedRows = command.ExecuteNonQuery();
				return affectedRows > 0 ? true : false;

			} catch(Exception) {
				return false;

			} finally {
				if(command.Connection.State != ConnectionState.Closed) {
					command.Connection.Close();
				}
			}
		}

		public static bool ConnectionTest() {
			try {
				Connection.Open();
				return true;
			} catch(Exception) {
				return false;
			}
		}

	}
}
