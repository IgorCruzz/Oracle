import { RoleRepository } from '../../database/repositories';

export class FindRolesService {
  async execute() {
    const repository = new RoleRepository();

    const findRoles = await repository.findRoles();

    if (findRoles.length === 0)
      return { error: 'Não há nenhuma Função registrada.' };

    return {
      roles: findRoles,
    };
  }
}
