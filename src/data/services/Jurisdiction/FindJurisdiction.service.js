import { JurisdictionRepository } from '../../database/repositories';

export class FindJurisdictionsService {
  async execute({ page, limit }) {
    const repository = new JurisdictionRepository();

    const findJurisdictions = await repository.findJurisdictions({
      limit,
      page,
    });

    if (findJurisdictions.length === 0)
      return { error: 'There are no registered jurisdictions.' };

    return {
      jurisdictions: findJurisdictions,
    };
  }
}
