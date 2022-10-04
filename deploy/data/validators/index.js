"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); }// CATEGORY
var _createCategoryvalidator = require('./Category/createCategory.validator'); _createStarExport(_createCategoryvalidator);
var _deleteCategoryvalidator = require('./Category/deleteCategory.validator'); _createStarExport(_deleteCategoryvalidator);
var _updateCategoryvalidator = require('./Category/updateCategory.validator'); _createStarExport(_updateCategoryvalidator);
var _findCategoriesvalidator = require('./Category/findCategories.validator'); _createStarExport(_findCategoriesvalidator);
var _findCategoryvalidator = require('./Category/findCategory.validator'); _createStarExport(_findCategoryvalidator);

// PROGRAM
var _createProgramvalidator = require('./Program/createProgram.validator'); _createStarExport(_createProgramvalidator);
var _deleteProgramvalidator = require('./Program/deleteProgram.validator'); _createStarExport(_deleteProgramvalidator);
var _updateProgramvalidator = require('./Program/updateProgram.validator'); _createStarExport(_updateProgramvalidator);
var _findProgramsvalidator = require('./Program/findPrograms.validator'); _createStarExport(_findProgramsvalidator);
var _findProgramvalidator = require('./Program/findProgram.validator'); _createStarExport(_findProgramvalidator);

// REGION
var _createRegionvalidator = require('./Region/createRegion.validator'); _createStarExport(_createRegionvalidator);
var _deleteRegionvalidator = require('./Region/deleteRegion.validator'); _createStarExport(_deleteRegionvalidator);
var _findRegionvalidator = require('./Region/findRegion.validator'); _createStarExport(_findRegionvalidator);
var _updateRegionvalidator = require('./Region/updateRegion.validator'); _createStarExport(_updateRegionvalidator);
var _findRegionsvalidator = require('./Region/findRegions.validator'); _createStarExport(_findRegionsvalidator);

// CITY
var _createCityvalidator = require('./City/createCity.validator'); _createStarExport(_createCityvalidator);
var _deleteCityvalidator = require('./City/deleteCity.validator'); _createStarExport(_deleteCityvalidator);
var _findCityvalidator = require('./City/findCity.validator'); _createStarExport(_findCityvalidator);
var _updateCityvalidator = require('./City/updateCity.validator'); _createStarExport(_updateCityvalidator);
var _findCitiesvalidator = require('./City/findCities.validator'); _createStarExport(_findCitiesvalidator);

// JURISDICTION
var _createJurisdictionvalidator = require('./Jurisdiction/createJurisdiction.validator'); _createStarExport(_createJurisdictionvalidator);
var _deleteJurisdictionvalidator = require('./Jurisdiction/deleteJurisdiction.validator'); _createStarExport(_deleteJurisdictionvalidator);
var _findJurisdictionvalidator = require('./Jurisdiction/findJurisdiction.validator'); _createStarExport(_findJurisdictionvalidator);
var _updateJurisdictionvalidator = require('./Jurisdiction/updateJurisdiction.validator'); _createStarExport(_updateJurisdictionvalidator);
var _findJurisdictionsvalidator = require('./Jurisdiction/findJurisdictions.validator'); _createStarExport(_findJurisdictionsvalidator);

// AGENCY
var _createAgencyvalidator = require('./Agency/createAgency.validator'); _createStarExport(_createAgencyvalidator);
var _deleteAgencyvalidator = require('./Agency/deleteAgency.validator'); _createStarExport(_deleteAgencyvalidator);
var _findAgenciesvalidator = require('./Agency/findAgencies.validator'); _createStarExport(_findAgenciesvalidator);
var _updateAgencyvalidator = require('./Agency/updateAgency.validator'); _createStarExport(_updateAgencyvalidator);
var _findAgencyvalidator = require('./Agency/findAgency.validator'); _createStarExport(_findAgencyvalidator);

