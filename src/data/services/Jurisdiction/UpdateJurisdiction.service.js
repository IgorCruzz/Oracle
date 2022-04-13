import { JurisdictionRepository } from '../../database/repositories';

export class UpdateJurisdictionService {
  async execute({ name, id }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return { error: 'There is no jurisdiction with this name.' };

    const jurisdictionUpdated = await repository.updateJurisdiction({
      id,
      name,
    });

    return {
      jurisdiction: jurisdictionUpdated,
    };
  }
}
