import { RoleRepository } from '../../database/repositories';

export class FindRoleService {
  async execute({ id_role }) {
    const repository = new RoleRepository();

    const findRole = await repository.findRoleById({
      id_role,
    });

    if (!findRole)
      return { error: `Não existe uma Função com este ID -> ${id_role}.` };

    return {
      role: findRole,
    };
  }
}
