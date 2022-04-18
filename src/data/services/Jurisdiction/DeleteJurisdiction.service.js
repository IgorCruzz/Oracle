import { JurisdictionRepository } from '../../database/repositories';

export class DeleteJurisdictionService {
  async execute({ id }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma esfera registrada com este ID -> ${id}.`,
      };

    await repository.deleteJurisdiction({
      id,
    });

    return {
      message: 'Esfera excluída com sucesso!',
    };
  }
}
