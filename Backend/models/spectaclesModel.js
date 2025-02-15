const pool = require("../config/db");

const Spectacles = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM spectacles");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM spectacles WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM spectacles WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO spectacles (
        empname, date_of_birth, guardian_name, date_of_appointment, 
        bill_unit_number, designation, office, division, pf_no, pay_band, 
        running_allowance, grade_pay_substantive, grade_pay_officiating_macp, 
        previous_application_details, receipt_number_date, cost_incurred, 
        status, pdf_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const params = [
      data.empname,
      data.date_of_birth,
      data.guardian_name,
      data.date_of_appointment,
      data.bill_unit_number,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.pay_band,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.previous_application_details,
      data.receipt_number_date,
      data.cost_incurred,
      data.status || "submitted",
      data.pdf_file || null,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE spectacles SET 
        empname=?, date_of_birth=?, guardian_name=?, date_of_appointment=?, 
        bill_unit_number=?, designation=?, office=?, division=?, pf_no=?, pay_band=?, 
        running_allowance=?, grade_pay_substantive=?, grade_pay_officiating_macp=?, 
        previous_application_details=?, receipt_number_date=?, cost_incurred=?, 
        status=?, pdf_file=? WHERE id=?`;

    const params = [
      data.empname,
      data.date_of_birth,
      data.guardian_name,
      data.date_of_appointment,
      data.bill_unit_number,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.pay_band,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.previous_application_details,
      data.receipt_number_date,
      data.cost_incurred,
      data.status,
      data.pdf_file,
      id,
    ];

    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM spectacles WHERE id = ?", [id]);
  },
};

module.exports = Spectacles;
