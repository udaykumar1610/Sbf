const pool = require("../config/db");

const MotorizedTricycle = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM motorizedtricycle");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM motorizedtricycle WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM motorizedtricycle WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO motorizedtricycle (
        empname, date_of_birth, relation_with_employee, date_of_appointment, 
        bill_unit_number, community, designation, office, division, pf_no, 
        payband, running_allowance, grade_pay_substantive, 
        grade_pay_officiating_macp, account_number, bank_name, 
        branch_name, ifsc_number, cost_of_tricycle, 
        percentage_of_handicap, status, pdf_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const params = [
      data.empname,
      data.date_of_birth,
      data.relation_with_employee,
      data.date_of_appointment,
      data.bill_unit_number,
      data.community,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.payband,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.account_number,
      data.bank_name,
      data.branch_name,
      data.ifsc_number,
      data.cost_of_tricycle,
      data.percentage_of_handicap,
      data.status || "submitted",
      data.pdf_file || null,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE motorizedtricycle SET 
        empname=?, date_of_birth=?, relation_with_employee=?, 
        date_of_appointment=?, bill_unit_number=?, community=?, 
        designation=?, office=?, division=?, pf_no=?, payband=?, 
        running_allowance=?, grade_pay_substantive=?, 
        grade_pay_officiating_macp=?, account_number=?, 
        bank_name=?, branch_name=?, ifsc_number=?, 
        cost_of_tricycle=?, percentage_of_handicap=?, 
        status=?, pdf_file=? WHERE id=?
    `;

    const params = [
      data.empname,
      data.date_of_birth,
      data.relation_with_employee,
      data.date_of_appointment,
      data.bill_unit_number,
      data.community,
      data.designation,
      data.office,
      data.division,
      data.pf_no,
      data.payband,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.account_number,
      data.bank_name,
      data.branch_name,
      data.ifsc_number,
      data.cost_of_tricycle,
      data.percentage_of_handicap,
      data.status,
      data.pdf_file,
      id,
    ];

    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM motorizedtricycle WHERE id = ?", [id]);
  },
};

module.exports = MotorizedTricycle;
