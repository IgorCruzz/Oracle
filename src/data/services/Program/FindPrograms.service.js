import { ProgramRepository } from '../../database/repositories';

export class FindProgramsService {
  async execute({ page, limit, nm_program }) {
    const repository = new ProgramRepository();

    const findPrograms = await repository.findPrograms({
      limit,
      page,
      nm_program,
    });

    if (findPrograms.length === 0)
      return { error: 'Não há nenhum Programa registrado' };

    return {
      programs: findPrograms,
    };
  }
}
