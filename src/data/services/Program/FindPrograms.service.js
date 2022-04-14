import { ProgramRepository } from '../../database/repositories';

export class FindProgramsService {
  async execute({ page, limit }) {
    const repository = new ProgramRepository();

    const findPrograms = await repository.findPrograms({
      limit,
      page,
    });

    if (findPrograms.length === 0)
      return { error: 'Não há nenhum programa registrado' };

    return {
      programs: findPrograms,
    };
  }
}
