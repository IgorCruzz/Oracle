import { AgencyRepository } from '../../database/repositories';

export class FindAgenciesService {
  async execute({ page, limit, jurisdictionId }) {
    const repository = new AgencyRepository();

    const findAgencies = await repository.findAgencies({
      limit,
      page,
      jurisdictionId,
    });

    if (findAgencies.length === 0)
      return { error: 'There are no registered agencies.' };

    return {
      agencies: findAgencies,
    };
  }
}
