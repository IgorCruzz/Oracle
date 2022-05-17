import { compareDesc } from 'date-fns';
import {
  ProjectPhaseRepository,
  ProjectRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class UpdateProjectPhaseService {
  async execute(id_project_phase, data) {
    const {
      id_project,
      nm_project_phase,
      dt_planned_start,
      dt_planned_end,
      change,
    } = data;

    const repository = new ProjectPhaseRepository();
    const projectRepository = new ProjectRepository();

    let dtPlannedStart;
    let dtPlannedEnd;

    if (dt_planned_start) {
      dtPlannedStart = verifyDate({
        msg: 'Data de ínicio planejado inválida. Utilize o formato dd/mm/yyyy',
        value: dt_planned_start,
      });

      if (dt_planned_start.error) {
        return { error: dtPlannedStart.error };
      }
    }

    if (dt_planned_end) {
      dtPlannedEnd = verifyDate({
        value: dt_planned_end,
        msg: 'Data de término planejado inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtPlannedEnd.error) {
        return { error: dtPlannedEnd.error };
      }
    }

    const verifyProjectPhaseExists = await repository.findProjectPhaseById({
      id_project_phase,
    });

    if (!verifyProjectPhaseExists)
      return {
        error: `Não há nenhuma Fase de projeto registrada com este ID -> ${id_project_phase}.`,
      };

    const projectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!projectExists || projectExists.dt_deleted_at) {
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };
    }

    if (!change) {
      const verifyName = await repository.findProjectPhaseName({
        nm_project_phase,
        id_project,
      });

      if (
        verifyName &&
        verifyName.id_project_phase !== Number(id_project_phase)
      ) {
        return {
          error: `Já existe uma Fase de projeto com este nome`,
        };
      }
    }

    if (dtPlannedStart && dtPlannedEnd) {
      const compareDate = compareDesc(
        new Date(dtPlannedStart),
        new Date(dtPlannedEnd)
      );

      if (compareDate === -1) {
        return {
          error: 'A data de Fim planejado precisa ser posterior a de Ínicio',
        };
      }
    }

    const projectPhaseUpdated = await repository.updateTechnicalManagerArea(
      id_project_phase,
      { ...data, dtPlannedStart, dtPlannedEnd }
    );

    return {
      message: 'Fase de projeto atualizada com sucesso!',
      projectPhase: projectPhaseUpdated,
    };
  }
}
