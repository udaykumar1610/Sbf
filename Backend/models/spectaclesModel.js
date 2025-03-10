const pool = require("../config/db");

const Spectacles = {
  // const getAllScholarships = async () => {
  //   const baseUrl = process.env.BASE_URL; // Access the environment variable here
  //   const [rows] = await pool.query(
  //     "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships",
  //     [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
  //   );
  //   return rows;
  // };

  getAll: async () => {
    const baseUrl = process.env.BASE_URL;

    const [rows] = await pool.query(
      "SELECT *, CONCAT(?, '/',  pdf_file) AS pdf_url FROM spectacles",
      [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
    );
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

  // create: async (data) => {
  //   const sql = `
  //     INSERT INTO spectacles (
  //       empname, date_of_birth, guardian_name, date_of_appointment,
  //       bill_unit_number, designation, office, division, pf_no, pay_band,
  //       running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
  //       previous_application_details, receipt_number_date, cost_incurred,
  //       status, pdf_file
  //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

  //   const params = [
  //     data.empname,
  //     data.date_of_birth,
  //     data.guardian_name,
  //     data.date_of_appointment,
  //     data.bill_unit_number,
  //     data.designation,
  //     data.office,
  //     data.division,
  //     data.pf_no,
  //     data.pay_band,
  //     data.running_allowance,
  //     data.grade_pay_substantive,
  //     data.grade_pay_officiating_macp,
  //     data.previous_application_details,
  //     data.receipt_number_date,
  //     data.cost_incurred,
  //     data.status || "submitted",
  //     data.pdf_file || null,
  //     data.created_at,
  //   ];

  //   console.log("DOB :", data.date_of_birth);
  //   console.log("createdat :", data.created_at);

  //   //const [result] = await pool.query(sql, params);
  //   return result.insertId;
  // },

  create: async (data) => {
    const sqlCheckApplication = `
      SELECT * FROM spectacles
      WHERE empname = ? 
      ORDER BY created_at DESC LIMIT 1
    `;

    // Calculate age
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(data.date_of_birth).getFullYear();
    const age = currentYear - birthYear;
    // console.log("age", age);

    // Determine the application interval based on age
    let allowedYearsInterval = age < 45 ? 3 : 2;

    try {
      // Check if the user has already applied within the allowed period
      const [previousApplication] = await pool.query(sqlCheckApplication, [
        data.empname,
      ]);

      // If there is a previous application, check the interval
      if (previousApplication.length > 0) {
        const lastApplicationDate = new Date(previousApplication[0].created_at);
        // console.log("lastApplicationDate", lastApplicationDate);
        const timeDifference = Math.abs(new Date() - lastApplicationDate);
        //console.log("timeDifference", timeDifference);

        const daysSinceLastApplication = Math.round(
          timeDifference / (1000 * 3600 * 24)
        ); // Convert to days
        // console.log("daysSinceLastApplication", daysSinceLastApplication);

        // If the user applied within the allowed interval, prevent the application
        if (daysSinceLastApplication < allowedYearsInterval * 365) {
          throw new Error(
            `You can only apply once every ${allowedYearsInterval} years. Please try again later.`
          );
        } else {
          try {
            const sql = `
          INSERT INTO spectacles (
            empname, date_of_birth, guardian_name, date_of_appointment, 
            bill_unit_number, designation, office, division, pf_no, pay_band, 
            running_allowance, grade_pay_substantive, grade_pay_officiating_macp, 
            previous_application_details, receipt_number_date, cost_incurred, 
            status, pdf_file,remarks
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

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
              data.remarks || null,
            ];

            // Insert the new application
            const [result] = await pool.query(sql, params);
            //console.log("DOB:", data.date_of_birth);

            return result.insertId;
          } catch (error) {
            console.error("Error:", error.message);
            throw new Error(error.message); // Handle error properly
          }
        }
      }

      // If age is above 45 or below 45, they are allowed to apply
      const sql = `
        INSERT INTO spectacles (
          empname, date_of_birth, guardian_name, date_of_appointment, 
          bill_unit_number, designation, office, division, pf_no, pay_band, 
          running_allowance, grade_pay_substantive, grade_pay_officiating_macp, 
          previous_application_details, receipt_number_date, cost_incurred, 
          status, pdf_file,remarks
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

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
        data.remarks || null,
      ];

      // Insert the new application
      const [result] = await pool.query(sql, params);
      //  console.log("DOB:", data.date_of_birth);

      return result.insertId;
    } catch (error) {
      console.error("Error:", error.message);
      throw new Error(error.message); // Handle error properly
    }
  },

  update: async (id, data) => {
    const sql = `
      UPDATE spectacles SET 
        empname=?, date_of_birth=?, guardian_name=?, date_of_appointment=?, 
        bill_unit_number=?, designation=?, office=?, division=?, pf_no=?, pay_band=?, 
        running_allowance=?, grade_pay_substantive=?, grade_pay_officiating_macp=?, 
        previous_application_details=?, receipt_number_date=?, cost_incurred=?, 
        status=?, pdf_file=? ,remarks=? WHERE id=?`;

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
      data.remarks,
      id,
    ];

    await pool.query(sql, params);
  },

  updateStatus: async (id, status) => {
    console.log("models", status, "id :", id);
    const sql = `
      UPDATE spectacles SET status=? WHERE id=?
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
      UPDATE spectacles 
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
    await pool.query("DELETE FROM spectacles WHERE id = ?", [id]);
  },
};

module.exports = Spectacles;
