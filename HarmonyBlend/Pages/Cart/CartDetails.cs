using HarmonyBlend.Utilities;
using System.Data;

namespace HarmonyBlend.Pages.Cart
{
	public partial class CartDetails : Form
	{
		private float TOTALPRICE_ALLPRODUCTS = 0F;
		private int TOTALORDERCOUNT_ALLPRODUCTS = 0;
		private int _ORDER_ID = 0;

		public CartDetails(string name) {
			InitializeComponent();
			UsingByCartDetailed();
		}

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

		/*private Result<bool> PlaceTheOrder(List<CartItem> listOfProducts) {
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
		}*/

		private Entity.Order CreateOrder(List<CartItem> listOfProducts) {
			float calcKDVprice = 0f, calcTotalprice = 0f;

			foreach(var item in listOfProducts) {
				calcKDVprice += item.KDV;
				calcTotalprice += item.TotalPrice;
			}

			return new Entity.Order {
				SellerName = Utility.CurrentUserName,
				SellerID = int.Parse(Utility.CurrentUserID),
				CreatedAt = DateTime.Now,
				KDVPrice = (decimal)calcKDVprice,
				TotalPrice = (decimal)calcTotalprice
			};
		}

		private Result<bool> PlaceTheOrder(List<CartItem> listOfProducts) {
			if(listOfProducts == null || !listOfProducts.Any()) {
				MessageBox.Show("Sepet boş olduğundan dolayı işleme devam edilemiyor", "Sepet Boş", MessageBoxButtons.OK, MessageBoxIcon.Error);
				return new Result<bool> { isSuccess = false };
			}

			var order = CreateOrder(listOfProducts);

			var result = new ORM.TableORMs.OrderORM().Insert(order, true, "NewID");
			int orderID = (int)(result.Data ?? -1);

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

		private void totalPriceCheck_checkBox_CheckedChanged(object sender, EventArgs e) {
			if(totalPriceCheck_checkBox.CheckState == CheckState.Checked) {
				confirm_button.Enabled = true;
			} else {
				confirm_button.Enabled = false;
			}
		}
	}
}
