using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM
{
	public class Tools
	{
		#region Local Connection Defination
		/*private static SqlConnection? _local_connection;

		public static SqlConnection LocalConnection {
			get {
				if(_local_connection == null) {
					// The connection string will be implement.
					_local_connection = new SqlConnection("Server=EGEMENPC\\SQLEXPRESS;" +
													"Database=HarmonyBlend;" +
													"Trusted_Connection=True;" +
													"TrustServerCertificate=true");
				}
				return _local_connection;
			}
			private set { _local_connection = value; }
		}*/
		#endregion

		private static SqlConnection? _online_connection;

		public static SqlConnection Connection {
			get {
				if(_online_connection == null) {
					// The connection string will be implement.
					_online_connection = new SqlConnection(
											"Server=tcp:harmonyblend.database.windows.net,1433;" +
											"Initial Catalog=HarmonyBlend;" +
											"Persist Security Info=False;" +
											"User ID=egmtrg;Password=343636Egemen;" +
											"MultipleActiveResultSets=False;" +
											"Encrypt=True;" +
											"TrustServerCertificate=False;" +
											"Connection Timeout=30;");
				}
				return _online_connection;
			}
			private set { _online_connection = value; }
		}

		public static Result_ORM<object> ExecuteNonQuery(SqlCommand command, bool hasOutput = false, string? outputVariableName = null) {
			try {
				if(command.Connection.State == ConnectionState.Closed)
					command.Connection.Open();

				int affectedRows = command.ExecuteNonQuery();
				object data;
				if(hasOutput) {
					data = command.Parameters["@" + outputVariableName].Value; // `int` türünde
				} else {
					data = (affectedRows > 0); // `bool` türünde
				}

				return new Result_ORM<object> {
					isSuccess = true,
					Message = "Islem Basarili!",
					Data = data
				};

			} catch(Exception exception) {
				return new Result_ORM<object> {
					isSuccess = false,
					Message = exception.Message,
				};

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
