import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from '../lib/db'

async function main() {
  try {
    await migrate(db, { migrationsFolder: 'src/db/migrations' })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
