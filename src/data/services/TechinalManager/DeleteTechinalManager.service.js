import { TechnicalManagerRepository } from '../../database/repositories';

export class DeleteTechinalManagerService {
  async execute({ id_technical_manager }) {
    const repository = new TechnicalManagerRepository();

    const verifyTechnicalManagerExists = await repository.findTechnicalManagerById(
      {
        id_technical_manager,
      }
    );

    if (!verifyTechnicalManagerExists)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    await repository.deleteTechnicalManagerArea({
      id_technical_manager,
    });

    return {
      message: 'Técnico responsável excluído com sucesso!',
    };
  }
}
