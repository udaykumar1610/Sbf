const pool = require("../config/db");

// Create a new denture claim
const createDenture = async (data) => {
  const {
    empname,
    date_of_birth,
    guardian_name,
    date_of_appointment,
    bill_unit_number,
    community,
    designation,
    office,
    division,
    pf_no,
    pay_band,
    running_allowance,
    grade_pay_substantive,
    grade_pay_officiating_macp,
    dentures_recommended,
    receipt_number,
    receipt_date,
    cost_incurred,
  } = data;

  await pool.query(
    `INSERT INTO Dentures 
    (empname, date_of_birth, guardian_name, date_of_appointment, bill_unit_number, community, 
    designation, office, division, pf_no, pay_band, running_allowance, grade_pay_substantive, 
    grade_pay_officiating_macp, dentures_recommended, receipt_number, receipt_date, cost_incurred) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      empname,
      date_of_birth,
      guardian_name,
      date_of_appointment,
      bill_unit_number,
      community,
      designation,
      office,
      division,
      pf_no,
      pay_band,
      running_allowance,
      grade_pay_substantive,
      grade_pay_officiating_macp,
      dentures_recommended,
      receipt_number,
      receipt_date,
      cost_incurred,
    ]
  );
};

// Get all denture claims
const getAllDentures = async () => {
  const [rows] = await pool.query("SELECT * FROM Dentures");
  return rows;
};

// Get a single denture claim by ID
const getDentureById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM Dentures WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

// Update a denture claim by ID
const updateDenture = async (id, data) => {
  const {
    empname,
    date_of_birth,
    guardian_name,
    date_of_appointment,
    bill_unit_number,
    community,
    designation,
    office,
    division,
    pf_no,
    pay_band,
    running_allowance,
    grade_pay_substantive,
    grade_pay_officiating_macp,
    dentures_recommended,
    receipt_number,
    receipt_date,
    cost_incurred,
  } = data;

  await pool.query(
    `UPDATE Dentures SET 
      empname = ?, date_of_birth = ?, guardian_name = ?, date_of_appointment = ?, bill_unit_number = ?, 
      community = ?, designation = ?, office = ?, division = ?, pf_no = ?, pay_band = ?, 
      running_allowance = ?, grade_pay_substantive = ?, grade_pay_officiating_macp = ?, 
      dentures_recommended = ?, receipt_number = ?, receipt_date = ?, cost_incurred = ? 
    WHERE id = ?`,
    [
      empname,
      date_of_birth,
      guardian_name,
      date_of_appointment,
      bill_unit_number,
      community,
      designation,
      office,
      division,
      pf_no,
      pay_band,
      running_allowance,
      grade_pay_substantive,
      grade_pay_officiating_macp,
      dentures_recommended,
      receipt_number,
      receipt_date,
      cost_incurred,
      id,
    ]
  );
};

// Delete a denture claim by ID
const deleteDenture = async (id) => {
  await pool.query("DELETE FROM Dentures WHERE id = ?", [id]);
};

module.exports = {
  createDenture,
  getAllDentures,
  getDentureById,
  updateDenture,
  deleteDenture,
};
