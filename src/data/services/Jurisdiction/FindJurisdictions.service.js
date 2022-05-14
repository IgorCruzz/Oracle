import { JurisdictionRepository } from '../../database/repositories';

export class FindJurisdictionsService {
  async execute({ page, limit, nm_jurisdiction }) {
    const repository = new JurisdictionRepository();

    const findJurisdictions = await repository.findJurisdictions({
      limit,
      page,
      nm_jurisdiction,
    });

    if (findJurisdictions.length === 0)
      return { error: 'Não há Esfera registrada.' };

    return {
      jurisdictions: findJurisdictions,
    };
  }
}
