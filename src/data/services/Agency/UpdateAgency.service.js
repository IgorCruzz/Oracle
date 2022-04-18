import { AgencyRepository } from '../../database/repositories';

export class UpdateAgencyService {
  async execute({ name, id }) {
    const repository = new AgencyRepository();

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
