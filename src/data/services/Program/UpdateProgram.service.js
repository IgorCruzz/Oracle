import { ProgramRepository } from '../../database/repositories';

export class UpdateProgramService {
  async execute({ name, id }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return { error: 'There is no program with this name.' };

    const programUpdated = await repository.updateProgram({
      id,
      name,
    });

    return {
      program: programUpdated,
    };
  }
}
