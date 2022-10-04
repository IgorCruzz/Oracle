"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _repositories = require('../../database/repositories');

 class DeleteAllocationPeriodService {
  async execute({ id_allocation_period }) {
    const repository = new (0, _repositories.AllocationPeriodRepository)();
    const allocationRepository = new (0, _repositories.AllocationRepository)();
    const productHistoryRepository = new (0, _repositories.ProductHistoryRepository)();

    const verifyAllocationPeriodExists = await repository.findAllocationPeriodById(
      {
        id_allocation_period,
      }
    );

    if (!verifyAllocationPeriodExists)
      return {
        error: `Não há nenhum Período de Alocação registrado com este ID -> ${id_allocation_period}.`,
      };

    const verifyFkAllocation = await allocationRepository.verifyRelationAllocationPeriod(
      {
        id_allocation_period,
      }
    );

    if (verifyFkAllocation.length > 0) {
      return {
        error:
          'Não foi possível excluir o Período de Alocação pois existem Alocações associadas.',
      };
    }

    const verifyFkProductHistory = await productHistoryRepository.verifyRelationAllocationPeriod(
      {
        id_allocation_period,
      }
    );

    if (verifyFkProductHistory.length > 0) {
      return {
        error:
          'Não foi possível excluir o Período de Alocação pois existem Históricos de produtos associados.',
      };
    }

    await repository.deleteAllocationPeriod({
      id_allocation_period,
    });

    return {
      message: 'Período de Alocação excluído com sucesso!',
    };
  }
} exports.DeleteAllocationPeriodService = DeleteAllocationPeriodService;
