import { config } from "dotenv";
config({ path: ".env.local" });

import { hash } from "bcryptjs";
import { db } from "./index";
import { companies, users } from "./schema";

async function main() {
  const [company] = await db
    .insert(companies)
    .values({ name: "Demo Head Office", code: "TUNAM" })
    .returning();

  const passwordHash = await hash("changeme123", 10);

  const [admin] = await db
    .insert(users)
    .values({
      companyId: company.id,
      name: "Demo Admin",
      email: "admin@harmonyblend.dev",
      role: "company_admin",
      passwordHash,
    })
    .returning();

  console.log("Seed tamamlandı.");
  console.log("  company:", company.id, company.name);
  console.log("  admin user:", admin.email, "/ şifre: changeme123");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
