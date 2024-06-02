namespace HarmonyBlend.Entity
{
	public class Sellers : EntityBase
	{
		public override string PrimaryKey => "SellerID";
		public int SellerID { get; set; }
		public string? SellerName { get; set; }
	}
}
