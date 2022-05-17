import { ProfessionalRepository } from '../../database/repositories';

export class FindProfessionalService {
  async execute({ id_professional }) {
    const repository = new ProfessionalRepository();

    const findProfessional = await repository.findProfessionalById({
      id_professional,
    });

    if (!findProfessional)
      return {
        error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
      };

    return {
      professional: findProfessional,
    };
  }
}
