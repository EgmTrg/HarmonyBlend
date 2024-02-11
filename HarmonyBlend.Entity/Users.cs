namespace HarmonyBlend.Entity
{
	public class Users : EntityBase
	{
		public override string PrimaryKey => "ID";
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
    }
}
