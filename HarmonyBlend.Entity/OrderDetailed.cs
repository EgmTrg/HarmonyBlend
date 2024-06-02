namespace HarmonyBlend.Entity
{
	public class OrderDetailed : EntityBase
	{
		public override string PrimaryKey => "ID";
        public int ID { get; set; }
        public int SellerID { get; set; }
        public string? SellerName { get; set; }
        public string? ProductID { get; set; }
        public string? ProductName { get; set; }
        public int Amount { get; set; }
        public decimal KDV { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
