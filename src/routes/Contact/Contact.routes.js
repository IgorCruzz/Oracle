import { Router } from 'express';
import {
  FindContactController,
  CreateContactController,
  FindContactsController,
  DeleteContactController,
  UpdateContactController,
} from '../../data/controllers';
import {
  findContactValidator,
  findContactsValidator,
  deleteContactValidator,
  updateContactValidator,
  createContactValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { roleAuthenticator } from '../../data/authenticator/role.authenticator';

const profiles = [0, 1, 2];

const routes = Router();

routes.post(
  '/contacts',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  createContactValidator,
  new CreateContactController().handle
);

routes.delete(
  '/contacts/:id_contact',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  deleteContactValidator,
  new DeleteContactController().handle
);

routes.patch(
  '/contacts/:id_contact',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  updateContactValidator,
  new UpdateContactController().handle
);

routes.get(
  '/contacts',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findContactsValidator,
  new FindContactsController().handle
);

routes.get(
  '/contact/:id_contact',
  authenticator,
  roleAuthenticator({
    profiles,
  }),
  findContactValidator,
  new FindContactController().handle
);

export default routes;
