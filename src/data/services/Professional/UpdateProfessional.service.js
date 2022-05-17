import { ProfessionalRepository } from '../../database/repositories';

export class UpdateProfessionalService {
  async execute(id_professional, data) {
    const { nm_professional } = data;

    const repository = new ProfessionalRepository();

    const verifyProfessionalExists = await repository.findProfessionalById({
      id_professional,
    });

    if (!verifyProfessionalExists)
      return {
        error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
      };

    const verifyProfessionalName = await repository.findProfessional({
      nm_professional,
    });

    if (
      verifyProfessionalName &&
      verifyProfessionalName.id_professional !== Number(id_professional)
    )
      return { error: 'Já existe um Colaborador registrado com este nome.' };

    const professionalUpdated = await repository.updateProfessional(
      id_professional,
      data
    );

    return {
      message: 'Colaborador atualizado com sucesso!',
      professional: professionalUpdated,
    };
  }
}
