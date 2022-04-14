import { JurisdictionRepository } from '../../database/repositories';

export class FindJurisdictionsService {
  async execute({ page, limit }) {
    const repository = new JurisdictionRepository();

    const findJurisdictions = await repository.findJurisdictions({
      limit,
      page,
    });

    if (findJurisdictions.length === 0)
      return { error: 'Não há esfera registrada.' };

    return {
      jurisdictions: findJurisdictions,
    };
  }
}
