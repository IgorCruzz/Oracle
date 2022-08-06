import { Op } from 'sequelize';
import { User } from '../database/models';

export const roleAuthenticator = ({ roles }) => async (req, res, next) => {
  const { userId } = req;

  const checkRole = await User.findOne({
    where: {
      [Op.and]: [
        {
          id_user: userId,
        },
        {
          role: {
            [Op.in]: roles,
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
