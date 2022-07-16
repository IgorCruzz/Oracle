import { Op } from 'sequelize';
import { Bi_configuration } from '../database/models/Bi_configuration';

const checkToken = async ({ authorization, nm_bi, next, res }) => {
  const [, cd_bi_token] = authorization.split(' ');

  const token = await Bi_configuration.findOne({
    where: {
      [Op.and]: [{ cd_bi_token }, { nm_bi }],
    },
  });

  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  next();
};

export const powerBIAuthenticator = ({ service }) => async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  const services = {
    Portfolio: 'Portfolio',
    Produto: 'Produto',
    Colaborador: 'Colaborador',
    Vistoria: 'Vistoria',
  };

  if (services[service]) {
    checkToken({
      authorization,
      nm_bi: service,
      next,
      res,
    });
  }
};
