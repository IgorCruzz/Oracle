import { JurisdictionRepository } from '../../database/repositories';

export class DeleteJurisdictionService {
  async execute({ id }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return { error: 'There is no jurisdiction with this name.' };

    await repository.deleteJurisdiction({
      id,
    });

    return {
      message: 'Jurisdiction deleted successfully!',
    };
  }
}
