using HarmonyBlend.Pages.Order;
using HarmonyBlend.Properties;
using HarmonyBlend.Utilities;
using System.Data;

namespace HarmonyBlend.Pages
{
	public partial class PastOrders : Form, IPages_Mdi
	{
		public PastOrders() {
			InitializeComponent();
		}

		private void PastOrders_Load(object sender, EventArgs e) {
			Utility.DataGridStyle(dataGridView1);
			Utility.DataGridBehaviorAndLayoutProps(dataGridView1);
			dateTimePicker2.Value = DateTime.Now.AddDays(1);
			RefreshDataView();
		}

		private void RefreshDataView() {
			DateTime beginDate = dateTimePicker1.Value;
			DateTime endDate = dateTimePicker2.Value;
			var data = new ORM.TableORMs.OrderORM().GetPastOrders(beginDate, endDate, int.Parse(Utility.CurrentUserID), Utility.UserType);
			CreateRows(data);

			if(Utility.UserType != "ADMIN") {
				foreach(DataGridViewRow row in dataGridView1.Rows) {
					string sellerName = Utility.CurrentUserName;
					string sellername = row.Cells[1].Value.ToString() ?? ".";
					if(sellername.Contains(Utility.CurrentUserName)) {
						row.Visible = true;
					} else {
						row.Visible = false;
					}
				}
			}
		}

		private void CreateRows(DataTable pastOrders) {
			foreach(DataRow order in pastOrders.Rows) {
				DataGridViewRow row = new DataGridViewRow();
				if(order != null) {
					row.CreateCells(dataGridView1);
					row.Cells[0].Value = order.ItemArray[0]?.ToString();
					row.Cells[1].Value = order.ItemArray[2]?.ToString();
					row.Cells[2].Value = order.ItemArray[3]?.ToString();
					row.Cells[3].Value = order.ItemArray[1]?.ToString();
					row.Cells[4].Value = "Detayları Görüntüle!";
				}
				dataGridView1.Rows.Add(row);
			}
		}

		private void GetPastOrderDatas_button_Click(object sender, EventArgs e) {
			dataGridView1.Rows.Clear();
			RefreshDataView();
		}

		private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e) {
			if(dataGridView1.Columns[e.ColumnIndex].Name != "ShowDetailed")
				return;

			int orderID = Convert.ToInt32(dataGridView1.Rows[e.RowIndex].Cells["OrderID"].Value);

			if(orderID != -1) {
				var detailedOrder = new OrderDetails("Order Details", orderID);
				detailedOrder.totalPriceCheck_checkBox.Checked = false;
				detailedOrder.edit_button.Enabled = false;
				detailedOrder.confirm_button.Enabled = false;
				detailedOrder.ShowDialog();
			}
		}
	}
}
