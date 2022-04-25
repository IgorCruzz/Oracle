import {
  AgencyRepository,
  ProjectRepository,
  CityRepository,
  ProgramRepository,
  CategoryRepository,
} from '../../database/repositories';

export class UpdateProjectService {
  async execute(data) {
    const repository = new ProjectRepository();
    const cityRepository = new CityRepository();
    const categoryRepository = new CategoryRepository();
    const programRepository = new ProgramRepository();
    const agencyRepository = new AgencyRepository();

    return {
      message: 'Orgão atualizado com sucesso!',
      agency: agencyUpdated,
    };
  }
}
