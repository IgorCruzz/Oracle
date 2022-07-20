import { Router } from 'express';
import {
  FindContactHistoriesController,
  FindContactHistoryController,
  CreateContactHistoryController,
  DeleteContactHistoryController,
  UpdateContactHistoryController,
} from '../../data/controllers';
import {
  findContactHistoriesValidator,
  findContactHistoryValidator,
  deleteContactHistoryValidator,
  updateContactHistoryValidator,
  createContactHistoryValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/contactHistories',
  authenticator,
  createContactHistoryValidator,
  new CreateContactHistoryController().handle
);

routes.delete(
  '/contactHistories/:id_contact_history',
  authenticator,
  deleteContactHistoryValidator,
  new DeleteContactHistoryController().handle
);

routes.patch(
  '/contactHistories/:id_contact_history',
  authenticator,
  updateContactHistoryValidator,
  new UpdateContactHistoryController().handle
);

routes.get(
  '/contactHistories',
  authenticator,
  findContactHistoriesValidator,
  new FindContactHistoriesController().handle
);

routes.get(
  '/contactHistory/:id_contact_history',
  authenticator,
  findContactHistoryValidator,
  new FindContactHistoryController().handle
);

export default routes;
