import { ProfessionalRepository } from '../../database/repositories';

export class CreateProfessionalService {
  async execute(data) {
    const { nm_professional } = data;
    const repository = new ProfessionalRepository();

    const verifyProfessionalExists = await repository.findProfessional({
      nm_professional,
    });

    if (verifyProfessionalExists)
      return { error: 'Já existe um Colaborador registrado com este nome.' };

    const professional = await repository.createProfessional(data);

    return {
      message: 'Colaborador registrado com sucesso!',
      professional: professional.dataValues,
    };
  }
}
