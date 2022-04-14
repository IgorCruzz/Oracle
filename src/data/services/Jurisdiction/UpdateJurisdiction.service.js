import { JurisdictionRepository } from '../../database/repositories';

export class UpdateJurisdictionService {
  async execute({ name, id }) {
    const repository = new JurisdictionRepository();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma esfera registrada com este ID -> ${id}.`,
      };

    const jurisdictionUpdated = await repository.updateJurisdiction({
      id,
      name,
    });

    return {
      jurisdiction: jurisdictionUpdated,
    };
  }
}
