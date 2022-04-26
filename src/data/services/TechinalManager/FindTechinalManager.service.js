import { TechnicalManagerRepository } from '../../database/repositories';

export class FindTechinalManagerService {
  async execute({ id_technical_manager }) {
    const repository = new TechnicalManagerRepository();

    const findTechnicalManager = await repository.findTechnicalManagerById({
      id_technical_manager,
      populate: true,
    });

    if (!findTechnicalManager)
      return {
        error: `Não há nenhum Técnico responsável registrado com este ID -> ${id_technical_manager}.`,
      };

    return {
      technicalManager: findTechnicalManager,
    };
  }
}
