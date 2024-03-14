namespace HarmonyBlend.Entity
{
	public class Users : EntityBase
	{
		public override string PrimaryKey => "UserID";
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public bool? IsAdmin { get; set; }
    }
}
