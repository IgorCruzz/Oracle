import { JurisdictionRepository } from '../../database/repositories';

export class CreateJurisdictionService {
  async execute({ name }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdiction({
      name,
    });

    if (verifyJurisdictionExists)
      return { error: 'A jurisdiction with this name already exists.' };

    await repository.createJurisdiction({ name });

    return {
      message: 'Jurisdiction created succesfully!',
    };
  }
}
