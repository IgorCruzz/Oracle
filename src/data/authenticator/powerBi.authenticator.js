import { Op } from 'sequelize';
import getIP from 'ipware';
import { subHours } from 'date-fns';
import { Bi_configuration, Bi_log } from '../database/models';

const checkToken = async ({ cd_bi_token, nm_bi, nu_ip_request, next, res }) => {
  const token = await Bi_configuration.findOne({
    where: {
      [Op.and]: [{ cd_bi_token: cd_bi_token.trim() }, { nm_bi }],
    },
  });

  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  const { id_bi_configuration } = token;

  await Bi_log.create({
    dt_request: subHours(new Date(), 3),
    nu_ip_request,
    id_bi_configuration,
  });

  next();
};

export const powerBIAuthenticator = ({ service }) => async (req, res, next) => {
  const { cd_bi_token } = req.headers;

  if (!cd_bi_token) {
    return res.status(401).json({ error: 'Insira o token para prosseguir.' });
  }

  const getIp = getIP().get_trusted_ip(req);

  const services = {
    Portfolio: 'Portfolio',
    Projeto: 'Projeto',
    Colaborador: 'Colaborador',
    Vistoria: 'Vistoria',
  };

  if (services[service]) {
    checkToken({
      nu_ip_request: getIp.clientIp.toString().replace('::ffff:', ''),
      cd_bi_token,
      nm_bi: service,
      next,
      res,
    });
  }
};
