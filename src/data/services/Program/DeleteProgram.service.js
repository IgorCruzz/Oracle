import { ProgramRepository } from '../../database/repositories';

export class DeleteProgramService {
  async execute({ id }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return { error: 'There is no program with this name.' };

    await repository.deleteProgram({
      id,
    });

    return {
      message: 'Program deleted successfully!',
    };
  }
}
