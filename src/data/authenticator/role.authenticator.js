import { Op } from 'sequelize';
import { User } from '../database/models';

export const roleAuthenticator = ({ profiles }) => async (req, res, next) => {
  const { userId } = req;

  const checkRole = await User.findOne({
    where: {
      [Op.and]: [
        {
          id_user: userId,
        },
        {
          tp_profile: {
            [Op.in]: profiles,
          },
        },
      ],
    },
  });

  if (!checkRole) {
    return res.status(400).json({ message: 'Você não possui permissão!' });
  }

  next();
};
