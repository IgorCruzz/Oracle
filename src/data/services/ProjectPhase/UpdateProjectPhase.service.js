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

    if (!projectExists) {
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };
    }

    const verifyProjectPhaseName = await repository.findProjectPhase({
      nm_project_phase,
    });

    if (
      verifyProjectPhaseName &&
      verifyProjectPhaseName.id_project_phase !== Number(id_project_phase)
    ) {
      return {
        error: `Já existe uma Fase de projeto com este nome.`,
      };
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
