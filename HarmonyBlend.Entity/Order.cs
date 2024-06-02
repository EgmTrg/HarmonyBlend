namespace HarmonyBlend.Entity
{
	public class Order : EntityBase
	{
		public override string PrimaryKey => "OrderID";
        public int OrderID { get; set; }
        public int SellerID { get; set; }
        public string? SellerName { get; set; }
        public decimal KDVPrice { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
