import {
  AgencyRepository,
  JurisdictionRepository,
} from '../../database/repositories';

export class UpdateAgencyService {
  async execute({ name, id, jurisdiction }) {
    const repository = new AgencyRepository();
    const jurisdictionRepository = new JurisdictionRepository();

    if (jurisdiction) {
      const { jurisdictionName, jurisdictionId } = jurisdiction;

      const verifyRelation = await repository.verifyRelation({
        jurisdictionId,
        id,
      });

      if (verifyRelation.length === 0) {
        return {
          error:
            'A esfera solicitada não existe ou não possui relação com o Orgão!',
        };
      }

      const verifyJurisdictionName = await jurisdictionRepository.findJurisdiction(
        {
          name: jurisdictionName,
        }
      );

      if (verifyJurisdictionName)
        return { error: 'Já existe uma esfera com este nome registrado.' };

      await jurisdictionRepository.updateJurisdiction({
        id: jurisdictionId,
        name: jurisdictionName,
      });
    }

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum orgão registrado com este ID -> ${id}.`,
      };

    const verifyAgencyName = await repository.findAgency({
      name,
    });

    if (verifyAgencyName)
      return { error: 'Já existe um orgão registrado com este nome.' };

    const agencyUpdated = await repository.updateAgency({
      id,
      name,
    });

    return {
      message: 'Orgão atualizado com sucesso!',
      agency: agencyUpdated,
    };
  }
}
