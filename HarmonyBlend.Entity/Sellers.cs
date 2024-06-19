namespace HarmonyBlend.Entity
{
	public class Sellers : EntityBase
	{
		public override string PrimaryKey => "ID";
		public int ID { get; set; }
		public string? Brand { get; set; }
		public string? Name { get; set; }
		public string? Password { get; set; }
	}
}
