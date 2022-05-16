import { AgencyRepository } from '../../database/repositories';

export class FindAgenciesService {
  async execute({ page, limit, jurisdictionId, nm_agency }) {
    const repository = new AgencyRepository();

    const findAgencies = await repository.findAgencies({
      limit,
      page,
      jurisdictionId,
      nm_agency,
    });

    if (findAgencies.length === 0)
      return { error: 'Não há nenhum Orgão registrado.' };

    return {
      agencies: findAgencies,
    };
  }
}
