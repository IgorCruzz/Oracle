import { RoleGradeRepository } from '../../database/repositories';

export class FindRoleGradesService {
  async execute({ id_grade, id_role, limit, page, vl_hour_cost, vl_salary }) {
    const repository = new RoleGradeRepository();

    const findRoles = await repository.findRoleGrades({
      id_grade,
      id_role,
      limit,
      page,
      vl_hour_cost,
      vl_salary,
    });

    if (findRoles.length === 0)
      return { error: 'Não há nenhum Custo HH registrado.' };

    return {
      coustsHH: findRoles,
    };
  }
}
