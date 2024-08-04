using HarmonyBlend.Utilities;
using System.Data;

namespace HarmonyBlend.Pages.Order
{
	public partial class OrderDetails : Form
	{
        private int OrderID{ get; set; }

        public OrderDetails(int orderID) {
			InitializeComponent();
			OrderID = orderID;
		}

		private void UsingByOrderDetailed() {
			var orderDetailed = new ORM.TableORMs.OrderDetailedORM();
			DataTable data = orderDetailed.GetDetailedOrder(OrderID, Utility.CurrentUserID);

			if(data is not null) {
				foreach(DataRow orderedRow in data.Rows) {
					DataGridViewRow row = new DataGridViewRow();
					if(orderedRow != null) {
						row.CreateCells(dataGridView1);
						row.Cells[1].Value = orderedRow.ItemArray[4]?.ToString();
						row.Cells[2].Value = orderedRow.ItemArray[5]?.ToString();
						row.Cells[3].Value = orderedRow.ItemArray[6]?.ToString();
					}
					dataGridView1.Rows.Add(row);
				}
			}
		}
	}
}
