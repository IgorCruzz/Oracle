import {
  UserRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class FindUsersService {
  async execute({
    limit,
    page,
    ds_email_login,
    nm_user,
    tp_profile,
    in_active,
  }) {
    const repository = new UserRepository();
    const professionalRepository = new ProfessionalRepository();

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

      return { users: userHasNoAssociations };
    }

    if (findUsers.length === 0)
      return { error: 'Não há nenhum usuário registrado.' };

    return {
      users: findUsers,
    };
  }
}
