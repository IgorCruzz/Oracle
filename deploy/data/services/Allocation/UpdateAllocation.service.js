"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');
var _database = require('../../database');

 class UpdateAllocationService {
  async execute(id_allocation, { id_professional }) {
    const t = await _database.sequelize.transaction();

    const repository = new (0, _repositories.AllocationRepository)();

    const productHistoryRepository = new (0, _repositories.ProductHistoryRepository)();

    try {
      const getAllocation = await repository.findAllocationById({
        id_allocation,
        transaction: t,
      });

      if (!getAllocation)
        return {
          error: `Não há nenhuma locação registrada com este ID -> ${id_allocation}.`,
        };

      const { id_product, id_professional: professional } = getAllocation;

      const { id_allocation_period } = getAllocation;

      if (professional !== id_professional) {
        await productHistoryRepository.deleteProductHistory({
          id_professional: professional,
          id_product,
          transaction: t,
        });

        await productHistoryRepository.createProductHistory({
          cd_status: 0,
          dt_status: new Date(Date.now()).toISOString(),
          tx_remark: null,
          id_product,
          id_allocation_period,
          id_professional: professional,
          id_analyst_user: null,
          transaction: t,
        });

        await productHistoryRepository.createProductHistory({
          cd_status: 1,
          dt_status: new Date(Date.now()).toISOString(),
          tx_remark: null,
          id_product,
          id_allocation_period,
          id_professional,
          id_analyst_user: null,
          transaction: t,
        });

        await repository.updateAllocation(id_allocation, {
          transaction: t,
          id_professional,
        });
      }

      t.commit();

      return {
        message: 'Substituição de colaborador efetuada com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.UpdateAllocationService = UpdateAllocationService;
