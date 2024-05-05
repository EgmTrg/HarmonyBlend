using HarmonyBlend.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace HarmonyBlend.Pages.Order
{
	public partial class CartDetails : Form
	{
		private float TOTALPRICE_ALLPRODUCTS = 0F;

		public CartDetails() {
			InitializeComponent();
		}

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
					dataGridView1.Rows.Add(row);
				}
			}

			label1.Text = TOTALPRICE_ALLPRODUCTS.FloatToCurrency();
		}

		private void confirm_button_Click(object sender, EventArgs e) {
			if(totalPriceCheck_checkBox.Checked) {
				MessageBox.Show("Your order has been placed successfully.");
			} else {
				MessageBox.Show("Check the `TotalPriceChecked!` then place the order.");
			}
		}
	}
}
