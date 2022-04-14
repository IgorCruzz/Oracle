import { JurisdictionRepository } from '../../database/repositories';

export class CreateJurisdictionService {
  async execute({ name }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdiction({
      name,
    });

    if (verifyJurisdictionExists)
      return { error: 'Já existe uma esfera com este nome registrado.' };

    await repository.createJurisdiction({ name });

    return {
      message: 'Esfera registrada com sucesso!',
    };
  }
}
