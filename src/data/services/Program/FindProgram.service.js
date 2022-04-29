import { ProgramRepository } from '../../database/repositories';

export class FindProgramService {
  async execute({ id }) {
    const repository = new ProgramRepository();

    const findProgram = await repository.findProgramById({
      id,
    });

    if (!findProgram)
      return {
        error: `Não há nenhum Programa registrado com este ID -> ${id}.`,
      };

    return {
      program: findProgram,
    };
  }
}
