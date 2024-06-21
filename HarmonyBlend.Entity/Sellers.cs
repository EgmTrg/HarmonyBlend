namespace HarmonyBlend.Entity
{
	public class Sellers : EntityBase
	{
		public override string PrimaryKey => "ID";
		public string? Brand { get; set; }
		public string? Name { get; set; }
		public string? Password { get; set; }
		public string? Email { get; set; }
        public bool? Status { get; set; }
    }
}
