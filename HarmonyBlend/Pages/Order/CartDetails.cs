using HarmonyBlend.ORM;
using HarmonyBlend.Utilities;
using System.Runtime.InteropServices;

namespace HarmonyBlend.Pages.Order
{
	public partial class CartDetails : Form
	{
		private float TOTALPRICE_ALLPRODUCTS = 0F;
		private int TOTALORDERCOUNT_ALLPRODUCTS = 0;

		public CartDetails() {
			InitializeComponent();
		}

		#region ControlBox

		private void exit_button_Click(object sender, EventArgs e) {
			this.Close();
			this.Dispose();
		}

		private void minimize_button_Click(object sender, EventArgs e) {
			WindowState = FormWindowState.Minimized;
		}

		private void maximaze_button_Click(object sender, EventArgs e) {
			if(WindowState == FormWindowState.Normal) {
				WindowState = FormWindowState.Maximized;
			} else {
				WindowState = FormWindowState.Normal;
			}
		}

		#endregion

		#region ControlBox - Header
		public const int WM_NCLBUTTONDOWN = 0XA1;
		public const int HTCAPTION = 0x2;
		[DllImport("user32.dll")] public static extern bool ReleaseCapture();
		[DllImport("user32.dll")] public static extern int SendMessage(IntPtr hWnd, int msg, IntPtr wParam, IntPtr lParam);

		private void HeaderMouseDown_Event(object sender, MouseEventArgs e) {
			if(e.Button == MouseButtons.Left) {
				ReleaseCapture();
				SendMessage(Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
			}
		}
		#endregion

		private void CartDetails_Load(object sender, EventArgs e) {
			if(CartManager.ListOfProducts != null) {
				foreach(var item in CartManager.ListOfProducts) {
					DataGridViewRow row = new DataGridViewRow();
					row.CreateCells(dataGridView1);

					row.Cells[0].Value = item.ProductName;
					row.Cells[1].Value = item.Amount;
					row.Cells[2].Value = item.Unit;
					row.Cells[3].Value = item.ListPrice;
					row.Cells[4].Value = item.TotalPrice;

					TOTALPRICE_ALLPRODUCTS += item.TotalPrice;
					TOTALORDERCOUNT_ALLPRODUCTS += item.Amount;
					dataGridView1.Rows.Add(row);
				}
			}

			dataGridView1.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;

			totalPayment_label.Text = TOTALPRICE_ALLPRODUCTS.FloatToCurrency();
			totalOrderCount_label.Text = TOTALORDERCOUNT_ALLPRODUCTS.ToString();
		}

		private void confirm_button_Click(object sender, EventArgs e) {
			if(totalPriceCheck_checkBox.Checked) {
				var listofProducts = CartManager.ListOfProducts;
				if(listofProducts is not null) {
					PlaceTheOrder(listofProducts);
				}
			} else {
				MessageBox.Show("Check the `Informations Check!` then confirm the order.");
			}
		}

		private void PlaceTheOrder(List<CartItem> listOfProducts) {
			if(listOfProducts is null) {
				MessageBox.Show("Sepet boş olduğundan dolayı işleme devam edilemiyor", "Sepet Boş", MessageBoxButtons.OK, MessageBoxIcon.Error);
				return;
			}

			// entity.order classini kullanarak http://193.162.43.110/Orders sayfasindaki gorunumu elde edebiliriz.
			// herhangi bir order'in goruntule butonuna basarak http://193.162.43.110/Orders/Detail/22534 sayfasindaki gorunumu elde edebilriz. bunuda 
		}
	}
}
