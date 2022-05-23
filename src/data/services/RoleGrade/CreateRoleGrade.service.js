import {
  RoleGradeRepository,
  RoleRepository,
  GradeRepository,
} from '../../database/repositories';

export class CreateRoleGradeService {
  async execute(data) {
    const { id_grade, id_role } = data;

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

    const verifyRoleExists = await repository.findRoleGrade({
      id_grade,
      id_role,
    });

    if (verifyRoleExists)
      return {
        error: 'Custo HH já cadastrado!',
      };

    const coustHH = await repository.createRoleGrade(data);

    return {
      message: 'Custo HH registrado com sucesso!',
      coustHH: coustHH.dataValues,
    };
  }
}
