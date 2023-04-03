import userService from "../services/userService.js";

async function signupPatients(req, res, next) {
  const { name, cpf, dateOfBirth, phone, email, password } = req.body;
  try {
    await userService.signupPatients({
      name,
      cpf,
      dateOfBirth,
      phone,
      email,
      password,
    });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signupDoctors(req, res, next) {
  const { name, specialty, location, email, password } = req.body;

  try {
    await userService.signupDoctors({
      name,
      specialty,
      location,
      email,
      password,
    });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signinPatients(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await userService.signinPatients({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function signinDoctors(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await userService.signinDoctors({ email, password });
    return res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function searchDoctors(req, res, next) {
  try {
    const { name, specialty, location } = req.query;
    const doctors = await userService.searchDoctors({
      name,
      specialty,
      location,
    });
    res.send(doctors);
  } catch (error) {
    next(error);
  }
}

export default {
  signupPatients,
  signupDoctors,
  signinPatients,
  signinDoctors,
  searchDoctors,
};
