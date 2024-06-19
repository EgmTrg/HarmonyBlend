namespace HarmonyBlend.Entity
{
	public class Order : EntityBase
	{
		public override string PrimaryKey => "ID";
        public int ID { get; set; }
        public int SellerID { get; set; }
        public string? SellerName { get; set; }
        public decimal KDVPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
