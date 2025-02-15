const pool = require("../config/db");

const MedicalAssistance = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM medicalAssistance");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM medicalAssistance WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM medicalAssistance WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `INSERT INTO medicalAssistance (empname, guardian_name, date_of_appointment, bill_unit_number, community, designation, office, division, pf_no, pay_band, running_allowance, grade_pay_substantive, grade_pay_officiating_macp, assistance_for, dependent_name_relation, status, pdfFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      data.empname,
      data.guardian_name,
      data.date_of_appointment,
      data.bill_unit_number,
      data.community,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.pay_band,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.assistance_for,
      data.dependent_name_relation,
      data.status || "submitted",
      data.pdfFile || null,
    ];
    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `UPDATE medicalAssistance SET empname=?, guardian_name=?, date_of_appointment=?, bill_unit_number=?, community=?, designation=?, office=?, division=?, pf_no=?, pay_band=?, running_allowance=?, grade_pay_substantive=?, grade_pay_officiating_macp=?, assistance_for=?, dependent_name_relation=?, status=?, pdfFile=? WHERE id=?`;
    const params = [
      data.empname,
      data.guardian_name,
      data.date_of_appointment,
      data.bill_unit_number,
      data.community,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.pay_band,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.assistance_for,
      data.dependent_name_relation,
      data.status,
      data.pdfFile,
      id,
    ];
    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM medicalAssistance WHERE id = ?", [id]);
  },
};

module.exports = MedicalAssistance;
