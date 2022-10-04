"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateTechnicalManagerService {
  async execute(data) {
    const { id_project, nu_crea } = data;

    const repository = new (0, _repositories.TechnicalManagerRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyCrea = await repository.verifyCREA({
      nu_crea,
    });

    if (verifyCrea) {
      return {
        error: `Já existe um Técnico responsável com o CREA ${nu_crea}`,
      };
    }

    const technicalManager = await repository.createTechnicalManager(data);

    return {
      message: 'Técnico responsável registrado com sucesso!',
      technicalManager,
    };
  }
} exports.CreateTechnicalManagerService = CreateTechnicalManagerService;
