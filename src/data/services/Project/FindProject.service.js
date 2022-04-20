import { AgencyRepository } from '../../database/repositories';

export class FindProjectService {
  async execute({ id }) {
    const repository = new AgencyRepository();

    const findAgency = await repository.findAgencyById({
      id,
      populate: true,
    });

    if (!findAgency)
      return {
        error: `Não há nenhum orgão registrado com este ID -> ${id}.`,
      };

    return {
      agency: findAgency,
    };
  }
}
