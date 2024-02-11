using HarmonyBlend.ORM;
using HarmonyBlend.Update;
using System.Data;
using System.Security.Cryptography;

namespace HarmonyBlend
{
	public partial class TestForm : Form
	{
		public TestForm() {
			InitializeComponent();
		}

		private void button1_Click(object sender, EventArgs e) {
			Application.Exit();
		}

		DataTable selectDT;

		private void test_button_Click(object sender, EventArgs e) {
			selectDT = new ORMBase<Entity.Users>().Select();
			dataGridView1.DataSource = selectDT;
		}

		public DataRow? GetOneDataRowByName(string name) => selectDT == null ? selectDT.AsEnumerable().Where(row => row.Field<string>("Username") == "Random").FirstOrDefault() : throw new DeletedRowInaccessibleException();


		private void button2_Click(object sender, EventArgs e) {
			/*DataRow? selectedrow = selectDT.AsEnumerable().Where(row => row.Field<string>("Username") == "Random").FirstOrDefault();
			if(selectedrow != null) {
				foreach(var item in selectedrow.ItemArray) {
					ss += item.ToString();
				}
			}*/

			string ss = "";
			var a = GetOneDataRowByName("Egemen");
			foreach(var item in a.ItemArray) {
				ss += item.ToString();
			}
		}
	}
}
