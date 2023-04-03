import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import { v4 as uuidV4 } from "uuid";

async function signupPatients({
  name,
  cpf,
  dateOfBirth,
  phone,
  email,
  password,
}) {
  const { rowCount } = await userRepository.findByEmailPatient(email);
  if (rowCount) throw new Error("Usuário já existe");

  const passwordHash = await bcrypt.hash(password, 10);
  await userRepository.signupPatient({
    name,
    cpf,
    dateOfBirth,
    phone,
    email,
    password: passwordHash,
  });
}

async function signupDoctors({ name, specialty, location, email, password }) {
  const { rowCount } = await userRepository.findByEmailDoctor(email);
  if (rowCount) throw new Error("Usuário já existe");

  const passwordHash = await bcrypt.hash(password, 10);
  await userRepository.signupDoctor({
    name,
    specialty,
    location,
    email,
    password: passwordHash,
  });
}

async function signinPatients({ email, password }) {
  const {
    rowCount,
    rows: [userPatient],
  } = await userRepository.findByEmailPatient(email);
  if (!rowCount) throw new Error("Email ou senha incorretos");

  const validatePassword = await bcrypt.compare(password, userPatient.password);
  if (!validatePassword) throw new Error("Email ou senha incorretos");

  const token = uuidV4();
  await userRepository.sessionPatient({ patientId: userPatient.id, token });

  return token;
}

async function signinDoctors({ email, password }) {
  const {
    rowCount,
    rows: [userDoctor],
  } = await userRepository.findByEmailDoctor(email);

  if (!rowCount) throw new Error("Email ou senha incorretos");

  const validatePassword = await bcrypt.compare(password, userDoctor.password);
  if (!validatePassword) throw new Error("Email ou senha incorretos");

  const token = uuidV4();
  await userRepository.sessionDoctor({ doctorId: userDoctor.id, token });

  return token;
}

async function searchDoctors({ name, specialty, location }) {
  const doctors = await userRepository.searchDoctors({
    name,
    specialty,
    location,
  });
  return doctors;
}

export default {
  signupPatients,
  signupDoctors,
  signinPatients,
  signinDoctors,
  searchDoctors,
};
