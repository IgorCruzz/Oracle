import { RoleGradeRepository } from '../../database/repositories';

export class UpdateRoleGradeService {
  async execute(id_role_grade, data) {
    const repository = new RoleGradeRepository();

    const verifyRoleExists = await repository.findRoleGradeById({
      id_role_grade,
    });

    if (!verifyRoleExists)
      return {
        error: `Não existe um Custo HH com este ID -> ${id_role_grade}.`,
      };

    const roleUpdated = await repository.updateRoleGrade(id_role_grade, data);

    return {
      message: 'Custo HH atualizado com sucesso!',
      coustHH: roleUpdated,
    };
  }
}
