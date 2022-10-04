"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _Categoryroutes = require('./Category/Category.routes'); var _Categoryroutes2 = _interopRequireDefault(_Categoryroutes);
var _Programroutes = require('./Program/Program.routes'); var _Programroutes2 = _interopRequireDefault(_Programroutes);
var _Regionroutes = require('./Region/Region.routes'); var _Regionroutes2 = _interopRequireDefault(_Regionroutes);
var _Cityroutes = require('./City/City.routes'); var _Cityroutes2 = _interopRequireDefault(_Cityroutes);
var _Jurisdictionroutes = require('./Jurisdiction/Jurisdiction.routes'); var _Jurisdictionroutes2 = _interopRequireDefault(_Jurisdictionroutes);
var _Agencyroutes = require('./Agency/Agency.routes'); var _Agencyroutes2 = _interopRequireDefault(_Agencyroutes);
var _Projectroutes = require('./Project/Project.routes'); var _Projectroutes2 = _interopRequireDefault(_Projectroutes);
var _Locationroutes = require('./Location/Location.routes'); var _Locationroutes2 = _interopRequireDefault(_Locationroutes);
var _PolygonArearoutes = require('./PolygonArea/PolygonArea.routes'); var _PolygonArearoutes2 = _interopRequireDefault(_PolygonArearoutes);
var _TechnicalManagerroutes = require('./TechnicalManager/TechnicalManager.routes'); var _TechnicalManagerroutes2 = _interopRequireDefault(_TechnicalManagerroutes);
var _ProjectPhaseroutes = require('./ProjectPhase/ProjectPhase.routes'); var _ProjectPhaseroutes2 = _interopRequireDefault(_ProjectPhaseroutes);
var _Roleroutes = require('./Role/Role.routes'); var _Roleroutes2 = _interopRequireDefault(_Roleroutes);
var _Productroutes = require('./Product/Product.routes'); var _Productroutes2 = _interopRequireDefault(_Productroutes);
var _Documentroutes = require('./Document/Document.routes'); var _Documentroutes2 = _interopRequireDefault(_Documentroutes);
var _Userroutes = require('./User/User.routes'); var _Userroutes2 = _interopRequireDefault(_Userroutes);
var _Loginroutes = require('./Login/Login.routes'); var _Loginroutes2 = _interopRequireDefault(_Loginroutes);
var _RecoverPasswordroutes = require('./RecoverPassword/RecoverPassword.routes'); var _RecoverPasswordroutes2 = _interopRequireDefault(_RecoverPasswordroutes);
var _Graderoutes = require('./Grade/Grade.routes'); var _Graderoutes2 = _interopRequireDefault(_Graderoutes);
var _Sectorroutes = require('./Sector/Sector.routes'); var _Sectorroutes2 = _interopRequireDefault(_Sectorroutes);
var _RoleGraderoutes = require('./RoleGrade/RoleGrade.routes'); var _RoleGraderoutes2 = _interopRequireDefault(_RoleGraderoutes);
var _Professionalroutes = require('./Professional/Professional.routes'); var _Professionalroutes2 = _interopRequireDefault(_Professionalroutes);
var _AllocationPeriodroutes = require('./AllocationPeriod/AllocationPeriod.routes'); var _AllocationPeriodroutes2 = _interopRequireDefault(_AllocationPeriodroutes);
var _Allocationroutes = require('./Allocation/Allocation.routes'); var _Allocationroutes2 = _interopRequireDefault(_Allocationroutes);
var _Ptiroutes = require('./Pti/Pti.routes'); var _Ptiroutes2 = _interopRequireDefault(_Ptiroutes);
var _Inspectionroutes = require('./Inspection/Inspection.routes'); var _Inspectionroutes2 = _interopRequireDefault(_Inspectionroutes);
var _InspectionDocumentroutes = require('./InspectionDocument/InspectionDocument.routes'); var _InspectionDocumentroutes2 = _interopRequireDefault(_InspectionDocumentroutes);
var _Timelapseroutes = require('./Timelapse/Timelapse.routes'); var _Timelapseroutes2 = _interopRequireDefault(_Timelapseroutes);
var _MediaTimelapseroutes = require('./MediaTimelapse/MediaTimelapse.routes'); var _MediaTimelapseroutes2 = _interopRequireDefault(_MediaTimelapseroutes);
var _Deliveryroutes = require('./Delivery/Delivery.routes'); var _Deliveryroutes2 = _interopRequireDefault(_Deliveryroutes);
var _Analysisroutes = require('./Analysis/Analysis.routes'); var _Analysisroutes2 = _interopRequireDefault(_Analysisroutes);
var _Reportroutes = require('./Report/Report.routes'); var _Reportroutes2 = _interopRequireDefault(_Reportroutes);
var _PowerBiroutes = require('./PowerBi/PowerBi.routes'); var _PowerBiroutes2 = _interopRequireDefault(_PowerBiroutes);
var _ProductHistoryroutes = require('./ProductHistory/ProductHistory.routes'); var _ProductHistoryroutes2 = _interopRequireDefault(_ProductHistoryroutes);
var _Contactroutes = require('./Contact/Contact.routes'); var _Contactroutes2 = _interopRequireDefault(_Contactroutes);
var _ContactHistoryroutes = require('./ContactHistory/ContactHistory.routes'); var _ContactHistoryroutes2 = _interopRequireDefault(_ContactHistoryroutes);
var _Maproutes = require('./Map/Map.routes'); var _Maproutes2 = _interopRequireDefault(_Maproutes);

const routes = [
  _Maproutes2.default,
  _ContactHistoryroutes2.default,
  _Contactroutes2.default,
  _ProductHistoryroutes2.default,
  _PowerBiroutes2.default,
  _Reportroutes2.default,
  _Analysisroutes2.default,
  _Deliveryroutes2.default,
  _Ptiroutes2.default,
  _Allocationroutes2.default,
  _AllocationPeriodroutes2.default,
  _Professionalroutes2.default,
  _RoleGraderoutes2.default,
  _Sectorroutes2.default,
  _Graderoutes2.default,
  _Categoryroutes2.default,
  _Programroutes2.default,
  _Regionroutes2.default,
  _Cityroutes2.default,
  _Jurisdictionroutes2.default,
  _Agencyroutes2.default,
  _Projectroutes2.default,
  _Locationroutes2.default,
  _PolygonArearoutes2.default,
  _TechnicalManagerroutes2.default,
  _ProjectPhaseroutes2.default,
  _Roleroutes2.default,
  _Productroutes2.default,
  _Documentroutes2.default,
  _Userroutes2.default,
  _Loginroutes2.default,
  _RecoverPasswordroutes2.default,
  _Inspectionroutes2.default,
  _InspectionDocumentroutes2.default,
  _Timelapseroutes2.default,
  _MediaTimelapseroutes2.default,
];

const router = _express.Router.call(void 0, );

router.get('/ping', (req, res) => res.status(200).json({ data: 'PONG' }));

 const exposeRoutes = routes.map(routerMap =>
  router.use('/v1/api/ger-obras', routerMap)
); exports.exposeRoutes = exposeRoutes;
