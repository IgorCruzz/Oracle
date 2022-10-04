"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindTechnicalManagerService {
  async execute({ id_technical_manager }) {
    const repository = new (0, _repositories.TechnicalManagerRepository)();

    const findTechnicalManager = await repository.findTechnicalManagerById({
      id_technical_manager,
      populate: true,
    });

    if (!findTechnicalManager)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    return {
      technicalManager: findTechnicalManager,
    };
  }
} exports.FindTechnicalManagerService = FindTechnicalManagerService;
