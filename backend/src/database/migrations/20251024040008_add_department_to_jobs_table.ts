
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('jobs', (table) => {
        table.string('department');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('jobs', (table) => {
        table.dropColumn('department');
    });
}


