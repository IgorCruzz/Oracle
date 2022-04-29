import { JurisdictionRepository } from '../../database/repositories';

export class CreateJurisdictionService {
  async execute({ name }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdiction({
      name,
    });

    if (verifyJurisdictionExists)
      return { error: 'Já existe uma Esfera com este nome registrado.' };

    const jurisdiction = await repository.createJurisdiction({ name });

    return {
      message: 'Esfera registrada com sucesso!',
      jurisdiction,
    };
  }
}
