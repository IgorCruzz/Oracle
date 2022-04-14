import { AgencyRepository } from '../../database/repositories';

export class DeleteAgencyService {
  async execute({ id }) {
    const repository = new AgencyRepository();

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum orgão registrado com este ID -> ${id}.`,
      };

    await repository.deleteAgency({
      id,
    });

    return {
      message: 'Orgão deletado com sucesso!',
    };
  }
}
