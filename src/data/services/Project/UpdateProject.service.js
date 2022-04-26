import {
  AgencyRepository,
  ProjectRepository,
  CityRepository,
  ProgramRepository,
  CategoryRepository,
} from '../../database/repositories';

export class UpdateProjectService {
  async execute(id_project, data) {
    const { id_city, id_category, id_program, id_agency } = data;

    const repository = new ProjectRepository();
    const cityRepository = new CityRepository();
    const categoryRepository = new CategoryRepository();
    const programRepository = new ProgramRepository();
    const agencyRepository = new AgencyRepository();

    const verifyProjectExists = await repository.findProjectById({
      id_project,
    });

    if (!verifyProjectExists)
      return {
        error: `Não há nenhum programa registrado com este ID -> ${id_project}.`,
      };

    if (id_city) {
      const cityExists = await cityRepository.findCityById({
        id: id_city,
      });

      if (!cityExists) {
        return {
          error: `Não há nenhum Município registrado com este ID -> ${id_city}.`,
        };
      }
    }

    if (id_category) {
      const categoryExists = await categoryRepository.findCategoryById({
        id: id_category,
      });

      if (!categoryExists) {
        return {
          error: `Não há nenhuma Categoria registrada com este ID -> ${id_category}.`,
        };
      }
    }

    if (id_program) {
      const programExists = await programRepository.findProgramById({
        id: id_program,
      });

      if (!programExists) {
        return {
          error: `Não há nenhum Program registrado com este ID -> ${id_program}.`,
        };
      }
    }

    if (id_agency) {
      const agencyExists = await agencyRepository.findAgencyById({
        id: id_agency,
      });

      if (!agencyExists) {
        return {
          error: `Não há nenhum Orgão registrado com este ID -> ${id_agency}.`,
        };
      }
    }

    if (data.nm_project) {
      const verifyProjectName = await repository.findProject({
        nm_project: data.nm_project,
      });

      if (
        verifyProjectName &&
        verifyProjectName.id_project !== Number(id_project)
      )
        return { error: 'Já existe um programa registrado com este nome.' };
    }

    const projectUpdated = await repository.updateProject(id_project, data);

    if (projectUpdated.error) {
      return { error: projectUpdated.error };
    }

    return {
      message: 'Projeto atualizado com sucesso!',
      project: projectUpdated,
    };
  }
}
