"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _models = require('../../models');

 class PasswordRecoveryRepository {
  async createRecoveryPassword({ email, cd_recovery, id_user }) {
    await _models.Password_recovery.create({
      id_user,
      email: email.trim(),
      cd_recovery,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }

  async findUser({ id_user }) {
    return _models.Password_recovery.findOne({
      where: { id_user },
    });
  }

  async deleteCode({ id_user }) {
    return _models.Password_recovery.destroy({
      where: { id_user },
    });
  }

  async updateCode({ email, cd_recovery, id_user }) {
    const category = await _models.Password_recovery.findOne({
      where: {
        id_user,
      },
    });

    await category.update({
      email: email.trim(),
      cd_recovery,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }
} exports.PasswordRecoveryRepository = PasswordRecoveryRepository;
