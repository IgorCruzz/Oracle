import { ProgramRepository } from '../../database/repositories';

export class CreateProgramService {
  async execute({ name }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgram({
      name,
    });

    if (verifyProgramExists)
      return { error: 'Já existe um Programa registrado com este nome.' };

    const program = await repository.createProgram({ name });

    return {
      message: 'Programa registrado com sucesso!',
      program,
    };
  }
}
