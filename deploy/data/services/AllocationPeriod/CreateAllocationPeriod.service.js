"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');
var _repositories = require('../../database/repositories');
var _verifyDate = require('../../../utils/verifyDate');

 class CreateAllocationPeriodService {
  async execute(data) {
    const { dt_start_allocation, dt_end_allocation, qt_business_hours } = data;

    const repository = new (0, _repositories.AllocationPeriodRepository)();

    const dtAllocationStart = _verifyDate.verifyDate.call(void 0, {
      msg:
        'Data inicial do período de Alocação inválida. Utilize o formato dd/mm/yyyy',
      value: dt_start_allocation,
    });

    if (dtAllocationStart.error) {
      return { error: dtAllocationStart.error };
    }

    const dtAllocationEnd = _verifyDate.verifyDate.call(void 0, {
      msg: 'Data final do período de Alocação. Utilize o formato dd/mm/yyyy',
      value: dt_end_allocation,
    });

    if (dtAllocationEnd.error) {
      return { error: dtAllocationEnd.error };
    }

    const compareDate = _datefns.compareDesc.call(void 0, 
      new Date(dtAllocationStart),
      new Date(dtAllocationEnd)
    );

    if (compareDate === -1) {
      return {
        error:
          'A data final do período de Alocação precisa ser posterior a de Ínicio',
      };
    }

    const verifyAllocationPeriodExists = await repository.findAllocationPeriod({
      dt_start_allocation: dtAllocationStart,
      dt_end_allocation: dtAllocationEnd,
      qt_business_hours,
    });

    if (verifyAllocationPeriodExists) {
      return {
        error: 'Já existe um Período de Alocação com estes dados.',
      };
    }

    const allocationPeriod = await repository.createAllocationPeriod({
      ...data,
      dtAllocationStart,
      dtAllocationEnd,
    });

    return {
      message: 'Período de Alocação registrado com sucesso!',
      allocationPeriod,
    };
  }
} exports.CreateAllocationPeriodService = CreateAllocationPeriodService;
