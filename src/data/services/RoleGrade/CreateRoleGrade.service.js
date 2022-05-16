import { RoleGradeRepository } from '../../database/repositories';

export class CreateRoleGradeService {
  async execute(data) {
    const { id_grade, id_role, vl_hour_cost, vl_salary } = data;

    const repository = new RoleGradeRepository();

    const verifyRoleExists = await repository.findRoleGrade({
      id_grade,
      id_role,
      vl_hour_cost,
      vl_salary,
    });

    if (verifyRoleExists)
      return {
        error:
          'Já existe um Custo H:H registrado com a função e cargo inserido.',
      };

    const roleGrade = await repository.createRoleGrade(data);

    return {
      message: 'Custo H:H registrado com sucesso!',
      roleGrade: roleGrade.dataValues,
    };
  }
}
