"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class UpdateJurisdictionService {
  async execute({ name, id }) {
    const repository = new (0, _repositories.JurisdictionRepository)();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma Esfera registrada com este ID -> ${id}.`,
      };

    const verifyJurisdictionName = await repository.findJurisdiction({
      name,
    });

    if (
      verifyJurisdictionName &&
      verifyJurisdictionName.id_jurisdiction !== Number(id)
    )
      return { error: 'Já existe uma Esfera com este nome registrado.' };

    const jurisdictionUpdated = await repository.updateJurisdiction({
      id,
      name,
    });

    return {
      message: 'Esfera atualizada com sucesso!',
      jurisdiction: jurisdictionUpdated,
    };
  }
} exports.UpdateJurisdictionService = UpdateJurisdictionService;
