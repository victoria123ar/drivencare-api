import userRepository from "../repositories/userRepository.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw Error('Usuário não autorizado');

  try {
    const {
      rows: [session],
    } = await userRepository.findSessionByToken(token);
    if (!session) throw Error('Usuário não autorizado');

    const {
      rows: [userPatient],
    } = await userRepository.findByIdPatients(session.userId);
    if (!user) throw Error('Usuário não localizado');

    res.locals.userPatient = userPatient;

    const {
        rows: [userDoctor],
      } = await userRepository.findByIdDoctors(session.userId);
      if (!user) throw Error('Usuário não localizado');
  
      res.locals.userDoctor = userDoctor;
    next();
  } catch (err) {
    next(err);
  }
}

export default { authValidation };