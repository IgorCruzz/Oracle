import { RoleGradeRepository } from '../../database/repositories';

export class DeleteRoleGradeService {
  async execute({ id_role_grade }) {
    const repository = new RoleGradeRepository();

    const verifyRoleExists = await repository.findRoleGradeById({
      id_role_grade,
    });

    if (!verifyRoleExists)
      return {
        error: `Não existe um Custo H:H com este ID -> ${id_role_grade}.`,
      };

    await repository.deleteRoleGrade({
      id_role_grade,
    });

    return {
      message: 'Custo H:H excluído com sucesso!',
    };
  }
}
