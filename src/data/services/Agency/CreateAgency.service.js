import {
  AgencyRepository,
  JurisdictionRepository,
} from '../../database/repositories';

export class CreateAgencyService {
  async execute({ name, jurisdictionId }) {
    const repository = new AgencyRepository();
    const jurisdictionRepository = new JurisdictionRepository();

    const verifyJurisdictionExists = await jurisdictionRepository.findJurisdictionById(
      {
        id: jurisdictionId,
      }
    );

    if (!verifyJurisdictionExists)
      return { error: 'There is no jurisdiction with this ID.' };

    const verifyAgencyExists = await repository.findAgency({
      name,
    });

    if (verifyAgencyExists)
      return { error: 'A agency with this name already exists.' };

    await repository.createAgency({ name, jurisdictionId });

    return {
      message: 'Agency created succesfully!',
    };
  }
}
