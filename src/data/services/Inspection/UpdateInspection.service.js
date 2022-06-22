import {
  InspectionRepository,
  ProjectPhaseRepository,
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class UpdateInspectionService {
  async execute(id_inspection, data) {
    const { dt_inspection, dt_new_end, id_project_phase } = data;

    let dtNewEnd;
    if (dt_new_end) {
      dtNewEnd = verifyDate({
        value: dt_new_end,
        msg: 'Término efetivo da fase inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtNewEnd.error) {
        return { error: dtNewEnd.error };
      }
    }
    let dtInspection;
    if (dt_inspection) {
      dtInspection = verifyDate({
        value: dt_inspection,
        msg: 'Data da vistoria inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtInspection.error) {
        return { error: dtInspection.error };
      }
    }

    const projectPhaseRepository = new ProjectPhaseRepository();
    const inspectionRepository = new InspectionRepository();

    const inspectionExists = await inspectionRepository.findInspectionById({
      id_inspection,
      populate: false,
    });

    if (!inspectionExists) {
      return {
        error: `Não há nenhuma vistoria registrada com este ID -> ${id_inspection}.`,
      };
    }

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

    const inspection = await inspectionRepository.updateInspection(id_inspection, data);

    if (inspection.error) {
      return { error: inspection.error };
    }

    return {
      message: 'Vistoria atualizada com sucesso!',
      inspection,
    };
  }
}
