"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');



var _repositories = require('../../database/repositories');
var _verifyDate = require('../../../utils/verifyDate');

 class CreateProjectPhaseService {
  async execute(data) {
    const {
      id_project,
      nm_project_phase,
      dt_planned_start,
      dt_planned_end,
    } = data;

    const repository = new (0, _repositories.ProjectPhaseRepository)();
    const projectRepository = new (0, _repositories.ProjectRepository)();

    let dtPlannedStart;
    let dtPlannedEnd;

    if (dt_planned_start) {
      dtPlannedStart = _verifyDate.verifyDate.call(void 0, {
        msg: 'Data de ínicio planejado inválida. Utilize o formato dd/mm/yyyy',
        value: dt_planned_start,
      });

      if (dtPlannedStart.error) {
        return { error: dtPlannedStart.error };
      }
    }

    if (dt_planned_end) {
      dtPlannedEnd = _verifyDate.verifyDate.call(void 0, {
        value: dt_planned_end,
        msg: 'Data de término planejado inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtPlannedEnd.error) {
        return { error: dtPlannedEnd.error };
      }
    }

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyName = await repository.findProjectPhaseName({
      nm_project_phase,
      id_project,
    });

    if (verifyName) {
      return {
        error: `Já existe uma Fase de projeto com este nome`,
      };
    }

    if (dtPlannedStart && dtPlannedEnd) {
      const compareDate = _datefns.compareDesc.call(void 0, 
        new Date(dtPlannedStart),
        new Date(dtPlannedEnd)
      );

      if (compareDate === -1) {
        return {
          error: 'A data de Fim planejado precisa ser posterior a de Ínicio',
        };
      }
    }

    const projectPhase = await repository.createProjectPhase({
      ...data,
      dtPlannedStart,
      dtPlannedEnd,
    });

    return {
      message: 'Fase de Projeto registrada com sucesso!',
      projectPhase,
    };
  }
} exports.CreateProjectPhaseService = CreateProjectPhaseService;