// PROJECT
var _createProjectvalidator = require('./Project/createProject.validator'); _createStarExport(_createProjectvalidator);
var _deleteProjectvalidator = require('./Project/deleteProject.validator'); _createStarExport(_deleteProjectvalidator);
var _findProjectvalidator = require('./Project/findProject.validator'); _createStarExport(_findProjectvalidator);
var _findProjectsvalidator = require('./Project/findProjects.validator'); _createStarExport(_findProjectsvalidator);
var _updateProjectvalidator = require('./Project/updateProject.validator'); _createStarExport(_updateProjectvalidator);

// LOCATION
var _createLocationvalidator = require('./Location/createLocation.validator'); _createStarExport(_createLocationvalidator);
var _deleteLocationvalidator = require('./Location/deleteLocation.validator'); _createStarExport(_deleteLocationvalidator);
var _findLocationvalidator = require('./Location/findLocation.validator'); _createStarExport(_findLocationvalidator);
var _findLocationsvalidator = require('./Location/findLocations.validator'); _createStarExport(_findLocationsvalidator);
var _updateLocationvalidator = require('./Location/updateLocation.validator'); _createStarExport(_updateLocationvalidator);

// POLYGON AREA
var _createPolygonAreavalidator = require('./PolygonArea/createPolygonArea.validator'); _createStarExport(_createPolygonAreavalidator);
var _deletePolygonAreavalidator = require('./PolygonArea/deletePolygonArea.validator'); _createStarExport(_deletePolygonAreavalidator);
var _findPolygonAreavalidator = require('./PolygonArea/findPolygonArea.validator'); _createStarExport(_findPolygonAreavalidator);
var _findPolygonAreasvalidator = require('./PolygonArea/findPolygonAreas.validator'); _createStarExport(_findPolygonAreasvalidator);
var _updatePolygonAreavalidator = require('./PolygonArea/updatePolygonArea.validator'); _createStarExport(_updatePolygonAreavalidator);

// TECHNICAL MANAGER
var _createTechnicalManagervalidator = require('./TechnicalManager/createTechnicalManager.validator'); _createStarExport(_createTechnicalManagervalidator);
var _deleteTechnicalManagervalidator = require('./TechnicalManager/deleteTechnicalManager.validator'); _createStarExport(_deleteTechnicalManagervalidator);
var _findTechnicalManagervalidator = require('./TechnicalManager/findTechnicalManager.validator'); _createStarExport(_findTechnicalManagervalidator);
var _findTechnicalManagersvalidator = require('./TechnicalManager/findTechnicalManagers.validator'); _createStarExport(_findTechnicalManagersvalidator);
var _updateTechnicalManagervalidator = require('./TechnicalManager/updateTechnicalManager.validator'); _createStarExport(_updateTechnicalManagervalidator);

// PROJECT PHASE
var _createProjectPhasevalidator = require('./ProjectPhase/createProjectPhase.validator'); _createStarExport(_createProjectPhasevalidator);
var _deleteProjectPhasevalidator = require('./ProjectPhase/deleteProjectPhase.validator'); _createStarExport(_deleteProjectPhasevalidator);
var _findProjectPhasevalidator = require('./ProjectPhase/findProjectPhase.validator'); _createStarExport(_findProjectPhasevalidator);
var _findProjectPhasesvalidator = require('./ProjectPhase/findProjectPhases.validator'); _createStarExport(_findProjectPhasesvalidator);
var _updateProjectPhasevalidator = require('./ProjectPhase/updateProjectPhase.validator'); _createStarExport(_updateProjectPhasevalidator);

// ROLE
var _createRolevalidator = require('./Role/createRole.validator'); _createStarExport(_createRolevalidator);
var _deleteRolevalidator = require('./Role/deleteRole.validator'); _createStarExport(_deleteRolevalidator);
var _findRolevalidator = require('./Role/findRole.validator'); _createStarExport(_findRolevalidator);
var _updateRolevalidator = require('./Role/updateRole.validator'); _createStarExport(_updateRolevalidator);

