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

    const agencyUpdated = await repository.updateAgency({
      id,
      name,
    });

    return {
      agency: agencyUpdated,
    };
  }
}
