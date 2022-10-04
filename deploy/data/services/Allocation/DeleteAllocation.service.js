"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');
var _database = require('../../database');

 class DeleteAllocationService {
  async execute({ allocations }) {
    const t = await _database.sequelize.transaction();

    const repository = new (0, _repositories.AllocationRepository)();

    const productHistoryRepository = new (0, _repositories.ProductHistoryRepository)();

    try {
      await Promise.all(
        allocations.map(
          async ({ id_allocation_period, id_product, id_professional }) => {
            const verifyAllocationExists = await repository.findAllocationToDelete(
              {
                id_allocation_period,
                id_product,
                id_professional,
              }
            );

            const { id_allocation } = verifyAllocationExists;
            if (id_allocation) {
              await productHistoryRepository.createProductHistory({
                cd_status: 0,
                dt_status: new Date(Date.now()).toISOString(),
                tx_remark: null,
                id_product,
                id_allocation_period: null,
                id_previous_professional: id_professional,
                id_professional: null,
                id_analyst_user: null,
                transaction: t,
              });

              await repository.deleteAllocation({
                id_allocation,
                transaction: t,
              });
            }
          }
        )
      );

      t.commit();

      return {
        message: 'Desalocação efetuada com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.DeleteAllocationService = DeleteAllocationService;
