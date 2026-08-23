require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!email || !password || email === "ENTER_EMAIL_HERE" || password === "ENTER_PASSWORD_HERE") {
    console.error("Error: ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD must be validly set in your .env file.");
    process.exit(1);
  }

  // Use connection string for postgres (direct)
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });

  try {
    const existing = await pool.query('SELECT * FROM "Admin" WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log(`Admin with email ${email} already exists.`);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO "Admin" (id, email, "passwordHash", "updatedAt") VALUES ($1, $2, $3, NOW()) RETURNING email',
      [require('crypto').randomUUID(), email, passwordHash]
    );

    console.log(`Successfully created admin user: ${result.rows[0].email}`);
  } catch (err) {
    console.error("Database error:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
