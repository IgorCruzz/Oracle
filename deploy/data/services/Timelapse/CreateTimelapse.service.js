"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');

 class CreateTimelapseService {
  async execute(data) {
    const { id_project_phase } = data;

    const repository = new (0, _repositories.TimelapseRepository)();
    const projectPhaseRepository = new (0, _repositories.ProjectPhaseRepository)();

    const projectPhaseExists = await projectPhaseRepository.findProjectPhaseById(
      {
        id_project_phase,
        populate: false,
      }
    );

    if (!projectPhaseExists) {
      return {
        error: `Não há nenhuma fase do projeto registrado com este ID -> ${id_project_phase}.`,
      };
    }

    const timelapse = await repository.createTimelapse({
      ...data,
    });

    if (timelapse.error) {
      return { error: timelapse.error };
    }

    return {
      message: 'Vistoria adicionada com sucesso!',
      timelapse,
    };
  }
} exports.CreateTimelapseService = CreateTimelapseService;
