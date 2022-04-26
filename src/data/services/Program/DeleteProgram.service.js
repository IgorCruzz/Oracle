import {
  ProgramRepository,
  ProjectRepository,
} from '../../database/repositories';

export class DeleteProgramService {
  async execute({ id }) {
    const repository = new ProgramRepository();
    const projectRepository = new ProjectRepository();

    const verifyProgramExists = await repository.findProgramById({
      id,
    });

    if (!verifyProgramExists)
      return {
        error: `Não há nenhum programa registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationProgram({
      id_program: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Programa pois existem Projetos associados.',
      };
    }

    await repository.deleteProgram({
      id,
    });

    return {
      message: 'Programa excluído com sucesso!',
    };
  }
}
