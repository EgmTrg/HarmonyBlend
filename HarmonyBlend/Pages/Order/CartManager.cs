using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HarmonyBlend.Pages.Order
{
	internal class CartManager
	{
		internal bool AddToCart(List<DataGridViewRow> checkedRows) {
			return false;
		}

		internal bool AddToCart(DataGridViewRow pRow) {
			return false;
		}

		internal bool RemoveFromCart(int pCode) {
			return false;
		}

		internal bool RemoveFromCart(DataGridViewRow pRow) {
			return false;
		}
	}
}
