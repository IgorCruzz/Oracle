import { ProgramRepository } from '../../database/repositories';

export class DeleteProgramService {
  async execute({ id }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return {
        error: `Não há nenhum programa registrado com este ID -> ${id}.`,
      };

    await repository.deleteProgram({
      id,
    });

    return {
      message: 'Programa excluído com sucesso!',
    };
  }
}
