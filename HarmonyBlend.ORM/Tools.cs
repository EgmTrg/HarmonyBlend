using Microsoft.Data.SqlClient;
using System.Data;

namespace HarmonyBlend.ORM
{
	public class Tools
	{
		private static SqlConnection? _connection;

		public static SqlConnection Connection {
			get {
				if(_connection == null) {
					// The connection string will be implement.
					_connection = new SqlConnection("Server=EGEMENPC\\SQLEXPRESS;" +
													"Database=HarmonyBlend;" +
													"Trusted_Connection=True;" +
													"TrustServerCertificate=true");
				}
				return _connection;
			}
			private set { _connection = value; }
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
