import { format } from 'date-fns';
import { sequelize } from '../../database';

export class PowerBiInspectionService {
  async execute() {
    const [results] = await sequelize.query(
      'SELECT nm_project, city.nm_city, category.nm_category, qt_m2, CASE WHEN cd_priority = 1 THEN "Baixa" WHEN cd_priority = 2 THEN "Média" WHEN cd_priority = 3 THEN "Alta" ELSE "" END AS cd_priority, CASE WHEN tp_project_phase = 10 THEN "Concepção" WHEN tp_project_phase = 20 THEN "Priorização" WHEN tp_project_phase = 30 THEN "Desenvolvimento"  WHEN tp_project_phase = 40 THEN "Licitação" WHEN tp_project_phase = 50 THEN "Execução" WHEN tp_project_phase = 60 THEN "Encerrado em Garantia" ELSE "" END AS tp_project_phase, tp_project_phase, nm_project_phase, dt_planned_start, dt_planned_end, vl_phase, dt_inspection, CASE WHEN tp_inspection = 1 THEN "Periódica" WHEN tp_inspection = 2 THEN "De entrega" ELSE "" END AS tp_inspection, professional.nm_professional, dt_new_end, vl_new_cost FROM gerobras.inspection LEFT JOIN gerobras.project_phase ON gerobras.project_phase.id_project_phase = gerobras.inspection.id_project_phase LEFT JOIN gerobras.project ON gerobras.project.id_project = gerobras.project_phase.id_project_phase LEFT JOIN gerobras.city ON gerobras.project.id_city = gerobras.city.id_city LEFT JOIN gerobras.category ON gerobras.category.id_category = gerobras.project.id_category LEFT JOIN gerobras.professional ON gerobras.professional.id_professional = gerobras.inspection.id_professional'
    );

    const inspections = results.map(
      ({
        nm_project,
        nm_city,
        nm_category,
        qt_m2,
        cd_priority,
        tp_project_phase,
        nm_project_phase,
        dt_planned_start,
        dt_planned_end,
        vl_phase,
        dt_inspection,
        tp_inspection,
        nm_professional,
        dt_new_end,
      }) => ({
        nm_project: nm_project || '',
        nm_city: nm_city || '',
        nm_category: nm_category || '',
        qt_m2: qt_m2 || '',
        cd_priority: cd_priority || '',
        tp_project_phase: tp_project_phase || '',
        nm_project_phase: nm_project_phase || '',
        dt_planned_start: dt_planned_start || '',
        dt_planned_end: dt_planned_end || '',
        vl_phase: vl_phase || '',
        tp_inspection: tp_inspection || '',
        nm_professional: nm_professional || '',
        dt_inspection: format(new Date(dt_inspection), 'dd/MM/yyyy'),
        dt_new_end: format(new Date(dt_new_end), 'dd/MM/yyyy'),
      })
    );

    return {
      inspections,
    };
  }
}
