import { db } from '@/db/lib/db'
import * as schema from '../../schema'

export const insertUser = async (user: schema.INewUser) => {
  return db.insert(schema.UsersTable).values(user).returning()
}

// export const getUsers = async () => {
//   const selectResult = await db.select().from(UsersTable)
//   console.log('Results', selectResult)
//   return selectResult
// }

// export const getUsers2 = async () => {
//   const result = await db.query.UsersTable.findMany()
//   return result
// }
