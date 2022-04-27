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

    const dtPlannedStart = verifyDate(dt_planned_start);

    if (dtPlannedStart.error) {
      return { error: dtPlannedStart.error };
    }

    const dtPlannedEnd = verifyDate(dt_planned_end);

    if (dtPlannedEnd.error) {
      return { error: dtPlannedEnd.error };
    }

    const verifyProjectExists = await projectRepository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    const verifyName = await repository.findProjectPhase({
      nm_project_phase,
    });

    if (verifyName) {
      return {
        error: `Já existe uma Fase de projeto com este nome`,
      };
    }

    const projectPhase = await repository.createProjectPhase({
      ...data,
      dtPlannedStart,
      dtPlannedEnd,
    });

    return {
      message: 'Fase de projeto registrado com sucesso!',
      projectPhase,
    };
  }
}
