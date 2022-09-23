import multer from 'multer';
import { Router } from 'express';
import { storage } from '../../config/multer_inspection_documents';
import {
  CreateInspectionDocumentController,
  DeleteInspectionDocumentController,
  FindInspectionDocumentController,
  FindInspectionDocumentsController,
  UpdateInspectionDocumentController,
  DownloadInspectionDocumentController,
} from '../../data/controllers';
import {
  findInspectionDocumentValidator,
  createInspectionDocumentValidator,
  deleteInspectionDocumentValidator,
  findInspectionDocumentsValidator,
  updateInspectionDocumentValidator,
  downloadInspectionDocumentValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const upload = multer({ storage });
const routes = Router();
routes.post(
  '/inspection_documents',
  authenticator,
  createInspectionDocumentValidator,
  new CreateInspectionDocumentController().handle
);

routes.delete(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteInspectionDocumentValidator,
  new DeleteInspectionDocumentController().handle
);

routes.patch(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  upload.single('file'),
  updateInspectionDocumentValidator,
  new UpdateInspectionDocumentController().handle
);

routes.get(
  '/inspection_documents',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findInspectionDocumentsValidator,
  new FindInspectionDocumentsController().handle
);

routes.get(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findInspectionDocumentValidator,
  new FindInspectionDocumentController().handle
);

routes.get(
  '/inspection_documents/download/:nm_file',
  //	authenticator,
  downloadInspectionDocumentValidator,
  new DownloadInspectionDocumentController().handle
);
export default routes;
