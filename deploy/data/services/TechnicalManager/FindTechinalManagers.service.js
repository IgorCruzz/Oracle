"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _repositories = require('../../database/repositories');

 class FindTechnicalManagersService {
  async execute({
    page,
    limit,
    id_project,
    nm_technical_manager,
    nu_crea,
    tp_responsability,
  }) {
    const repository = new (0, _repositories.TechnicalManagerRepository)();

    const findTechnicalManagers = await repository.findTechnicalManagers({
      page,
      limit,
      id_project,
      nm_technical_manager,
      nu_crea,
      tp_responsability,
    });

    if (findTechnicalManagers.length === 0)
      return { error: 'Não há nenhum Técnico responsável registrado.' };

    return {
      technicalManagers: findTechnicalManagers,
    };
  }
} exports.FindTechnicalManagersService = FindTechnicalManagersService;
