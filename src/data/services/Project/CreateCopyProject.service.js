import { CreateProjectService } from './CreateProject.service';
import { ProjectPhaseRepository } from '../../database/repositories/ProjectPhase/ProjectPhase.repository';
import { ProductRepository } from '../../database/repositories/Product/Product.repository';
import { DocumentRepository } from '../../database/repositories/Document/Document.repository';

export class CreateCopyProjectService {
  async execute(id_project, data) {
    const projectService = new CreateProjectService();
    const projectPhaseRepository = new ProjectPhaseRepository();
    const productRepository = new ProductRepository();
    const documentRepository = new DocumentRepository();

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const response = await projectService.execute(data);

    if (response.error)
      return {
        error: response.error,
      };

    const { project } = response;
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const findProjectsPhase = await projectPhaseRepository.findProjectPhases({
      id_project,
    });

    const projectPhaseCopy = findProjectsPhase.map(projectPhases => {
      return {
        id_project: project.id_project,
        nu_order: projectPhases.nu_order,
        nm_project_phase: projectPhases.nm_project_phase,
        dt_planned_start: null,
        dt_planned_end: null,
        vl_phase: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      };
    });

    const projectPhases = await projectPhaseRepository.createManyProjectPhases(
      projectPhaseCopy
    );
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getProjectPhases = await projectPhaseRepository.findProjectPhases({
      id_project,
    });

    const fixProjectPhases = getProjectPhases.map((teste, index) => ({
      id_project: projectPhases[index].id_project,
      nu_order: teste.nu_order,
      nm_project_phase: teste.nm_project_phase,
      dt_planned_start: teste.dt_planned_start,
      dt_planned_end: teste.dt_planned_end,
      vl_phase: teste.vl_phase,
    }));

    console.log(fixProjectPhases);

    const getProducts = await Promise.all(
      await getProjectPhases.map(async a => {
        return await productRepository.getTest({
          id_project_phase: a.id_project_phase,
        });
      })
    );

    const productsReplaceValue = [];

    getProducts.map(a =>
      a.map(teste => {
        productsReplaceValue.push({
          nu_order: teste.nu_order,
          nm_product: teste.nm_product,
          qt_minimum_hours: teste.qt_maximum_hours,
          qt_maximum_hours: teste.qt_maximum_hours,
          qt_probable_hours: teste.qt_probable_hours,
          tp_required_action: 0,
          ds_note_required_action: null,
          dt_created_at: new Date(Date.now()).toISOString(),
          dt_updated_at: new Date(Date.now()).toISOString(),
          id_project_phase: teste.id_project_phase,
          id_suggested_role: teste.id_suggested_role,
        });
      })
    );

    // await productRepository.createManyProducts(productsReplaceValue);
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const getProductReplace = [];

    // getProducts.map(a =>
    //   a.map(teste => {
    //     getProductReplace.push({
    //       id_product: teste.id_product,
    //     });
    //   })
    // );

    // const getDocuments = await Promise.all(
    //   await getProductReplace.map(async a => {
    //     return await documentRepository.findDocumentByIdProduct({
    //       id_product: a.id_product,
    //     });
    //   })
    // );

    // const getDocumentsReplace = [];

    // getDocuments.map(a =>
    //   a.map(teste => {
    //     getDocumentsReplace.push({
    //       ds_document: teste.ds_document,
    //       dt_upload: null,
    //       nm_file: null,
    //       dt_created_at: new Date(Date.now()).toISOString(),
    //       dt_updated_at: new Date(Date.now()).toISOString(),
    //       id_product: teste.id_product,
    //     });
    //   })
    // );

    // await documentRepository.createManyDocuments(getDocumentsReplace);

    return {
      message: 'Projeto adicionado com sucesso!',
      project: '',
    };
  }
}
