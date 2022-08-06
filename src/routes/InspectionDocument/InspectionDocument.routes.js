import multer from 'multer';
import { Router } from 'express';
import { storage } from '../../config/multer_media_timelapse';
import {
  CreateInspectionDocumentController,
  DeleteInspectionDocumentController,
  FindInspectionDocumentController,
  FindInspectionDocumentsController,
  UpdateInspectionDocumentController,
} from '../../data/controllers';
import {
  findInspectionDocumentValidator,
  createInspectionDocumentValidator,
  deleteInspectionDocumentValidator,
  findInspectionDocumentsValidator,
  updateInspectionDocumentValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2, 3, 4];

const upload = multer({ storage });
const routes = Router();
routes.post(
  '/inspection_documents',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  createInspectionDocumentValidator,
  new CreateInspectionDocumentController().handle
);

routes.delete(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  deleteInspectionDocumentValidator,
  new DeleteInspectionDocumentController().handle
);

routes.patch(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  upload.single('file'),
  updateInspectionDocumentValidator,
  new UpdateInspectionDocumentController().handle
);

routes.get(
  '/inspection_documents',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findInspectionDocumentsValidator,
  new FindInspectionDocumentsController().handle
);

routes.get(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  // roleAuthenticator({
  //   profiles,
  // }),
  findInspectionDocumentValidator,
  new FindInspectionDocumentController().handle
);

export default routes;
