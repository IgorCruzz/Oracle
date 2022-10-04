"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../database/models');

 const roleAuthenticator = ({ profiles }) => async (req, res, next) => {
  const { userId } = req;

  const checkRole = await _models.User.findOne({
    where: {
      [_sequelize.Op.and]: [
        {
          id_user: userId,
        },
        {
          tp_profile: {
            [_sequelize.Op.in]: profiles,
          },
        },
      ],
    },
  });

  if (!checkRole) {
    return res.status(400).json({ message: 'Você não possui permissão!' });
  }

  next();
}; exports.roleAuthenticator = roleAuthenticator;
