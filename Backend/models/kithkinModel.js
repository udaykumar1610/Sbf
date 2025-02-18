const pool = require("../config/db");

const Kithkin = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM kithkin");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM kithkin WHERE id = ?", [id]);
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query("SELECT * FROM kithkin WHERE status = ?", [
      status,
    ]);
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO kithkin (
        empname, designation, office, division, pf_no, date_of_death,
        AaddressLastRites, status, pdf_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.empname,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.date_of_death,
      data.AaddressLastRites,
      data.status || "Submitted",
      data.pdf_file || null,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE kithkin SET
        empname=?, designation=?, office=?, division=?, pf_no=?,
        date_of_death=?, AaddressLastRites=?, status=?, pdf_file=?
      WHERE id=?
    `;

    const params = [
      data.empname,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.date_of_death,
      data.AaddressLastRites,
      data.status,
      data.pdf_file,
      id,
    ];

    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM kithkin WHERE id = ?", [id]);
  },
};

module.exports = Kithkin;
