import { RoleRepository } from '../../database/repositories';

export class FindRolesService {
  async execute({ page, limit, nm_role }) {
    const repository = new RoleRepository();

    const findRoles = await repository.findRoles({ page, limit, nm_role });

    if (findRoles.length === 0)
      return { error: 'Não há nenhuma Função registrada.' };

    return {
      roles: findRoles,
    };
  }
}
