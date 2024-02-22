import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  json,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const UsersTable = pgTable(
  'users',
  {
    uuid: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    image: text('image').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }
)

export type IUser = InferSelectModel<typeof UsersTable>
export type INewUser = InferInsertModel<typeof UsersTable>

export const AplicationsTable = pgTable('aplications', {
  uuid: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  price: real('price').default(10).notNull(), //Ponerle historial de precios
  type: text('type').notNull(), //free, paymment, trial
})

export type IAplication = InferSelectModel<typeof AplicationsTable>
export type INewAplication = InferInsertModel<typeof AplicationsTable>

//Tabla de inventarios

//Tabla de precios

export const SubscriptionsTable = pgTable('subscriptions', {
  uuid: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.uuid),
  aplicationId: uuid('aplication_id')
    .notNull()
    .references(() => AplicationsTable.uuid),
  startedDate: timestamp('started_date').defaultNow().notNull(),
  endDate: timestamp('end_date').notNull(),
  amount: real('amount').notNull(),
})

export type ISubscription = InferSelectModel<typeof SubscriptionsTable>
export type INewSubscription = InferInsertModel<typeof SubscriptionsTable>

export const CalculationsTable = pgTable('calculations', {
  uuid: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => UsersTable.uuid),
  aplicationId: uuid('aplication_id')
    .notNull()
    .references(() => AplicationsTable.uuid),
  data: json('data').notNull(),
})

export type ICalculation = InferSelectModel<typeof CalculationsTable>
export type INewCalculation = InferInsertModel<typeof CalculationsTable>
