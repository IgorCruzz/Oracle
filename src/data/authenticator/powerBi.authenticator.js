import { Op } from 'sequelize';
import getIP from 'ipware';
import { Bi_configuration, Bi_log } from '../database/models';

const checkToken = async ({
  authorization,
  nm_bi,
  nu_ip_request,
  next,
  res,
}) => {
  const [, cd_bi_token] = authorization.split(' ');

  const token = await Bi_configuration.findOne({
    where: {
      [Op.and]: [{ cd_bi_token }, { nm_bi }],
    },
  });

  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  const { id_bi_configuration } = token;

  await Bi_log.create({
    dt_request: new Date(),
    nu_ip_request,
    id_bi_configuration,
  });

  next();
};

export const powerBIAuthenticator = ({ service }) => async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  const getIp = getIP().get_trusted_ip(req);

  const services = {
    Portfolio: 'Portfolio',
    Produto: 'Produto',
    Colaborador: 'Colaborador',
    Vistoria: 'Vistoria',
  };

  if (services[service]) {
    checkToken({
      nu_ip_request: getIp.clientIp,
      authorization,
      nm_bi: service,
      next,
      res,
    });
  }
};
