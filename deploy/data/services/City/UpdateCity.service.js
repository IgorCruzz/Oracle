"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateCityService {
  async execute({ name, id, regionId }) {
    const repository = new (0, _repositories.CityRepository)();
    const regionRepository = new (0, _repositories.RegionRepository)();

    if (name && !regionId) {
      const verifyCitiesExists = await repository.findCityById({
        id,
      });

      if (!verifyCitiesExists)
        return {
          error: `Não existe um Município registrado com este ID -> ${id}.`,
        };

      const verifyCityName = await repository.findCity({
        name,
      });

      if (verifyCityName && verifyCityName.id_city !== Number(id))
        return { error: 'Já foi registrado um Município com este nome.' };

      const cityUpdated = await repository.updateCity({
        id,
        name,
      });

      return {
        message: 'Município atualizado com sucesso!',
        city: cityUpdated,
      };
    }

    if (regionId && !name) {
      const verifyCitiesExists = await repository.findCityById({
        id,
      });

      if (!verifyCitiesExists)
        return {
          error: `Não existe um Município registrado com este ID -> ${id}.`,
        };

      const verifyRegionExists = await regionRepository.findRegionById({
        id: regionId,
      });

      if (!verifyRegionExists)
        return {
          error: `Não existe uma Região com este ID -> ${regionId}`,
        };

      const cityUpdated = await repository.updateCity({
        id,
        regionId,
      });

      return {
        message: 'Município atualizado com sucesso!',
        city: cityUpdated,
      };
    }

    const verifyCitiesExists = await repository.findCityById({
      id,
    });

    if (!verifyCitiesExists)
      return {
        error: `Não existe um Município registrado com este ID -> ${id}.`,
      };

    const verifyCityName = await repository.findCity({
      name,
    });

    if (verifyCityName && verifyCityName.id_city !== Number(id))
      return { error: 'Já foi registrado um Município com este nome.' };

    const verifyRegionExists = await regionRepository.findRegionById({
      id: regionId,
    });

    if (!verifyRegionExists)
      return {
        error: `Não existe uma Região com este ID -> ${regionId}`,
      };

    const cityUpdated = await repository.updateCity({
      id,
      name,
      regionId,
    });

    return {
      message: 'Município atualizado com sucesso!',
      city: cityUpdated,
    };
  }
} exports.UpdateCityService = UpdateCityService;
