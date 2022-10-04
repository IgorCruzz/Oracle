"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class FindUsersService {
  async execute({
    limit,
    page,
    ds_email_login,
    nm_user,
    tp_profile,
    in_active,
  }) {
    const repository = new (0, _repositories.UserRepository)();
    const professionalRepository = new (0, _repositories.ProfessionalRepository)();

    const findUsers = await repository.findUsers({
      limit,
      ds_email_login,
      nm_user,
      tp_profile,
      page,
      in_active,
    });

    if (tp_profile === '2') {
      const verifyIfUserHasAssociation = await professionalRepository.getAllProfessionals();

      const users = findUsers.rows.map(row => row.dataValues);

      const userHasNoAssociations = users.filter(user => {
        return !verifyIfUserHasAssociation.some(association => {
          return user.id_user === association.id_user;
        });
      });

      return { userHasNoAssociations };
    }

    if (findUsers.length === 0)
      return { error: 'Não há nenhum usuário registrado.' };

    return {
      users: findUsers,
    };
  }
} exports.FindUsersService = FindUsersService;
