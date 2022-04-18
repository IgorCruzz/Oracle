import {
  JurisdictionRepository,
  AgencyRepository,
} from '../../database/repositories';

export class DeleteJurisdictionService {
  async execute({ id }) {
    const repository = new JurisdictionRepository();
    const agencyRepository = new AgencyRepository();

    const verifyJurisdictionExists = await repository.findJurisdictionById({
      id,
    });

    if (!verifyJurisdictionExists)
      return {
        error: `Não há nenhuma esfera registrada com este ID -> ${id}.`,
      };

    const verifyFk = await agencyRepository.verifyJurisdiction({
      jurisdictionId: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir a Esfera pois existem Órgãos associados.',
      };
    }

    await repository.deleteJurisdiction({
      id,
    });

    return {
      message: 'Esfera excluída com sucesso!',
    };
  }
}
