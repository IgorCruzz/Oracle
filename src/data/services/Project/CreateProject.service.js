import {
  ProjectRepository,
  CityRepository,
  CategoryRepository,
  ProgramRepository,
  AgencyRepository,
} from '../../database/repositories';

export class CreateProjectService {
  async execute(data) {
    const { id_city, id_category, id_program, id_agency, nm_project } = data;

    const repository = new ProjectRepository();
    const cityRepository = new CityRepository();
    const categoryRepository = new CategoryRepository();
    const programRepository = new ProgramRepository();
    const agencyRepository = new AgencyRepository();

    const cityExists = await cityRepository.findCityById({
      id: id_city,
    });

    if (!cityExists) {
      return {
        error: `Não há nenhum Município registrado com este ID -> ${id_city}.`,
      };
    }

    const categoryExists = await categoryRepository.findCategoryById({
      id: id_category,
    });

    if (!categoryExists) {
      return {
        error: `Não há nenhuma Categoria registrada com este ID -> ${id_category}.`,
      };
    }

    const programExists = await programRepository.findProgramById({
      id: id_program,
    });

    if (!programExists) {
      return {
        error: `Não há nenhum Program registrado com este ID -> ${id_program}.`,
      };
    }

    const agencyExists = await agencyRepository.findAgencyById({
      id: id_agency,
    });

    if (!agencyExists) {
      return {
        error: `Não há nenhum Orgão registrado com este ID -> ${id_agency}.`,
      };
    }

    const projectExists = await repository.findProject({
      nm_project,
    });

    if (projectExists) {
      return { error: 'Já existe um Projeto com este nome.' };
    }

    const project = await repository.createProject(data);

    if (project.error) {
      return { error: project.error };
    }

    return {
      message: 'Projeto adicionado com sucesso!',
      project,
    };
  }
}
