"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindProfessionalService {
  async execute({ id_professional }) {
    const repository = new (0, _repositories.ProfessionalRepository)();

    const findProfessional = await repository.findProfessionalById({
      id_professional,
      populate: true,
    });

    if (!findProfessional)
      return {
        error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
      };

    return {
      professional: findProfessional,
    };
  }
} exports.FindProfessionalService = FindProfessionalService;
