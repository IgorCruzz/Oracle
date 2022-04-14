import { ProgramRepository } from '../../database/repositories';

export class CreateProgramService {
  async execute({ name }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgram({
      name,
    });

    if (verifyProgramExists)
      return { error: 'Já existe um programa registrado com este nome.' };

    await repository.createProgram({ name });

    return {
      message: 'Programa registrado com sucesso!',
    };
  }
}
