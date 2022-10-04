"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class UpdateTechnicalManagerService {
  async execute(id_technical_manager, data) {
    const { id_project, nu_crea } = data;

    const repository = new (0, _repositories.TechnicalManagerRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    const verifyTechnicalManagerExists = await repository.findTechnicalManagerById(
      {
        id_technical_manager,
      }
    );

    if (!verifyTechnicalManagerExists)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    if (id_project) {
      const projectExists = await projectRepository.findProjectById({
        id_project,
      });

      if (!projectExists || projectExists.dt_deleted_at) {
        return {
          error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
        };
      }
    }
    if (nu_crea) {
      const verifyCrea = await repository.verifyCREA({
        nu_crea,
      });

      if (
        verifyCrea &&
        verifyCrea.id_technical_manager !== Number(id_technical_manager)
      ) {
        return {
          error: `Já existe um Técnico responsável com o CREA ${nu_crea}`,
        };
      }
    }

    const technicalManagerUpdated = await repository.updateTechnicalManagerArea(
      id_technical_manager,
      data
    );

    return {
      message: 'Técnico responsável atualizado com sucesso!',
      technicalManager: technicalManagerUpdated,
    };
  }
} exports.UpdateTechnicalManagerService = UpdateTechnicalManagerService;
