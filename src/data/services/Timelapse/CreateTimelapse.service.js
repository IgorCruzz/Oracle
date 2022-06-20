import {
  TimelapseRepository,
  ProjectPhaseRepository,
} from '../../database/repositories';

export class CreateTimelapseService {
  async execute(data) {
    const {
      ds_coordinates,
      tp_media,
      nu_latitude,
      nu_longetude,
      id_project_phase,
    } = data;

    const repository = new TimelapseRepository();
    const projectPhaseRepository = new ProjectPhaseRepository();

    const projectPhaseExists = await projectPhaseRepository.findProjectPhaseById(
      {
        id_project_phase,
        populate: false,
      }
    );

    if (!projectPhaseExists) {
      return {
        error: `Não há nenhuma fase do projeto registrado com este ID -> ${id_project_phase}.`,
      };
    }

    const timelapse = await repository.createTimelapse({
      ...data,
    });

    if (timelapse.error) {
      return { error: timelapse.error };
    }

    return {
      message: 'Vistoria adicionada com sucesso!',
      timelapse,
    };
  }
}
