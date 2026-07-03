const Database = require("better-sqlite3");
const { Client } = require("pg");
require("dotenv").config();

const sqlite = new Database(process.env.SQLITE_DB_PATH);

const pg = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function migrateLeads() {
  try {
    console.log("Migrating leads...");

    const leads = sqlite.prepare("SELECT * FROM leads").all();

    for (const lead of leads) {
      await pg.query(
        `
        INSERT INTO leads (
          id,
          wa_phone,
          name,
          email,
          inquiry_type,
          status,
          notes,
          created_at,
          updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          lead.id,
          lead.wa_phone,
          lead.name,
          lead.email,
          lead.inquiry_type,
          lead.status,
          lead.notes,
          lead.created_at,
          lead.updated_at,
        ],
      );
    }

    console.log(`✓ ${leads.length} leads migrated`);
  } catch (err) {
    console.error("Lead migration failed");
    throw err;
  }
}

async function migrateConversations() {
  try {
    console.log("Migrating conversations...");

    const conversations = sqlite.prepare("SELECT * FROM conversations").all();

    for (const conversation of conversations) {
      await pg.query(
        `
        INSERT INTO conversations (
          id,
          lead_id,
          state,
          data,
          updated_at
        )
        VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          conversation.id,
          conversation.lead_id,
          conversation.state,
          conversation.data,
          conversation.updated_at,
        ],
      );
    }

    console.log(`✓ ${conversations.length} conversations migrated`);
  } catch (err) {
    console.error("Conversation migration failed");
    throw err;
  }
}

async function migrateMessages() {
  try {
    console.log("Migrating messages...");

    const messages = sqlite.prepare("SELECT * FROM messages").all();

    for (const message of messages) {
      await pg.query(
        `
        INSERT INTO messages (
          id,
          lead_id,
          direction,
          body,
          created_at
        )
        VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT (id) DO NOTHING
        `,
        [
          message.id,
          message.lead_id,
          message.direction,
          message.body,
          message.created_at,
        ],
      );
    }

    console.log(`✓ ${messages.length} messages migrated`);
  } catch (err) {
    console.error("Message migration failed");
    throw err;
  }
}

async function migrate() {
  try {
    await pg.connect();
    console.log("Connected to PostgreSQL");

    await migrateLeads();
    await migrateConversations();
    await migrateMessages();

    console.log("Migration completed successfully");
  } catch (err) {
    console.error("Migration aborted");
    console.error(err.message);
  } finally {
    await pg.end();
    sqlite.close();

    console.log("Connections closed");
  }
}

migrate();
