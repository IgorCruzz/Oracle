import { RoleRepository } from '../../database/repositories';

export class DeleteRoleService {
  async execute({ id_role }) {
    const repository = new RoleRepository();

    const verifyRoleExists = await repository.findRoleById({
      id_role,
    });

    if (!verifyRoleExists)
      return { error: `Não existe uma função com este ID -> ${id_role}.` };

    await repository.deleteRole({
      id_role,
    });

    return {
      message: 'Função excluída com sucesso!',
    };
  }
}