// PRODUCT
var _createProductvalidator = require('./Product/createProduct.validator'); _createStarExport(_createProductvalidator);
var _deleteProductvalidator = require('./Product/deleteProduct.validator'); _createStarExport(_deleteProductvalidator);
var _findProductvalidator = require('./Product/findProduct.validator'); _createStarExport(_findProductvalidator);
var _findProductsvalidator = require('./Product/findProducts.validator'); _createStarExport(_findProductsvalidator);
var _updateProductvalidator = require('./Product/updateProduct.validator'); _createStarExport(_updateProductvalidator);

// DOCUMENT
var _createDocumentvalidator = require('./Document/createDocument.validator'); _createStarExport(_createDocumentvalidator);
var _deleteDocumentvalidator = require('./Document/deleteDocument.validator'); _createStarExport(_deleteDocumentvalidator);
var _findDocumentvalidator = require('./Document/findDocument.validator'); _createStarExport(_findDocumentvalidator);
var _findDocumentsvalidator = require('./Document/findDocuments.validator'); _createStarExport(_findDocumentsvalidator);
var _updateDocumentvalidator = require('./Document/updateDocument.validator'); _createStarExport(_updateDocumentvalidator);
var _uploadDocumentvalidator = require('./Document/uploadDocument.validator'); _createStarExport(_uploadDocumentvalidator);
var _removeUploadDocumentvalidator = require('./Document/removeUploadDocument.validator'); _createStarExport(_removeUploadDocumentvalidator);
// USER
var _createUservalidator = require('./User/createUser.validator'); _createStarExport(_createUservalidator);
var _deleteUservalidator = require('./User/deleteUser.validator'); _createStarExport(_deleteUservalidator);
var _findUservalidator = require('./User/findUser.validator'); _createStarExport(_findUservalidator);
var _findUsersvalidator = require('./User/findUsers.validator'); _createStarExport(_findUsersvalidator);
var _updateUservalidator = require('./User/updateUser.validator'); _createStarExport(_updateUservalidator);

// LOGIN
var _Loginvalidator = require('./Login/Login.validator'); _createStarExport(_Loginvalidator);

// RECOVERY PASSWORD
var _RecoveryPasswordvalidator = require('./RecoveryPassword/RecoveryPassword.validator'); _createStarExport(_RecoveryPasswordvalidator);

// GRADE
var _createGradevalidator = require('./Grade/createGrade.validator'); _createStarExport(_createGradevalidator);
var _deleteGradevalidator = require('./Grade/deleteGrade.validator'); _createStarExport(_deleteGradevalidator);
var _findGradevalidator = require('./Grade/findGrade.validator'); _createStarExport(_findGradevalidator);
var _findGradiesvalidator = require('./Grade/findGradies.validator'); _createStarExport(_findGradiesvalidator);
var _updateGradevalidator = require('./Grade/updateGrade.validator'); _createStarExport(_updateGradevalidator);

// SECTOR
var _createSectorvalidator = require('./Sector/createSector.validator'); _createStarExport(_createSectorvalidator);
var _deleteSectorvalidator = require('./Sector/deleteSector.validator'); _createStarExport(_deleteSectorvalidator);
var _findSectorvalidator = require('./Sector/findSector.validator'); _createStarExport(_findSectorvalidator);
var _findSectoriesvalidator = require('./Sector/findSectories.validator'); _createStarExport(_findSectoriesvalidator);
var _updateSectorvalidator = require('./Sector/updateSector.validator'); _createStarExport(_updateSectorvalidator);

// ROLE GRADE
var _createRoleGradevalidator = require('./RoleGrade/createRoleGrade.validator'); _createStarExport(_createRoleGradevalidator);
var _deleteRoleGradevalidator = require('./RoleGrade/deleteRoleGrade.validator'); _createStarExport(_deleteRoleGradevalidator);
var _findRoleGradevalidator = require('./RoleGrade/findRoleGrade.validator'); _createStarExport(_findRoleGradevalidator);
var _findRoleGradiesvalidator = require('./RoleGrade/findRoleGradies.validator'); _createStarExport(_findRoleGradiesvalidator);
var _updateRoleGradevalidator = require('./RoleGrade/updateRoleGrade.validator'); _createStarExport(_updateRoleGradevalidator);

