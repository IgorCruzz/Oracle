import { ProgramRepository } from '../../database/repositories';

export class UpdateProgramService {
  async execute({ name, id }) {
    const repository = new ProgramRepository();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return {
        error: `Não há nenhum programa registrado com este ID -> ${id}.`,
      };

    const verifyProgramName = await repository.findProgram({
      name,
    });

    if (verifyProgramName.id_program !== Number(id))
      return { error: 'Já existe um programa registrado com este nome.' };

    const programUpdated = await repository.updateProgram({
      id,
      name,
    });

    return {
      program: programUpdated,
      message: 'Programa atualizado com sucesso!',
    };
  }
}
