import { AgencyRepository } from '../../database/repositories';

export class UpdateAgencyService {
  async execute({ name, id }) {
    const repository = new AgencyRepository();

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return { error: 'There is no city with this name.' };

    const agencyUpdated = await repository.updateAgency({
      id,
      name,
    });

    return {
      agency: agencyUpdated,
    };
  }
}
