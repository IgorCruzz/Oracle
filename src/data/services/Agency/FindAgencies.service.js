import { AgencyRepository } from '../../database/repositories';

export class FindAgenciesService {
  async execute({ page, limit, jurisdictionId, search }) {
    const repository = new AgencyRepository();

    const findAgencies = await repository.findAgencies({
      limit,
      page,
      jurisdictionId,
      search,
    });

    if (findAgencies.length === 0)
      return { error: 'Não há nenhum Orgão registrado.' };

    return {
      agencies: findAgencies,
    };
  }
}
