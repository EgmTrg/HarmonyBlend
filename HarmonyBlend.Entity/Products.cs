namespace HarmonyBlend.Entity
{
	public class Products : EntityBase
	{
		public override string PrimaryKey => "ProductID";
		public string? ProductName { get; set; }
		public string? Description { get; set; }
		public decimal? Price { get; set; }
		public string? Unit { get; set; }
		public bool? ActivePassive { get; set; }
		public string? Category { get; set; }
	}
}
