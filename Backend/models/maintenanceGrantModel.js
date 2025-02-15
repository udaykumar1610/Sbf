const pool = require("../config/db");

const MaintenanceGrant = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM maintenanceGrant");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM maintenanceGrant WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM maintenanceGrant WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO maintenanceGrant (
        empname, son_or_wife_of, date_of_appointment, bill_unit_number, 
        community, designation, office, division, pf_no, pay_band, 
        running_allowance, grade_pay_substantive, grade_pay_officiating_macp, 
        period_of_sickness_with_pay_from, period_of_sickness_with_pay_to, 
        period_of_sickness_with_half_pay_from, period_of_sickness_with_half_pay_to, 
        period_of_sickness_without_pay_from, period_of_sickness_without_pay_to, 
        sick_certificate_number_date, sick_certificate_issued_by, 
        status, pdf_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      data.empname,
      data.son_or_wife_of,
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
      data.period_of_sickness_with_pay_from,
      data.period_of_sickness_with_pay_to,
      data.period_of_sickness_with_half_pay_from,
      data.period_of_sickness_with_half_pay_to,
      data.period_of_sickness_without_pay_from,
      data.period_of_sickness_without_pay_to,
      data.sick_certificate_number_date,
      data.sick_certificate_issued_by,
      data.status || "Pending",
      data.pdf_file || null,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE maintenanceGrant SET 
        empname=?, son_or_wife_of=?, date_of_appointment=?, bill_unit_number=?, 
        community=?, designation=?, office=?, division=?, pf_no=?, pay_band=?, 
        running_allowance=?, grade_pay_substantive=?, grade_pay_officiating_macp=?, 
        period_of_sickness_with_pay_from=?, period_of_sickness_with_pay_to=?, 
        period_of_sickness_with_half_pay_from=?, period_of_sickness_with_half_pay_to=?, 
        period_of_sickness_without_pay_from=?, period_of_sickness_without_pay_to=?, 
        sick_certificate_number_date=?, sick_certificate_issued_by=?, 
        status=?, pdf_file=? WHERE id=?`;

    const params = [
      data.empname,
      data.son_or_wife_of,
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
      data.period_of_sickness_with_pay_from,
      data.period_of_sickness_with_pay_to,
      data.period_of_sickness_with_half_pay_from,
      data.period_of_sickness_with_half_pay_to,
      data.period_of_sickness_without_pay_from,
      data.period_of_sickness_without_pay_to,
      data.sick_certificate_number_date,
      data.sick_certificate_issued_by,
      data.status,
      data.pdf_file,
      id,
    ];

    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM maintenanceGrant WHERE id = ?", [id]);
  },
};

module.exports = MaintenanceGrant;
