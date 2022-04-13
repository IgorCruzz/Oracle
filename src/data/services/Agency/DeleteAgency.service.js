import { AgencyRepository } from '../../database/repositories';

export class DeleteAgencyService {
  async execute({ id }) {
    const repository = new AgencyRepository();

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return { error: 'There is no agency with this ID.' };

    await repository.deleteAgency({
      id,
    });

    return {
      message: 'Agency deleted successfully!',
    };
  }
}