// PROFESSIONAL
var _createProfessionalvalidator = require('./Professional/createProfessional.validator'); _createStarExport(_createProfessionalvalidator);
var _deleteProfessionalvalidator = require('./Professional/deleteProfessional.validator'); _createStarExport(_deleteProfessionalvalidator);
var _findProfessionalvalidator = require('./Professional/findProfessional.validator'); _createStarExport(_findProfessionalvalidator);
var _findProfessionalsvalidator = require('./Professional/findProfessionals.validator'); _createStarExport(_findProfessionalsvalidator);
var _updateProfessionalvalidator = require('./Professional/updateProfessional.validator'); _createStarExport(_updateProfessionalvalidator);

// ALLOCATION PERIOD
var _createAllocationPeriodvalidator = require('./AllocationPeriod/createAllocationPeriod.validator'); _createStarExport(_createAllocationPeriodvalidator);
var _deleteAllocationPeriodvalidator = require('./AllocationPeriod/deleteAllocationPeriod.validator'); _createStarExport(_deleteAllocationPeriodvalidator);
var _findAllocationPeriodvalidator = require('./AllocationPeriod/findAllocationPeriod.validator'); _createStarExport(_findAllocationPeriodvalidator);
var _findAllocationPeriodsvalidator = require('./AllocationPeriod/findAllocationPeriods.validator'); _createStarExport(_findAllocationPeriodsvalidator);
var _updateAllocationPeriodvalidator = require('./AllocationPeriod/updateAllocationPeriod.validator'); _createStarExport(_updateAllocationPeriodvalidator);

// ALLOCATION
var _createAllocationvalidator = require('./Allocation/createAllocation.validator'); _createStarExport(_createAllocationvalidator);
var _deleteAllocationvalidator = require('./Allocation/deleteAllocation.validator'); _createStarExport(_deleteAllocationvalidator);
var _findAllocationvalidator = require('./Allocation/findAllocation.validator'); _createStarExport(_findAllocationvalidator);
var _findAllocationsvalidator = require('./Allocation/findAllocations.validator'); _createStarExport(_findAllocationsvalidator);
var _updateAllocationvalidator = require('./Allocation/updateAllocation.validator'); _createStarExport(_updateAllocationvalidator);
var _FindProfessionalsFromAllocationvalidator = require('./Allocation/FindProfessionalsFromAllocation.validator'); _createStarExport(_FindProfessionalsFromAllocationvalidator);

// INSPECTION
var _createInspectionvalidator = require('./Inspection/createInspection.validator'); _createStarExport(_createInspectionvalidator);
var _deleteInspectionvalidator = require('./Inspection/deleteInspection.validator'); _createStarExport(_deleteInspectionvalidator);
var _findInspectionvalidator = require('./Inspection/findInspection.validator'); _createStarExport(_findInspectionvalidator);
var _findInspectionsvalidator = require('./Inspection/findInspections.validator'); _createStarExport(_findInspectionsvalidator);
var _updateInspectionvalidator = require('./Inspection/updateInspection.validator'); _createStarExport(_updateInspectionvalidator);

// INSPECTION DOCUMENT
var _createInspectionDocumentvalidator = require('./InspectionDocument/createInspectionDocument.validator'); _createStarExport(_createInspectionDocumentvalidator);
var _deleteInspectionDocumentvalidator = require('./InspectionDocument/deleteInspectionDocument.validator'); _createStarExport(_deleteInspectionDocumentvalidator);
var _findInspectionDocumentvalidator = require('./InspectionDocument/findInspectionDocument.validator'); _createStarExport(_findInspectionDocumentvalidator);
var _findInspectionDocumentsvalidator = require('./InspectionDocument/findInspectionDocuments.validator'); _createStarExport(_findInspectionDocumentsvalidator);
var _updateInspectionDocumentvalidator = require('./InspectionDocument/updateInspectionDocument.validator'); _createStarExport(_updateInspectionDocumentvalidator);
var _downloadInspectionDocumentvalidator = require('./InspectionDocument/downloadInspectionDocument.validator'); _createStarExport(_downloadInspectionDocumentvalidator);

