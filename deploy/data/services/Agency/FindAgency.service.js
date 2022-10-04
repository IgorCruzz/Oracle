"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindAgencyService {
  async execute({ id }) {
    const repository = new (0, _repositories.AgencyRepository)();

    const findAgency = await repository.findAgencyById({
      id,
      populate: true,
    });

    if (!findAgency)
      return {
        error: `Não há nenhum Orgão registrado com este ID -> ${id}.`,
      };

    return {
      agency: findAgency,
    };
  }
} exports.FindAgencyService = FindAgencyService;
