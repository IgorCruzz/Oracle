import { RoleGradeRepository } from '../../database/repositories';

export class FindRoleGradeService {
  async execute({ id_role_grade }) {
    const repository = new RoleGradeRepository();

    const findRole = await repository.findRoleGradeById({
      id_role_grade,
    });

    if (!findRole)
      return {
        error: `Não existe um Custo H:H com este ID -> ${id_role_grade}.`,
      };

    return {
      roleGrade: findRole,
    };
  }
}
