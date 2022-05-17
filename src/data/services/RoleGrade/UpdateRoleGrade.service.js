import {
  RoleGradeRepository,
  RoleRepository,
  GradeRepository,
} from '../../database/repositories';

export class UpdateRoleGradeService {
  async execute(id_role_grade, data) {
    const { id_role, id_grade } = data;
    const repository = new RoleGradeRepository();

    const gradeRepository = new GradeRepository();
    const roleRepository = new RoleRepository();

    const verifyRole = await roleRepository.findRoleById({
      id_role,
    });

    if (!verifyRole) {
      return {
        error: `Não há nenhuma função registrada com este ID -> ${id_grade}.`,
      };
    }

    const verifyGradeExists = await gradeRepository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists) {
      return {
        error: `Não há nenhum Cargo registrado com este ID -> ${id_grade}.`,
      };
    }

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
