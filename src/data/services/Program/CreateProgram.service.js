import { ProgramRepository } from '../../database/repositories';

export class CreateProgramService {
  async execute({ name }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgram({
      name,
    });

    if (verifyProgramExists)
      return { error: 'A program with this name already exists.' };

    await repository.createProgram({ name });

    return {
      message: 'Program created succesfully!',
    };
  }
}
