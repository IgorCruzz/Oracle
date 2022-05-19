import {
  ProfessionalRepository,
  RoleGradeRepository,
  UserRepository,
  SectorRepository,
} from '../../database/repositories';

export class CreateProfessionalService {
  async execute(data) {
    const { nm_professional, id_sector, id_role_grade, id_user } = data;
    const repository = new ProfessionalRepository();
    const sectorRepository = new SectorRepository();
    const roleGradeRepoistory = new RoleGradeRepository();
    const userRepository = new UserRepository();

    const verifySectorId = await sectorRepository.findSectorById({
      id_sector,
    });

    if (!verifySectorId)
      return {
        error: `Não há nenhum Setor registrado com este ID -> ${id_sector}.`,
      };

    const verifyRoleGradeId = await roleGradeRepoistory.findRoleGradeById({
      id_role_grade,
    });

    if (!verifyRoleGradeId)
      return {
        error: `Não há nenhum Custo HH registrado com este ID -> ${id_role_grade}.`,
      };

    if (id_user) {
      const verifyUserId = await userRepository.findUserById({
        id_user,
      });

      if (verifyUserId && verifyUserId.tp_profile !== 2) {
        return {
          error: 'Não foi possível associar com este usuário.',
        };
      }

      if (!verifyUserId)
        return {
          error: `Não há nenhum usuário registrado com este ID -> ${id_user}.`,
        };
    }

    const verifyProfessionalExists = await repository.findProfessional({
      nm_professional,
    });

    if (verifyProfessionalExists)
      return { error: 'Já existe um Colaborador registrado com este nome.' };

    if (id_user) {
      const verifyIfProfessionalHasUser = await repository.findUser({
        id_user,
      });

      if (verifyIfProfessionalHasUser) {
        return {
          error: 'O usuário inserido já possui ligação a outro Colaborador.',
        };
      }
    }

    const professional = await repository.createProfessional(data);

    return {
      message: 'Colaborador registrado com sucesso!',
      professional: professional.dataValues,
    };
  }
}
