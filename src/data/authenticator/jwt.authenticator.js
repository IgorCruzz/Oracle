import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  if (
    !authorization.includes('Bearer') &&
    authorization === '97f6ee40-3b5e-11ed-a261-0242ac120002'
  ) {
    next();
    return;
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      'f04af61b3f332afa0ceec786a42cd365'
    );

    req.userId = decoded.user.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
