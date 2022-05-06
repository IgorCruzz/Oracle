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

    const response = await projectService.execute(data);

    if (response.error)
      return {
        error: response.error,
      };

    const { project } = response;

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

    const getProjectPhases = await projectPhaseRepository.findProjectPhases({
      id_project,
    });

    const result = getProjectPhases.map((a, i) => {
      return {
        id_project_phase: a.id_project_phase,
        nu_order: a.nu_order,
        nm_project_phase: a.nm_project_phase,
        dt_planned_start: a.dt_planned_start,
        dt_planned_end: a.dt_planned_end,
        vl_phase: a.vl_phase,
        dt_created_at: a.dt_created_at,
        dt_updated_at: a.dt_updated_at,
        id_project: projectPhases[i].id_project,
        id_project_phase_copy: projectPhases[i].id_project_phase,
      };
    });

    const getProducts = await Promise.all(
      await result.map(async res => {
        return await productRepository.getTest({
          id_project_phase: res.id_project_phase,
        });
      })
    );

    const productsReplaceValue = [];

    getProducts.map(a =>
      a.map(teste => {
        const copy = result.find(
          res => res.id_project_phase === teste.id_project_phase
        );

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
          id_project_phase: copy.id_project_phase_copy,
          id_suggested_role: teste.id_suggested_role,
        });
      })
    );

    const productsCreated = await productRepository.createManyProducts(
      productsReplaceValue
    );
    const getDocumentsReplace = [];

    getProducts.map(async a => {
      a.map(res => {
        getDocumentsReplace.push(res);
      });
    });

    const getDocuments = await Promise.all(
      getDocumentsReplace.map(async a => {
        return await documentRepository.findDocumentByIdProduct({
          id_product: a.id_product,
        });
      })
    );

    const documentsLoaded = [];

    getDocuments.map(a => {
      a.map(lol => {
        documentsLoaded.push({
          ...lol.dataValues,
          product: lol.dataValues.product.dataValues,
        });
      });
    });

    const documentsParsed = documentsLoaded.map(cap => {
      const koko = productsCreated.find(
        lost => lost.nm_product === cap.product.nm_product
      );

      return {
        ds_document: cap.ds_document,
        dt_upload: cap.dt_upload,
        nm_file: cap.nm_file,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
        id_product: koko.id_product,
      };
    });

    await documentRepository.createManyDocuments(documentsParsed);

    return {
      message: 'Projeto adicionado com sucesso!',
      project,
    };
  }
}
