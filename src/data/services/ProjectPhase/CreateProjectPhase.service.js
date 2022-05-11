import { compareDesc } from 'date-fns';
import {
  ProjectPhaseRepository,
  ProjectRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class CreateProjectPhaseService {
  async execute(data) {
    const {
      id_project,
      nm_project_phase,
      dt_planned_start,
      dt_planned_end,
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

      if (dtPlannedStart.error) {
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

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
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
}
