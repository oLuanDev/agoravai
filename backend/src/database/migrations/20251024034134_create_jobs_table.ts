
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.string('location');
    table.decimal('salary');
    table.string('company');
    table.string('status').defaultTo('open');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('jobs');
}


