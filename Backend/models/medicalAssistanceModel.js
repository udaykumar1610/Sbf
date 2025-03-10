const pool = require("../config/db");

const MedicalAssistance = {
  // getAll: async () => {
  //   const [rows] = await pool.query("SELECT * FROM medicalAssistance");
  //   return rows;
  // },
  getAll: async () => {
    const baseUrl = process.env.BASE_URL;

    const [rows] = await pool.query(
      "SELECT *, CONCAT(?,  pdfFile) AS pdf_url FROM medicalAssistance",
      [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
    );
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
    const sql = `INSERT INTO medicalAssistance (empname, guardian_name, date_of_appointment, bill_unit_number, community, designation, office, division, pf_no, pay_band, running_allowance, grade_pay_substantive, grade_pay_officiating_macp, assistance_for, dependent_name_relation, status, pdfFile,remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
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
      data.remarks || null,
    ];
    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `UPDATE medicalAssistance SET empname=?, guardian_name=?, date_of_appointment=?, bill_unit_number=?, community=?, designation=?, office=?, division=?, pf_no=?, pay_band=?, running_allowance=?, grade_pay_substantive=?, grade_pay_officiating_macp=?, assistance_for=?, dependent_name_relation=?, status=?, pdfFile=? ,remarks=? WHERE id=?`;
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
      data.remarks,
      id,
    ];
    await pool.query(sql, params);
  },

  updateStatus: async (id, status) => {
    console.log("models", status, "id :", id);
    const sql = `
      UPDATE medicalAssistance SET status=? WHERE id=?
    `;
    console.log(sql);
    const params = [status, id];
    console.log(" after models", status, "id :", id);

    const result = await pool.query(sql, params);
    console.log(result);
  },

  updateRemarks: async (id, status, remarks) => {
    // Define the SQL query with proper column updates
    const sql = `
      UPDATE medicalAssistance 
      SET remarks = ?, status = ? 
      WHERE id = ?
    `;

    // Prepare the parameters for the query
    const params = [remarks, status, id];

    // Execute the query
    try {
      const result = await pool.query(sql, params);
      console.log(result); // Log the result
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
  },

  delete: async (id) => {
    await pool.query("DELETE FROM medicalAssistance WHERE id = ?", [id]);
  },
};

module.exports = MedicalAssistance;
