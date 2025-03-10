const pool = require("../config/db");

const PhysicallyChallenged = {
  // getAll: async () => {
  //   const [rows] = await pool.query("SELECT * FROM physicallyChallenged");
  //   return rows;
  // },

  getAll: async () => {
    const baseUrl = process.env.BASE_URL;

    const [rows] = await pool.query(
      "SELECT *, CONCAT(?,  pdf_file) AS pdf_url FROM physicallyChallenged",
      [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM physicallyChallenged WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM physicallyChallenged WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO physicallyChallenged (
        empname, son_wife_of, spouse_details, date_of_appointment, 
        bill_unit_number, community, designation, office, division, pf_no, 
        pay_band, running_allowance, grade_pay_substantive, 
        grade_pay_officiating_macp, physically_challenged_student_name, 
        relationship_with_employee, school_child_dob, class_studying, 
        school_name, nature_of_disability, 
        financial_assistance_received_upto, financial_assistance_period_from, 
        financial_assistance_period_to, status, pdf_file,remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const params = [
      data.empname,
      data.son_wife_of,
      data.spouse_details,
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
      data.physically_challenged_student_name,
      data.relationship_with_employee,
      data.school_child_dob,
      data.class_studying,
      data.school_name,
      data.nature_of_disability,
      data.financial_assistance_received_upto,
      data.financial_assistance_period_from,
      data.financial_assistance_period_to,
      data.status || "Submitted",
      data.pdf_file || null,
      data.remarks,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE physicallyChallenged SET 
        empname=?, son_wife_of=?, spouse_details=?, date_of_appointment=?, 
        bill_unit_number=?, community=?, designation=?, office=?, division=?, 
        pf_no=?, pay_band=?, running_allowance=?, grade_pay_substantive=?, 
        grade_pay_officiating_macp=?, physically_challenged_student_name=?, 
        relationship_with_employee=?, school_child_dob=?, class_studying=?, 
        school_name=?, nature_of_disability=?, 
        financial_assistance_received_upto=?, financial_assistance_period_from=?, 
        financial_assistance_period_to=?, status=?, pdf_file=? ,remarks=?
      WHERE id=?
    `;

    const params = [
      data.empname,
      data.son_wife_of,
      data.spouse_details,
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
      data.physically_challenged_student_name,
      data.relationship_with_employee,
      data.school_child_dob,
      data.class_studying,
      data.school_name,
      data.nature_of_disability,
      data.financial_assistance_received_upto,
      data.financial_assistance_period_from,
      data.financial_assistance_period_to,
      data.status,
      data.pdf_file,
      data.remarks,
      id,
    ];

    await pool.query(sql, params);
  },

  updateStatus: async (id, status) => {
    console.log("models", status, "id :", id);
    const sql = `
      UPDATE physicallyChallenged SET status=? WHERE id=?
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
      UPDATE physicallyChallenged 
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
    await pool.query("DELETE FROM physicallyChallenged WHERE id = ?", [id]);
  },
};

module.exports = PhysicallyChallenged;
