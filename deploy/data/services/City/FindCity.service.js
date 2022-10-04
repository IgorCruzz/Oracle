"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindCityService {
  async execute({ id }) {
    const repository = new (0, _repositories.CityRepository)();

    const findCity = await repository.findCityById({
      id,
      populate: true,
    });

    if (!findCity)
      return {
        error: `Não existe um Município registrado com este ID -> ${id}.`,
      };

    return {
      city: findCity,
    };
  }
} exports.FindCityService = FindCityService;
