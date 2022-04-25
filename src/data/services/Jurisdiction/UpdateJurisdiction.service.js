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

    const verifyJurisdictionName = await repository.findJurisdiction({
      name,
    });

    if (
      verifyJurisdictionName &&
      verifyJurisdictionName.id_jurisdiction !== Number(id)
    )
      return { error: 'Já existe uma esfera com este nome registrado.' };

    const jurisdictionUpdated = await repository.updateJurisdiction({
      id,
      name,
    });

    return {
      message: 'Esfera atualizada com sucesso!',
      jurisdiction: jurisdictionUpdated,
    };
  }
}
