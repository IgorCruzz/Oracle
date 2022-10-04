"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _repositories = require('../../database/repositories');
var _database = require('../../database');

 class UpdateProfessionalService {
  async execute(id_professional, data) {
    const {
      nm_professional,
      id_sector,
      id_role_grade,
      id_user,
      in_active,
    } = data;

    const repository = new (0, _repositories.ProfessionalRepository)();
    const sectorRepository = new (0, _repositories.SectorRepository)();
    const roleGradeRepoistory = new (0, _repositories.RoleGradeRepository)();
    const userRepository = new (0, _repositories.UserRepository)();

    const t = await _database.sequelize.transaction();

    try {
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

      const verifyProfessionalExists = await repository.findProfessionalById({
        id_professional,
      });

      if (!verifyProfessionalExists)
        return {
          error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
        };

      const verifyProfessionalName = await repository.findProfessionalIdandName(
        {
          nm_professional,
          id_professional,
        }
      );

      if (
        verifyProfessionalName &&
        verifyProfessionalName.id_professional !== Number(id_professional)
      )
        return { error: 'Já existe um Colaborador registrado com este nome.' };

      if (id_user) {
        const verifyIfProfessionalHasUser = await repository.findUser({
          id_user,
        });

        if (
          verifyIfProfessionalHasUser &&
          verifyIfProfessionalHasUser.id_professional !==
            Number(id_professional)
        ) {
          return {
            error: 'O usuário inserido já possui ligação a outro Colaborador.',
          };
        }
      }

      if (verifyProfessionalName.in_active !== in_active) {
        console.log('oooooooooo');
        if (id_user) {
          await userRepository.updateUser(id_user, {
            in_active,
          });
        }
      }

      const professionalUpdated = await repository.updateProfessional(
        id_professional,
        data
      );

      t.commit();

      return {
        message: 'Colaborador atualizado com sucesso!',
        professional: professionalUpdated,
      };
    } catch (e) {
      console.log(e);
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.UpdateProfessionalService = UpdateProfessionalService;
