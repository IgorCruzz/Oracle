"use strict";Object.defineProperty(exports, "__esModule", {value: true});




var _repositories = require('../../database/repositories');
var _database = require('../../database');

 class DeleteProfessionalService {
  async execute({ id_professional }) {
    const repository = new (0, _repositories.ProfessionalRepository)();
    const productHistory = new (0, _repositories.ProductHistoryRepository)();
    const userRepository = new (0, _repositories.UserRepository)();
    const allocationRepository = new (0, _repositories.AllocationRepository)();

    const t = await _database.sequelize.transaction();

    try {
      const verifyProfessionalExists = await repository.findProfessionalById({
        id_professional,
      });

      if (!verifyProfessionalExists)
        return {
          error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
        };

      const verifyFkProductHistory = await productHistory.verifyRelation({
        id_professional,
      });

      if (verifyFkProductHistory.length > 0) {
        return {
          error:
            'Não foi possível excluir o Colaborador pois existem Históricos de produtos associados.',
        };
      }

      const verifyFkProfessional = await allocationRepository.verifyRelationProfessional(
        {
          id_professional,
        }
      );

      if (verifyFkProfessional.length > 0) {
        return {
          error:
            'Não foi possível excluir o Colaborador pois existem Alocações associadas.',
        };
      }

      const { id_user } = verifyProfessionalExists;

      await repository.deleteProfessional({
        id_professional,
        transaction: t,
      });

      if (id_user) {
        await userRepository.deleteUser({
          id_user,
          transaction: t,
        });
      }

      t.commit();

      return {
        message: 'Colaborador excluído com sucesso!',
      };
    } catch (e) {
      console.log(e);
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.DeleteProfessionalService = DeleteProfessionalService;
