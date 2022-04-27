import {
  ProjectPhaseRepository,
  ProjectRepository,
} from '../../database/repositories';

export class UpdateProjectPhaseService {
  async execute(id_project_phase, data) {
    const { id_project, nm_project_phase } = data;

    const repository = new ProjectPhaseRepository();
    const projectRepository = new ProjectRepository();

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
      data
    );

    if (projectPhaseUpdated.error) {
      return { error: projectPhaseUpdated.error };
    }

    return {
      message: 'Fase de projeto atualizada com sucesso!',
      projectPhase: projectPhaseUpdated,
    };
  }
}
