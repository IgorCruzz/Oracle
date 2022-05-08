import {
  ProjectRepository,
  CityRepository,
  CategoryRepository,
  ProgramRepository,
  AgencyRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class CreateProjectService {
  async execute(data) {
    const {
      id_city,
      id_category,
      id_program,
      id_agency,
      nm_project,
      dt_official_document,
    } = data;

    const repository = new ProjectRepository();
    const cityRepository = new CityRepository();
    const categoryRepository = new CategoryRepository();
    const programRepository = new ProgramRepository();
    const agencyRepository = new AgencyRepository();

    let dtOfficial;
    if (dt_official_document) {
      dtOfficial = verifyDate({
        value: dt_official_document,
        msg: 'Data do ofício inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtOfficial.error) {
        return { error: dtOfficial.error };
      }
    }

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
        error: `Não há nenhum Programa registrado com este ID -> ${id_program}.`,
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

    const project = await repository.createProject({
      ...data,
      dtOfficial,
    });

    if (project.error) {
      return { error: project.error };
    }

    return {
      message: 'Projeto adicionado com sucesso!',
      project,
    };
  }
}
