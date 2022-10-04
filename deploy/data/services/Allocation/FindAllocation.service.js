"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindAllocationService {
  async execute({ id_allocation }) {
    const repository = new (0, _repositories.AllocationRepository)();

    const findAllocation = await repository.findAllocationById({
      id_allocation,
    });

    if (!findAllocation)
      return {
        error: `Não há nenhuma Alocação registrada com este ID -> ${id_allocation}.`,
      };

    return {
      allocation: findAllocation,
    };
  }
} exports.FindAllocationService = FindAllocationService;
