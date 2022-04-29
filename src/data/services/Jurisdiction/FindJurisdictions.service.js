import { JurisdictionRepository } from '../../database/repositories';

export class FindJurisdictionsService {
  async execute({ page, limit, search }) {
    const repository = new JurisdictionRepository();

    const findJurisdictions = await repository.findJurisdictions({
      limit,
      page,
      search,
    });

    if (findJurisdictions.length === 0)
      return { error: 'Não há Esfera registrada.' };

    return {
      jurisdictions: findJurisdictions,
    };
  }
}
