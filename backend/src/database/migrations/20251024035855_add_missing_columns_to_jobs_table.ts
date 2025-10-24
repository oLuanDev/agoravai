
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('jobs', (table) => {
        table.jsonb('responsibilities').defaultTo('[]');
        table.jsonb('benefits').defaultTo('[]');
        table.jsonb('requirements').defaultTo('[]');
        table.jsonb('sources').defaultTo('[]');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('jobs', (table) => {
        table.dropColumn('responsibilities');
        table.dropColumn('benefits');
        table.dropColumn('requirements');
        table.dropColumn('sources');
    });
}


