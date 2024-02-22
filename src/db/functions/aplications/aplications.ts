import { db } from '@/db/lib/db'
import * as schema from '../../schema'

export const insertAplication = async (app: schema.INewAplication) => {
  return db.insert(schema.AplicationsTable).values(app).returning()
}
