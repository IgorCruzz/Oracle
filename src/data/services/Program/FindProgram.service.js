import { ProgramRepository } from '../../database/repositories';

export class FindProgramService {
  async execute({ page, limit }) {
    const repository = new ProgramRepository();

    const findPrograms = await repository.findPrograms({
      limit,
      page,
    });

    if (findPrograms.length === 0)
      return { error: 'There are no registered programs.' };

    return {
      programs: findPrograms,
    };
  }
}
