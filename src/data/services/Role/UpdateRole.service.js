import { RoleRepository } from '../../database/repositories';

export class UpdateRoleService {
  async execute(id_role, data) {
    const { nm_role } = data;

    const repository = new RoleRepository();

    const verifyRoleExists = await repository.findRoleById({
      id_role,
    });

    if (!verifyRoleExists)
      return { error: `Não existe uma função com este ID -> ${id_role}.` };

    const verifyRoleName = await repository.findRole({
      nm_role,
    });

    if (verifyRoleName && verifyRoleName.id_role !== Number(id_role))
      return { error: 'Já existe uma função registrada com este nome.' };

    const roleUpdated = await repository.updateCategory(id_role, data);

    return {
      message: 'Função atualizada com sucesso!',
      role: roleUpdated,
    };
  }
}
