"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _services = require('../../services');

 class FindUsersController {
  async handle(req, res) {
    try {
      const {
        limit,
        page,
        ds_email_login,
        nm_user,
        tp_profile,
        in_active,
      } = req.query;

      const service = new (0, _services.FindUsersService)();

      const response = await service.execute({
        limit,
        page,
        ds_email_login,
        nm_user,
        tp_profile,
        in_active,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      if (response.userHasNoAssociations) {
        return res.status(200).json({
          users: response.userHasNoAssociations,
        });
      }

      const { count, rows } = response.users;

      return res.status(200).json({
        count,
        page,
        limit,
        users: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
} exports.FindUsersController = FindUsersController;
