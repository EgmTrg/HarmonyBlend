using HarmonyBlend.Utilities;
using System.Data;
using System.Runtime.InteropServices;

namespace HarmonyBlend.Pages.Order
{
	public partial class OrderDetails : Form
	{
		private float TOTALPRICE_ALLPRODUCTS = 0F;
		private int TOTALORDERCOUNT_ALLPRODUCTS = 0;
		private int _ORDER_ID = 0;

		public OrderDetails(string name) {
			InitializeComponent();
			header_label.Text = name;
		}

		public OrderDetails(string name, int orderID) {
			InitializeComponent();
			header_label.Text = name;
			_ORDER_ID = orderID;
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
			if(header_label.Text.Contains("Cart Details")) {
				UsingByCartDetailed();
			}

			if(header_label.Text.Contains("Order Details")) {
				UsingByOrderDetailed(_ORDER_ID);

				richTextBox1.Text = "placeholderText";
				richTextBox1.ForeColor = Color.Gray;
				richTextBox1.Enter += RichTextBox1_Enter;
				richTextBox1.Leave += RichTextBox1_Leave;
			}
		}

		#region Cart Detailed
		private void UsingByCartDetailed() {
			if(CartManager.ListOfProducts != null) {
				foreach(var item in CartManager.ListOfProducts) {
					DataGridViewRow row = new DataGridViewRow();
					row.CreateCells(dataGridView1);

					row.Cells[1].Value = item.ProductName;
					row.Cells[2].Value = item.Amount;
					row.Cells[3].Value = item.Unit;
					row.Cells[4].Value = item.ListPrice;
					row.Cells[5].Value = item.TotalPrice;

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
					var result = PlaceTheOrder(listofProducts);
					if(result.isSuccess)
						MessageBox.Show("Sipariş başarıyla oluşturulmuştur. Lütfen geçmiş siparişlerim sayfasına giderek siparişlerinizi kontrol ediniz.", "Sipariş Oluşturuldu!", MessageBoxButtons.OK, MessageBoxIcon.Information);
					this.Close();
				}
			} else {
				MessageBox.Show("Check the `Informations Check!` then confirm the order.");
			}
		}

		private Result<bool> PlaceTheOrder(List<CartItem> listOfProducts) {
			// entity.order classini kullanarak http://193.162.43.110/Orders sayfasindaki gorunumu elde edebiliriz.

			if(listOfProducts is null) {
				MessageBox.Show("Sepet boş olduğundan dolayı işleme devam edilemiyor", "Sepet Boş", MessageBoxButtons.OK, MessageBoxIcon.Error);
				return new Result<bool>() { isSuccess = false, };
			}
			float calcKDVprice = 0f, calcTotalprice = 0f;

			Entity.Order order = new Entity.Order();
			order.SellerName = Utility.CurrentUserName;
			order.SellerID = int.Parse(Utility.CurrentUserID);
			order.CreatedAt = DateTime.Now;
			foreach(var item in listOfProducts) {
				calcKDVprice += item.KDV;
				calcTotalprice += item.TotalPrice;
			}
			order.KDVPrice = (decimal)calcKDVprice;
			order.TotalPrice = (decimal)calcTotalprice;

			var result = new ORM.TableORMs.OrderORM().Insert(order, true, "NewID");
			int orderID = (int)((result.Data) ?? -1);

			if(result.isSuccess) {
				PlaceTheOrderOfDetails(listOfProducts, orderID);

				return new Result<bool> {
					isSuccess = true,
					Message = "Siparişiniz oluşturulmuştur."
				};
			} else {
				MessageBox.Show("Sipariş oluşturulken hata meydana geldi. Lütfen siparişlerim kısmından kontrol ediniz. Eğer sepetinizde bir problem yok ise adetleri kontrol ediniz.", "Hata!", MessageBoxButtons.OK, MessageBoxIcon.Error);

				return new Result<bool> {
					isSuccess = false,
					Message = "Sipariş özeti oluşturulken hata meydana geldi."
				};
			}
		}

		private void PlaceTheOrderOfDetails(List<CartItem> listOfProducts, int orderID) {
			// http://193.162.43.110/Orders sitesinde herhangi bir order'in goruntule butonuna basarak http://193.162.43.110/Orders/Detail/22534 sayfasindaki gorunumu elde edebilriz. bunuda 

			if(listOfProducts is null) {
				MessageBox.Show("Sepet boş olduğundan dolayı işleme devam edilemiyor", "Sepet Boş", MessageBoxButtons.OK, MessageBoxIcon.Error);
				return;
			}

			ORM.Result_ORM<object> result;

			foreach(CartItem item in listOfProducts) {
				Entity.OrderDetailed orderItem = new Entity.OrderDetailed();

				orderItem.OrderID = orderID;
				orderItem.SellerID = int.Parse(Utility.CurrentUserID);
				orderItem.SellerName = Utility.CurrentUserName;
				orderItem.ProductCode = item.ProductCode;
				orderItem.ProductName = item.ProductName;
				orderItem.Amount = item.Amount;
				orderItem.Unit = item.Unit;
				orderItem.KDV = (decimal)item.KDV;
				orderItem.Price = (decimal)item.ListPrice;
				orderItem.TotalPrice = (decimal)item.TotalPrice;
				orderItem.CreatedAt = DateTime.Now;

				result = new ORM.TableORMs.OrderDetailedORM().Insert(orderItem);
			}
		}
		#endregion

		#region Order Detailed
		private void UsingByOrderDetailed(int orderID) {
			var orderDetailed = new ORM.TableORMs.OrderDetailedORM();
			DataTable data = orderDetailed.GetDetailedOrder(orderID, Utility.CurrentUserID);

			if(data is not null) {
				foreach(DataRow orderedRow in data.Rows) {
					DataGridViewRow row = new DataGridViewRow();
					if(orderedRow != null) {
						row.CreateCells(dataGridView1);
						row.Cells[1].Value = orderedRow.ItemArray[4]?.ToString();
						row.Cells[2].Value = orderedRow.ItemArray[5]?.ToString();
						row.Cells[3].Value = orderedRow.ItemArray[6]?.ToString();
						row.Cells[4].Value = orderedRow.ItemArray[8]?.ToString();
						row.Cells[5].Value = orderedRow.ItemArray[9]?.ToString();
					}
					dataGridView1.Rows.Add(row);
				}
			}
		}
		#endregion

		private void RichTextBox1_Enter(object? sender, EventArgs e) {
			if(string.IsNullOrWhiteSpace(richTextBox1.Text)) {
				richTextBox1.Text = "";
				richTextBox1.ForeColor = Color.Gray;
			}
		}

		private void RichTextBox1_Leave(object? sender, EventArgs e) {
			if(richTextBox1.Text == "Notlar için burayı kullanınız!") {
				richTextBox1.Text = "";
				richTextBox1.ForeColor = Color.Black;
			}
		}

		private void totalPriceCheck_checkBox_CheckedChanged(object sender, EventArgs e) {
			if(totalPriceCheck_checkBox.CheckState == CheckState.Checked) { confirm_button.Enabled = true; } 
			else { confirm_button.Enabled = false; }
		}
	}
}
