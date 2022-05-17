import {
  UserRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class DeleteUserService {
  async execute({ id_user }) {
    const repository = new UserRepository();
    const professionalRepository = new ProfessionalRepository();

    const verifyUserIdExists = await repository.findUserById({
      id_user,
    });

    if (!verifyUserIdExists) {
      return { error: `Não existe um usuário com este ID -> ${id_user}.` };
    }

    const verifyFkFromProfessional = await professionalRepository.verifyRelationUser(
      {
        id_user,
      }
    );

    if (verifyFkFromProfessional.length > 0) {
      return {
        error:
          'Não foi possível excluir o usuário pois existe Colaboradores associados.',
      };
    }

    await repository.deleteUser({
      id_user,
    });

    return {
      message: 'Usuário excluído com sucesso!',
    };
  }
}
