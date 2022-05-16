import { SectorRepository } from '../../database/repositories';

export class FindSectoriesService {
  async execute({ page, limit, nm_sector }) {
    const repository = new SectorRepository();

    const findSectories = await repository.findSectories({
      limit,
      page,
      nm_sector,
    });

    if (findSectories.length === 0)
      return { error: 'Não há nenhum Setor registrado.' };

    return {
      sectories: findSectories,
    };
  }
}
