import {
  AgencyRepository,
  JurisdictionRepository,
} from '../../database/repositories';

export class UpdateAgencyService {
  async execute({ name, id, jurisdictionId }) {
    const repository = new AgencyRepository();
    const jurisdictionRepository = new JurisdictionRepository();

    if (name && !jurisdictionId) {
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

      if (verifyAgencyName.id_agency !== Number(id))
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

    if (jurisdictionId && !name) {
      const verifyAgencyExists = await repository.findAgencyById({
        id,
      });

      if (!verifyAgencyExists)
        return {
          error: `Não há nenhum orgão registrado com este ID -> ${id}.`,
        };

      const verifyJurisdictionExists = await jurisdictionRepository.findJurisdictionById(
        {
          id: jurisdictionId,
        }
      );

      if (!verifyJurisdictionExists)
        return {
          error: `Não existe uma esfera com este ID -> ${jurisdictionId}`,
        };

      const agencyUpdated = await repository.updateAgency({
        id,
        jurisdictionId,
      });

      return {
        message: 'Orgão atualizado com sucesso!',
        agency: agencyUpdated,
      };
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

    if (verifyAgencyName.id_agency !== Number(id))
      return { error: 'Já existe um orgão registrado com este nome.' };

    const verifyJurisdictionExists = await jurisdictionRepository.findJurisdictionById(
      {
        id: jurisdictionId,
      }
    );

    if (!verifyJurisdictionExists)
      return {
        error: `Não existe uma esfera com este ID -> ${jurisdictionId}`,
      };

    const agencyUpdated = await repository.updateAgency({
      id,
      name,
      jurisdictionId,
    });

    return {
      message: 'Orgão atualizado com sucesso!',
      agency: agencyUpdated,
    };
  }
}