// TIMELAPSE
var _createTimelapsevalidator = require('./Timelapse/createTimelapse.validator'); _createStarExport(_createTimelapsevalidator);
var _deleteTimelapsevalidator = require('./Timelapse/deleteTimelapse.validator'); _createStarExport(_deleteTimelapsevalidator);
var _findTimelapsevalidator = require('./Timelapse/findTimelapse.validator'); _createStarExport(_findTimelapsevalidator);
var _findTimelapsesvalidator = require('./Timelapse/findTimelapses.validator'); _createStarExport(_findTimelapsesvalidator);
var _updateTimelapsevalidator = require('./Timelapse/updateTimelapse.validator'); _createStarExport(_updateTimelapsevalidator);

// MEDIA TIMELAPSE
var _createMediaTimelapsevalidator = require('./MediaTimelapse/createMediaTimelapse.validator'); _createStarExport(_createMediaTimelapsevalidator);
var _deleteMediaTimelapsevalidator = require('./MediaTimelapse/deleteMediaTimelapse.validator'); _createStarExport(_deleteMediaTimelapsevalidator);
var _findMediaTimelapsevalidator = require('./MediaTimelapse/findMediaTimelapse.validator'); _createStarExport(_findMediaTimelapsevalidator);
var _findMediaTimelapsesvalidator = require('./MediaTimelapse/findMediaTimelapses.validator'); _createStarExport(_findMediaTimelapsesvalidator);
var _updateMediaTimelapsevalidator = require('./MediaTimelapse/updateMediaTimelapse.validator'); _createStarExport(_updateMediaTimelapsevalidator);
var _downloadMediaTimelapsevalidator = require('./MediaTimelapse/downloadMediaTimelapse.validator'); _createStarExport(_downloadMediaTimelapsevalidator);

// PTI
var _FindPeriodPtivalidator = require('./Ptis/FindPeriodPti.validator'); _createStarExport(_FindPeriodPtivalidator);
var _FindProductHistoryPtivalidator = require('./Ptis/FindProductHistoryPti.validator'); _createStarExport(_FindProductHistoryPtivalidator);
var _FindProfessionalPtivalidator = require('./Ptis/FindProfessionalPti.validator'); _createStarExport(_FindProfessionalPtivalidator);

// ANALYSIS
var _acceptvalidator = require('./Analysis/accept.validator'); _createStarExport(_acceptvalidator);
var _undoAcceptvalidator = require('./Analysis/undoAccept.validator'); _createStarExport(_undoAcceptvalidator);
var _correctionvalidator = require('./Analysis/correction.validator'); _createStarExport(_correctionvalidator);
var _undoCorrectionvalidator = require('./Analysis/undoCorrection.validator'); _createStarExport(_undoCorrectionvalidator);

// CONTACT
var _createContactvalidator = require('./Contact/createContact.validator'); _createStarExport(_createContactvalidator);
var _deleteContactvalidator = require('./Contact/deleteContact.validator'); _createStarExport(_deleteContactvalidator);
var _findContactvalidator = require('./Contact/findContact.validator'); _createStarExport(_findContactvalidator);
var _findContactsvalidator = require('./Contact/findContacts.validator'); _createStarExport(_findContactsvalidator);
var _updateContactvalidator = require('./Contact/updateContact.validator'); _createStarExport(_updateContactvalidator);

// CONTACT HISTORY
var _createContactHistoryvalidator = require('./ContactHistory/createContactHistory.validator'); _createStarExport(_createContactHistoryvalidator);
var _deleteContactHistoryvalidator = require('./ContactHistory/deleteContactHistory.validator'); _createStarExport(_deleteContactHistoryvalidator);
var _findContactHistoriesvalidator = require('./ContactHistory/findContactHistories.validator'); _createStarExport(_findContactHistoriesvalidator);
var _findContactHistoryvalidator = require('./ContactHistory/findContactHistory.validator'); _createStarExport(_findContactHistoryvalidator);
var _updateContactHistoryvalidator = require('./ContactHistory/updateContactHistory.validator'); _createStarExport(_updateContactHistoryvalidator);
