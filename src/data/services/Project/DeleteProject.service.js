import {
  ProjectRepository,
  // LocationRepository,
  // TechnicalManagerRepository,
  // ProjectPhaseRepository,
  UserRepository,
} from '../../database/repositories';

export class DeleteProjectService {
  async execute({ id_project, id_user }) {
    const repository = new ProjectRepository();
    // const locationRepository = new LocationRepository();
    // const technicalManagerRepository = new TechnicalManagerRepository();
    // const projectPhaseRepository = new ProjectPhaseRepository();
    const userRepository = new UserRepository();

    const verifyProjectExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists || verifyProjectExists.dt_deleted_at)
      return {
        error: `Não há nenhum Projeto registrado com este ID -> ${id_project}.`,
      };

    // const verifyFkLocation = await locationRepository.verifyProject({
    //   id_project,
    // });

    // if (verifyFkLocation.length > 0) {
    //   return {
    //     error:
    //       'Não foi possível excluir o Projeto pois existem Localização de Canteiros associadas.',
    //   };
    // }

    // const verifyFkProjectPhase = await projectPhaseRepository.verifyProject({
    //   id_project,
    // });

    // if (verifyFkProjectPhase.length > 0) {
    //   return {
    //     error:
    //       'Não foi possível excluir o Projeto pois existem Fases de projetos associadas.',
    //   };
    // }

    // const verifyFkTechnicalManager = await technicalManagerRepository.verifyProject(
    //   {
    //     id_project,
    //   }
    // );

    // if (verifyFkTechnicalManager.length > 0) {
    //   return {
    //     error:
    //       'Não foi possível excluir o Projeto pois existem Técnico responsáveis associados.',
    //   };
    // }

    const getUserEmail = await userRepository.findUserById({
      id_user,
    });

    await repository.deleteProject({
      id_project,
      nm_deleted_by: getUserEmail.ds_email_login,
    });

    return {
      message: 'Projeto excluído com sucesso!',
    };
  }
}
