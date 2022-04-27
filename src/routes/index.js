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

const routes = [
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
];

const router = Router();

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

export const exposeRoutes = routes.map(routerMap =>
  router.use('/v1/api/ger-obras', routerMap)
);
