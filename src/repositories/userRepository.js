import connection from "../config/database.js";

async function signupPatient({
  name,
  cpf,
  dateOfBirth,
  phone,
  email,
  password,
}) {
  await connection.query(
    `
      INSERT INTO patients (
        name,
        cpf,
        "dateOfBirth",
        phone,
        email,
        password) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [name, cpf, dateOfBirth, phone, email, password]
  );
}

async function signupDoctor({ name, specialty, location, email, password }) {
  await connection.query(
    `
      INSERT INTO doctors (
          name,
          specialty,
          location,
          email,
          password) 
      VALUES ($1, $2, $3, $4, $5)
      `,
    [name, specialty, location, email, password]
  );
}

async function sessionPatient({ patientId, token }) {
  await connection.query(
    `
      INSERT INTO "sessionsPatients" (
        "patientId",
        token) 
      VALUES ($1, $2)
    `,
    [patientId, token]
  );
}

async function sessionDoctor({ doctorId, token }) {
  await connection.query(
    `
      INSERT INTO "sessionsDoctors" (
        "doctorId",
        token) 
      VALUES ($1, $2)
    `,
    [doctorId, token]
  );
}

async function findByEmailPatient(email) {
  return await connection.query(
    `
      SELECT * FROM patients WHERE email=$1
    `,
    [email]
  );
}

async function findByEmailDoctor(email) {
  return await connection.query(
    `
      SELECT * FROM doctors WHERE email=$1
    `,
    [email]
  );
}

async function findBySpecialty(specialty) {
  return await connection.query(
    `
      SELECT * FROM "sessionsDoctors" WHERE specialty=$1
    `,
    [specialty]
  );
}

async function findByLocation(location) {
  return await connection.query(
    `
      SELECT * FROM "sessionsDoctors" WHERE location=$1
    `,
    [location]
  );
}

async function seachDoctors({name, specialty, location}){
  const query =
    `
      SELECT id, name, email AS specialty, name, location FROM "doctors" WHERE 1=1
    `

    if (name) {
    query += ` AND name ILIKE '%${name}%'`;
  }

  if (specialty) {
    query += ` AND specialty ILIKE '%${specialty}%'`;
  }

  if (location) {
    query += ` AND location ILIKE '%${location}%'`;
  }

  const doctors = await connection.query(query);
  return doctors.rows;
}

async function findSessionByTokenPatients(token){
  return await connection.query(
    `
        SELECT * FROM "sessionsPatients" WHERE token = $1
    `,
    [token]
  );
}

async function findSessionByTokenDoctors(token){
  return await connection.query(
    `
        SELECT * FROM "sessionsDoctors" WHERE token = $1
    `,
    [token]
  );
}

async function findByIdPatients(id){
  return await connection.query(
    `    
    SELECT * FROM patients WHERE id=$1
  `,
    [id]
  );
}

async function findByIdDoctors(id){
  return await connection.query(
    `    
    SELECT * FROM doctors WHERE id=$1
  `,
    [id]
  );
}

export default {
  signupPatient,
  signupDoctor,
  sessionPatient,
  sessionDoctor,
  findByEmailPatient,
  findByEmailDoctor,
  seachDoctors,
  findSessionByTokenPatients,
  findSessionByTokenDoctors,
  findByIdPatients,
  findByIdDoctors
};
