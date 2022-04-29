import { JurisdictionRepository } from '../../database/repositories';

export class FindJurisdictionService {
  async execute({ id }) {
    const repository = new JurisdictionRepository();

    const findJurisdiction = await repository.findJurisdictionById({
      id,
    });

    if (!findJurisdiction)
      return {
        error: `Não existe uma Esfera registrada com este ID -> ${id}.`,
      };

    return {
      jurisdiction: findJurisdiction,
    };
  }
}
