import { ProgramRepository } from '../../database/repositories';

export class FindProgramsService {
  async execute({ page, limit, search }) {
    const repository = new ProgramRepository();

    const findPrograms = await repository.findPrograms({
      limit,
      page,
      search,
    });

    if (findPrograms.length === 0)
      return { error: 'Não há nenhum Programa registrado' };

    return {
      programs: findPrograms,
    };
  }
}
