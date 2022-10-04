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
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/contactHistories',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createContactHistoryValidator,
  new CreateContactHistoryController().handle
);

routes.delete(
  '/contactHistories/:id_contact_history',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteContactHistoryValidator,
  new DeleteContactHistoryController().handle
);

routes.patch(
  '/contactHistories/:id_contact_history',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateContactHistoryValidator,
  new UpdateContactHistoryController().handle
);

routes.get(
  '/contactHistories',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findContactHistoriesValidator,
  new FindContactHistoriesController().handle
);

routes.get(
  '/contactHistory/:id_contact_history',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findContactHistoryValidator,
  new FindContactHistoryController().handle
);

export default routes;
