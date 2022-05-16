import { Router } from 'express';

import Category from './Category/Category.routes';
import Program from './Program/Program.routes';
import Region from './Region/Region.routes';
import City from './City/City.routes';
import Jurisdiction from './Jurisdiction/Jurisdiction.routes';
import Agency from './Agency/Agency.routes';
import Project from './Project/Project.routes';
import Location from './Location/Location.routes';
import PolygonArea from './PolygonArea/PolygonArea.routes';
import TechnicalManager from './TechnicalManager/TechnicalManager.routes';
import ProjectPhase from './ProjectPhase/ProjectPhase.routes';
import Role from './Role/Role.routes';
import Product from './Product/Product.routes';
import Document from './Document/Document.routes';
import User from './User/User.routes';
import Login from './Login/Login.routes';
import RecoverPassword from './RecoverPassword/RecoverPassword.routes';
import Grade from './Grade/Grade.routes';
import Sector from './Sector/Sector.routes';
import RoleGrade from './RoleGrade/RoleGrade.routes';

const routes = [
  RoleGrade,
  Sector,
  Grade,
  Category,
  Program,
  Region,
  City,
  Jurisdiction,
  Agency,
  Project,
  Location,
  PolygonArea,
  TechnicalManager,
  ProjectPhase,
  Role,
  Product,
  Document,
  User,
  Login,
  RecoverPassword,
];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap =>
  router.use('/v1/api/ger-obras', routerMap)
);
