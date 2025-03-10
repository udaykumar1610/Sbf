const pool = require("../config/db");

// const DeafAndMentallyRetarded = {
//   getAll: async () => {
//     const [rows] = await pool.query("SELECT * FROM deafandmentalyretarded");
//     return rows;
//   },

const DeafAndMentallyRetarded = {
  getAll: async () => {
    const baseUrl = process.env.BASE_URL;

    const [rows] = await pool.query(
      "SELECT *, CONCAT(?,  pdf_file) AS pdf_url FROM deafandmentalyretarded",
      [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM deafandmentalyretarded WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      "SELECT * FROM deafandmentalyretarded WHERE status = ?",
      [status]
    );
    return rows;
  },

  create: async (data) => {
    const sql = `
      INSERT INTO deafandmentalyretarded (
        empname, son_wife_of, spouse_details, date_of_appointment,
        bill_unit_number, community, designation, office, division, pf_no,
        pay_band, running_allowance, grade_pay_substantive,
        grade_pay_officiating_macp, physically_challenged_student_name,
        relationship_with_employee, school_child_dob, school_name, tuition_fees_per_month,
        transport_charges_per_month, residential_fees_per_month, grant_sbcf_received_upto,
        amount_of_claim, period_of_claim_from, period_of_claim_to,
        tuition_fees_claimed, residential_fees_claimed, conveyance_charges_incurred,
        vouchers_enclosed, other_financial_aid, status, pdf_file,remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)
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
      data.school_name,
      data.tuition_fees_per_month,
      data.transport_charges_per_month,
      data.residential_fees_per_month,
      data.grant_sbcf_received_upto,
      data.amount_of_claim,
      data.period_of_claim_from,
      data.period_of_claim_to,
      data.tuition_fees_claimed,
      data.residential_fees_claimed,
      data.conveyance_charges_incurred,
      data.vouchers_enclosed,
      data.other_financial_aid,
      data.status || "Submitted",
      data.pdf_file || null,
      data.remarks,
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  update: async (id, data) => {
    const sql = `
      UPDATE deafandmentalyretarded SET 
        empname=?, son_wife_of=?, spouse_details=?, date_of_appointment=?, 
        bill_unit_number=?, community=?, designation=?, office=?, division=?, 
        pf_no=?, pay_band=?, running_allowance=?, grade_pay_substantive=?, 
        grade_pay_officiating_macp=?, physically_challenged_student_name=?, 
        relationship_with_employee=?, school_child_dob=?, school_name=?, tuition_fees_per_month=?, 
        transport_charges_per_month=?, residential_fees_per_month=?, grant_sbcf_received_upto=?, 
        amount_of_claim=?, period_of_claim_from=?, period_of_claim_to=?, 
        tuition_fees_claimed=?, residential_fees_claimed=?, conveyance_charges_incurred=?, 
        vouchers_enclosed=?, other_financial_aid=?, status=?, pdf_file=? , remarks=?
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
      data.school_name,
      data.tuition_fees_per_month,
      data.transport_charges_per_month,
      data.residential_fees_per_month,
      data.grant_sbcf_received_upto,
      data.amount_of_claim,
      data.period_of_claim_from,
      data.period_of_claim_to,
      data.tuition_fees_claimed,
      data.residential_fees_claimed,
      data.conveyance_charges_incurred,
      data.vouchers_enclosed,
      data.other_financial_aid,
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
      UPDATE deafandmentalyretarded SET status=? WHERE id=?
    `;
    // console.log(sql);
    const params = [status, id];
    console.log(" after models", status, "id :", id);

    const result = await pool.query(sql, params);
    console.log(result);
  },

  updateRemarks: async (id, status, remarks) => {
    // Define the SQL query with proper column updates
    const sql = `
      UPDATE deafandmentalyretarded 
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
    await pool.query("DELETE FROM deafandmentalyretarded WHERE id = ?", [id]);
  },
};

module.exports = DeafAndMentallyRetarded;
