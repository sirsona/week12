const pool = require("../../db/pool");

async function findById(id) {
  const { rows } = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);
  return rows[0] || null;
}

async function findByPhone(waPhone) {
  const { rows } = await pool.query("SELECT * FROM leads WHERE wa_phone = $1", [
    waPhone,
  ]);
  return rows[0] || null;
}

async function list({ status, search, limit = 50, offset = 0, assignedTo }) {
  const conditions = [];
  const params = [];

  if (assignedTo) {
    params.push(assignedTo);
    conditions.push(`assigned_to = $${params.length}`);
  }

  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    conditions.push(
      `(name ILIKE $${params.length} OR wa_phone ILIKE $${params.length})`,
    );
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  params.push(limit);
  params.push(offset);

  const { rows } = await pool.query(
    `SELECT * FROM leads ${where}
     ORDER BY created_at DESC
     LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params,
  );
  return rows;
}

async function insert({ waPhone, name, email, inquiryType }) {
  const { rows } = await pool.query(
    `INSERT INTO leads (wa_phone, name, email, inquiry_type)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [waPhone, name, email, inquiryType],
  );
  return rows[0];
}

async function updateStatus(id, status) {
  const { rows } = await pool.query(
    `UPDATE leads SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, id],
  );
  return rows[0] || null;
}

async function statsByStatus() {
  const { rows } = await pool.query(
    `SELECT status, COUNT(*)::int AS total
     FROM leads
     GROUP BY status`,
  );
  return rows;
}

async function update(id, updates) {
  const fields = [];
  const params = [];
  let paramIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    params.push(updates.name);
  }
  if (updates.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    params.push(updates.email);
  }
  if (updates.inquiry_type !== undefined) {
    fields.push(`inquiry_type = $${paramIndex++}`);
    params.push(updates.inquiry_type);
  }
  if (updates.notes !== undefined) {
    fields.push(`notes = $${paramIndex++}`);
    params.push(updates.notes);
  }
  if (updates.status !== undefined) {
    fields.push(`status = $${paramIndex++}`);
    params.push(updates.status);
  }

  if (fields.length === 0) {
    return await findById(id);
  }

  fields.push(`updated_at = NOW()`);
  params.push(id);

  const { rows } = await pool.query(
    `UPDATE leads SET ${fields.join(", ")}
     WHERE id = $${params.length}
     RETURNING *`,
    params,
  );
  return rows[0] || null;
}
module.exports = {
  findById,
  findByPhone,
  list,
  insert,
  updateStatus,
  update,
  statsByStatus,
};
