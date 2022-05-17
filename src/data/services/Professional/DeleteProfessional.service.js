import { ProfessionalRepository } from '../../database/repositories';

export class DeleteProfessionalService {
  async execute({ id_professional }) {
    const repository = new ProfessionalRepository();

    const verifyProfessionalExists = await repository.findProfessionalById({
      id_professional,
    });

    if (!verifyProfessionalExists)
      return {
        error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
      };

    await repository.deleteProfessional({
      id_professional,
    });

    return {
      message: 'Colaborador excluído com sucesso!',
    };
  }
}
