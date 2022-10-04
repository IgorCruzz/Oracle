"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _createStarExport(obj) { Object.keys(obj) .filter((key) => key !== "default" && key !== "__esModule") .forEach((key) => { if (exports.hasOwnProperty(key)) { return; } Object.defineProperty(exports, key, {enumerable: true, configurable: true, get: () => obj[key]}); }); }// CATEGORY
var _CreateCategoryservice = require('./Category/CreateCategory.service'); _createStarExport(_CreateCategoryservice);
var _DeleteCategoryservice = require('./Category/DeleteCategory.service'); _createStarExport(_DeleteCategoryservice);
var _UpdateCategoryservice = require('./Category/UpdateCategory.service'); _createStarExport(_UpdateCategoryservice);
var _FindCategoriesservice = require('./Category/FindCategories.service'); _createStarExport(_FindCategoriesservice);
var _FindCategoryservice = require('./Category/FindCategory.service'); _createStarExport(_FindCategoryservice);

// PROGRAM
var _CreateProgramservice = require('./Program/CreateProgram.service'); _createStarExport(_CreateProgramservice);
var _DeleteProgramservice = require('./Program/DeleteProgram.service'); _createStarExport(_DeleteProgramservice);
var _FindProgramsservice = require('./Program/FindPrograms.service'); _createStarExport(_FindProgramsservice);
var _UpdateProgramservice = require('./Program/UpdateProgram.service'); _createStarExport(_UpdateProgramservice);
var _FindProgramservice = require('./Program/FindProgram.service'); _createStarExport(_FindProgramservice);

// REGION
var _CreateRegionservice = require('./Region/CreateRegion.service'); _createStarExport(_CreateRegionservice);
var _DeleteRegionservice = require('./Region/DeleteRegion.service'); _createStarExport(_DeleteRegionservice);
var _FindRegionsservice = require('./Region/FindRegions.service'); _createStarExport(_FindRegionsservice);
var _UpdateRegionservice = require('./Region/UpdateRegion.service'); _createStarExport(_UpdateRegionservice);
var _FindRegionservice = require('./Region/FindRegion.service'); _createStarExport(_FindRegionservice);

// CITY
var _CreateCityservice = require('./City/CreateCity.service'); _createStarExport(_CreateCityservice);
var _DeleteCityservice = require('./City/DeleteCity.service'); _createStarExport(_DeleteCityservice);
var _FindCitiesservice = require('./City/FindCities.service'); _createStarExport(_FindCitiesservice);
var _UpdateCityservice = require('./City/UpdateCity.service'); _createStarExport(_UpdateCityservice);
var _FindCityservice = require('./City/FindCity.service'); _createStarExport(_FindCityservice);

// JURISDICTION
var _CreateJurisdictionservice = require('./Jurisdiction/CreateJurisdiction.service'); _createStarExport(_CreateJurisdictionservice);
var _DeleteJurisdictionservice = require('./Jurisdiction/DeleteJurisdiction.service'); _createStarExport(_DeleteJurisdictionservice);
var _FindJurisdictionsservice = require('./Jurisdiction/FindJurisdictions.service'); _createStarExport(_FindJurisdictionsservice);
var _UpdateJurisdictionservice = require('./Jurisdiction/UpdateJurisdiction.service'); _createStarExport(_UpdateJurisdictionservice);
var _FindJurisdictionservice = require('./Jurisdiction/FindJurisdiction.service'); _createStarExport(_FindJurisdictionservice);

// AGENCY
var _CreateAgencyservice = require('./Agency/CreateAgency.service'); _createStarExport(_CreateAgencyservice);
var _DeleteAgencyservice = require('./Agency/DeleteAgency.service'); _createStarExport(_DeleteAgencyservice);
var _FindAgenciesservice = require('./Agency/FindAgencies.service'); _createStarExport(_FindAgenciesservice);
var _UpdateAgencyservice = require('./Agency/UpdateAgency.service'); _createStarExport(_UpdateAgencyservice);
var _FindAgencyservice = require('./Agency/FindAgency.service'); _createStarExport(_FindAgencyservice);

// PROJECT
var _CreateProjectservice = require('./Project/CreateProject.service'); _createStarExport(_CreateProjectservice);
var _DeleteProjectservice = require('./Project/DeleteProject.service'); _createStarExport(_DeleteProjectservice);
var _FindProjectservice = require('./Project/FindProject.service'); _createStarExport(_FindProjectservice);
var _FindProjectsservice = require('./Project/FindProjects.service'); _createStarExport(_FindProjectsservice);
var _UpdateProjectservice = require('./Project/UpdateProject.service'); _createStarExport(_UpdateProjectservice);
var _CreateCopyProjectservice = require('./Project/CreateCopyProject.service'); _createStarExport(_CreateCopyProjectservice);

// LOCATION
var _CreateLocationservice = require('./Location/CreateLocation.service'); _createStarExport(_CreateLocationservice);
var _DeleteLocationservice = require('./Location/DeleteLocation.service'); _createStarExport(_DeleteLocationservice);
var _FindLocationservice = require('./Location/FindLocation.service'); _createStarExport(_FindLocationservice);
var _FindLocationsservice = require('./Location/FindLocations.service'); _createStarExport(_FindLocationsservice);
var _UpdateLocationservice = require('./Location/UpdateLocation.service'); _createStarExport(_UpdateLocationservice);

// POLYGON AREA
var _CreatePolygonAreaservice = require('./PolygonArea/CreatePolygonArea.service'); _createStarExport(_CreatePolygonAreaservice);
var _DeletePolygonAreaservice = require('./PolygonArea/DeletePolygonArea.service'); _createStarExport(_DeletePolygonAreaservice);
var _FindPolygonAreaservice = require('./PolygonArea/FindPolygonArea.service'); _createStarExport(_FindPolygonAreaservice);
var _FindPolygonAreasservice = require('./PolygonArea/FindPolygonAreas.service'); _createStarExport(_FindPolygonAreasservice);
var _UpdatePolygonAreaservice = require('./PolygonArea/UpdatePolygonArea.service'); _createStarExport(_UpdatePolygonAreaservice);

// TECHNICAL MANAGER
var _CreateTechnicalManagerservice = require('./TechnicalManager/CreateTechnicalManager.service'); _createStarExport(_CreateTechnicalManagerservice);
var _DeleteTechnicalManagerservice = require('./TechnicalManager/DeleteTechnicalManager.service'); _createStarExport(_DeleteTechnicalManagerservice);
var _FindTechinalManagersservice = require('./TechnicalManager/FindTechinalManagers.service'); _createStarExport(_FindTechinalManagersservice);
var _FindTechnicalManagerservice = require('./TechnicalManager/FindTechnicalManager.service'); _createStarExport(_FindTechnicalManagerservice);
var _UpdateTechnicalManagerservice = require('./TechnicalManager/UpdateTechnicalManager.service'); _createStarExport(_UpdateTechnicalManagerservice);

// PROJECT PHASE
var _CreateProjectPhaseservice = require('./ProjectPhase/CreateProjectPhase.service'); _createStarExport(_CreateProjectPhaseservice);
var _DeleteProjectPhaseservice = require('./ProjectPhase/DeleteProjectPhase.service'); _createStarExport(_DeleteProjectPhaseservice);
var _FindProjectPhaseservice = require('./ProjectPhase/FindProjectPhase.service'); _createStarExport(_FindProjectPhaseservice);
var _FindProjectPhasesservice = require('./ProjectPhase/FindProjectPhases.service'); _createStarExport(_FindProjectPhasesservice);
var _UpdateProjectPhaseservice = require('./ProjectPhase/UpdateProjectPhase.service'); _createStarExport(_UpdateProjectPhaseservice);
var _FindProjectPhasesWithTimelapseservice = require('./ProjectPhase/FindProjectPhasesWithTimelapse.service'); _createStarExport(_FindProjectPhasesWithTimelapseservice);

// ROLE
var _CreateRoleservice = require('./Role/CreateRole.service'); _createStarExport(_CreateRoleservice);
var _DeleteRoleservice = require('./Role/DeleteRole.service'); _createStarExport(_DeleteRoleservice);
var _FindRoleservice = require('./Role/FindRole.service'); _createStarExport(_FindRoleservice);
var _FindRolesservice = require('./Role/FindRoles.service'); _createStarExport(_FindRolesservice);
var _UpdateRoleservice = require('./Role/UpdateRole.service'); _createStarExport(_UpdateRoleservice);

// PRODUCT
var _CreateProductservice = require('./Product/CreateProduct.service'); _createStarExport(_CreateProductservice);
var _DeleteProductservice = require('./Product/DeleteProduct.service'); _createStarExport(_DeleteProductservice);
var _FindProductservice = require('./Product/FindProduct.service'); _createStarExport(_FindProductservice);
var _FindProductsservice = require('./Product/FindProducts.service'); _createStarExport(_FindProductsservice);
var _UpdateProductservice = require('./Product/UpdateProduct.service'); _createStarExport(_UpdateProductservice);

// DOCUMENT
var _CreateDocumentservice = require('./Document/CreateDocument.service'); _createStarExport(_CreateDocumentservice);
var _DeleteDocumentservice = require('./Document/DeleteDocument.service'); _createStarExport(_DeleteDocumentservice);
var _FindDocumentservice = require('./Document/FindDocument.service'); _createStarExport(_FindDocumentservice);
var _FindDocumentsservice = require('./Document/FindDocuments.service'); _createStarExport(_FindDocumentsservice);
var _UpdateDocumentservice = require('./Document/UpdateDocument.service'); _createStarExport(_UpdateDocumentservice);
var _UploadDocumentservice = require('./Document/UploadDocument.service'); _createStarExport(_UploadDocumentservice);
var _RemoveUploadDocumentservice = require('./Document/RemoveUploadDocument.service'); _createStarExport(_RemoveUploadDocumentservice);

// USER
var _CreateUserservice = require('./User/CreateUser.service'); _createStarExport(_CreateUserservice);
var _DeleteUserservice = require('./User/DeleteUser.service'); _createStarExport(_DeleteUserservice);
var _FindUserservice = require('./User/FindUser.service'); _createStarExport(_FindUserservice);
var _FindUsersservice = require('./User/FindUsers.service'); _createStarExport(_FindUsersservice);
var _UpdateUserservice = require('./User/UpdateUser.service'); _createStarExport(_UpdateUserservice);
var _ProvisoryPasswordservice = require('./User/ProvisoryPassword.service'); _createStarExport(_ProvisoryPasswordservice);
var _CreatePasswordAndLoginservice = require('./User/CreatePasswordAndLogin.service'); _createStarExport(_CreatePasswordAndLoginservice);
var _UpdatePasswordservice = require('./User/UpdatePassword.service'); _createStarExport(_UpdatePasswordservice);

// LOGIN
var _Loginservice = require('./Login/Login.service'); _createStarExport(_Loginservice);

// RECOVERY PASSWORD
var _PasswordRecoveryservice = require('./PasswordRecovery/PasswordRecovery.service'); _createStarExport(_PasswordRecoveryservice);
var _PasswordUpdateservice = require('./PasswordRecovery/PasswordUpdate.service'); _createStarExport(_PasswordUpdateservice);

// GRADE
var _CreateGradeservice = require('./Grade/CreateGrade.service'); _createStarExport(_CreateGradeservice);
var _DeleteGradeservice = require('./Grade/DeleteGrade.service'); _createStarExport(_DeleteGradeservice);
var _FindGradeservice = require('./Grade/FindGrade.service'); _createStarExport(_FindGradeservice);
var _FindGradiesservice = require('./Grade/FindGradies.service'); _createStarExport(_FindGradiesservice);
var _UpdateGradeservice = require('./Grade/UpdateGrade.service'); _createStarExport(_UpdateGradeservice);

// SECTOR
var _CreateSectorservice = require('./Sector/CreateSector.service'); _createStarExport(_CreateSectorservice);
var _DeleteSectorservice = require('./Sector/DeleteSector.service'); _createStarExport(_DeleteSectorservice);
var _FindSectorservice = require('./Sector/FindSector.service'); _createStarExport(_FindSectorservice);
var _FindSectoriesservice = require('./Sector/FindSectories.service'); _createStarExport(_FindSectoriesservice);
var _UpdateSectorservice = require('./Sector/UpdateSector.service'); _createStarExport(_UpdateSectorservice);

// ROLE GRADE
var _CreateRoleGradeservice = require('./RoleGrade/CreateRoleGrade.service'); _createStarExport(_CreateRoleGradeservice);
var _DeleteRoleGradeservice = require('./RoleGrade/DeleteRoleGrade.service'); _createStarExport(_DeleteRoleGradeservice);
var _FindRoleGradeservice = require('./RoleGrade/FindRoleGrade.service'); _createStarExport(_FindRoleGradeservice);
var _FindRoleGradesservice = require('./RoleGrade/FindRoleGrades.service'); _createStarExport(_FindRoleGradesservice);
var _UpdateRoleGradeservice = require('./RoleGrade/UpdateRoleGrade.service'); _createStarExport(_UpdateRoleGradeservice);

// PROFESSIONAL
var _CreateProfessionalservice = require('./Professional/CreateProfessional.service'); _createStarExport(_CreateProfessionalservice);
var _DeleteProfessionalservice = require('./Professional/DeleteProfessional.service'); _createStarExport(_DeleteProfessionalservice);
var _FindProfessionalservice = require('./Professional/FindProfessional.service'); _createStarExport(_FindProfessionalservice);
var _FindProfessionalsservice = require('./Professional/FindProfessionals.service'); _createStarExport(_FindProfessionalsservice);
var _UpdateProfessionalservice = require('./Professional/UpdateProfessional.service'); _createStarExport(_UpdateProfessionalservice);

// ALLOCATION PERIOD
var _CreateAllocationPeriodservice = require('./AllocationPeriod/CreateAllocationPeriod.service'); _createStarExport(_CreateAllocationPeriodservice);
var _DeleteAllocationPeriodservice = require('./AllocationPeriod/DeleteAllocationPeriod.service'); _createStarExport(_DeleteAllocationPeriodservice);
var _FindAllocationPeriodservice = require('./AllocationPeriod/FindAllocationPeriod.service'); _createStarExport(_FindAllocationPeriodservice);
var _FindAllocationPeriodsservice = require('./AllocationPeriod/FindAllocationPeriods.service'); _createStarExport(_FindAllocationPeriodsservice);
var _UpdateAllocationPeriodservice = require('./AllocationPeriod/UpdateAllocationPeriod.service'); _createStarExport(_UpdateAllocationPeriodservice);

// ALLOCATION
var _CreateAllocationservice = require('./Allocation/CreateAllocation.service'); _createStarExport(_CreateAllocationservice);
var _DeleteAllocationservice = require('./Allocation/DeleteAllocation.service'); _createStarExport(_DeleteAllocationservice);
var _FindAllocationservice = require('./Allocation/FindAllocation.service'); _createStarExport(_FindAllocationservice);
var _FindAllocationsservice = require('./Allocation/FindAllocations.service'); _createStarExport(_FindAllocationsservice);
var _UpdateAllocationservice = require('./Allocation/UpdateAllocation.service'); _createStarExport(_UpdateAllocationservice);
var _FindProfessionalsFromAllocationservice = require('./Allocation/FindProfessionalsFromAllocation.service'); _createStarExport(_FindProfessionalsFromAllocationservice);
var _FindProfessionalsAllocatedservice = require('./Allocation/FindProfessionalsAllocated.service'); _createStarExport(_FindProfessionalsAllocatedservice);

// PTI
var _FindPeriodPtiservice = require('./Pti/FindPeriodPti.service'); _createStarExport(_FindPeriodPtiservice);
var _FindProductHistoryPtiservice = require('./Pti/FindProductHistoryPti.service'); _createStarExport(_FindProductHistoryPtiservice);
var _FindProfessionalsPtiservice = require('./Pti/FindProfessionalsPti.service'); _createStarExport(_FindProfessionalsPtiservice);
var _DownloadPtiservice = require('./Pti/DownloadPti.service'); _createStarExport(_DownloadPtiservice);
var _FindProductHistoryPtiFromProfessionalservice = require('./Pti/FindProductHistoryPtiFromProfessional.service'); _createStarExport(_FindProductHistoryPtiFromProfessionalservice);

// INSPECTION
var _CreateInspectionservice = require('./Inspection/CreateInspection.service'); _createStarExport(_CreateInspectionservice);
var _DeleteInspectionservice = require('./Inspection/DeleteInspection.service'); _createStarExport(_DeleteInspectionservice);
var _FindInspectionservice = require('./Inspection/FindInspection.service'); _createStarExport(_FindInspectionservice);
var _FindInspectionsservice = require('./Inspection/FindInspections.service'); _createStarExport(_FindInspectionsservice);
var _UpdateInspectionservice = require('./Inspection/UpdateInspection.service'); _createStarExport(_UpdateInspectionservice);

// INSPECTION DOCUMENT
var _CreateInspectionDocumentservice = require('./InspectionDocument/CreateInspectionDocument.service'); _createStarExport(_CreateInspectionDocumentservice);
var _DeleteInspectionDocumentservice = require('./InspectionDocument/DeleteInspectionDocument.service'); _createStarExport(_DeleteInspectionDocumentservice);
var _FindInspectionDocumentservice = require('./InspectionDocument/FindInspectionDocument.service'); _createStarExport(_FindInspectionDocumentservice);
var _FindInspectionDocumentsservice = require('./InspectionDocument/FindInspectionDocuments.service'); _createStarExport(_FindInspectionDocumentsservice);
var _UpdateInspectionDocumentservice = require('./InspectionDocument/UpdateInspectionDocument.service'); _createStarExport(_UpdateInspectionDocumentservice);
var _DownloadInspectionDocumentservice = require('./InspectionDocument/DownloadInspectionDocument.service'); _createStarExport(_DownloadInspectionDocumentservice);

// TIMELAPSE
var _CreateTimelapseservice = require('./Timelapse/CreateTimelapse.service'); _createStarExport(_CreateTimelapseservice);
var _DeleteTimelapseservice = require('./Timelapse/DeleteTimelapse.service'); _createStarExport(_DeleteTimelapseservice);
var _FindTimelapseservice = require('./Timelapse/FindTimelapse.service'); _createStarExport(_FindTimelapseservice);
var _FindTimelapsesservice = require('./Timelapse/FindTimelapses.service'); _createStarExport(_FindTimelapsesservice);
var _UpdateTimelapseservice = require('./Timelapse/UpdateTimelapse.service'); _createStarExport(_UpdateTimelapseservice);
var _FindCoordinatesservice = require('./Timelapse/FindCoordinates.service'); _createStarExport(_FindCoordinatesservice);

// MEDIA TIMELAPSE
var _CreateMediaTimelapseservice = require('./MediaTimelapse/CreateMediaTimelapse.service'); _createStarExport(_CreateMediaTimelapseservice);
var _DeleteMediaTimelapseservice = require('./MediaTimelapse/DeleteMediaTimelapse.service'); _createStarExport(_DeleteMediaTimelapseservice);
var _FindMediaTimelapseservice = require('./MediaTimelapse/FindMediaTimelapse.service'); _createStarExport(_FindMediaTimelapseservice);
var _FindMediaTimelapsesservice = require('./MediaTimelapse/FindMediaTimelapses.service'); _createStarExport(_FindMediaTimelapsesservice);
var _UpdateMediaTimelapseservice = require('./MediaTimelapse/UpdateMediaTimelapse.service'); _createStarExport(_UpdateMediaTimelapseservice);
var _DownloadMediaTimelapseservice = require('./MediaTimelapse/DownloadMediaTimelapse.service'); _createStarExport(_DownloadMediaTimelapseservice);
var _GetMediaByCoordinatesservice = require('./MediaTimelapse/GetMediaByCoordinates.service'); _createStarExport(_GetMediaByCoordinatesservice);

// DELIVERY
var _FindDeliveriesservice = require('./Delivery/FindDeliveries.service'); _createStarExport(_FindDeliveriesservice);
var _CreateDeliveryservice = require('./Delivery/CreateDelivery.service'); _createStarExport(_CreateDeliveryservice);
var _UndoDeliveryservice = require('./Delivery/UndoDelivery.service'); _createStarExport(_UndoDeliveryservice);

// ANALYSIS
var _FindAnalysisservice = require('./Analysis/FindAnalysis.service'); _createStarExport(_FindAnalysisservice);
var _Acceptservice = require('./Analysis/Accept.service'); _createStarExport(_Acceptservice);
var _UndoAcceptservice = require('./Analysis/UndoAccept.service'); _createStarExport(_UndoAcceptservice);
var _Correctionservice = require('./Analysis/Correction.service'); _createStarExport(_Correctionservice);
var _UndoCorrectionservice = require('./Analysis/UndoCorrection.service'); _createStarExport(_UndoCorrectionservice);

// REPORT
var _ProjectPortfolioservice = require('./Report/ProjectPortfolio.service'); _createStarExport(_ProjectPortfolioservice);
var _Projectservice = require('./Report/Project.service'); _createStarExport(_Projectservice);
var _ReportPtiservice = require('./Report/ReportPti.service'); _createStarExport(_ReportPtiservice);
var _ReportProfessionalservice = require('./Report/ReportProfessional.service'); _createStarExport(_ReportProfessionalservice);
var _ReportContactservice = require('./Report/ReportContact.service'); _createStarExport(_ReportContactservice);

// POWER BI
var _PowerBiPortfolioservice = require('./PowerBi/PowerBiPortfolio.service'); _createStarExport(_PowerBiPortfolioservice);
var _PowerBiProfessionalservice = require('./PowerBi/PowerBiProfessional.service'); _createStarExport(_PowerBiProfessionalservice);
var _PowerBiProjectservice = require('./PowerBi/PowerBiProject.service'); _createStarExport(_PowerBiProjectservice);
var _PowerBiInspectionservice = require('./PowerBi/PowerBiInspection.service'); _createStarExport(_PowerBiInspectionservice);

// CONTACT
var _CreateContactservice = require('./Contact/CreateContact.service'); _createStarExport(_CreateContactservice);
var _DeleteContactservice = require('./Contact/DeleteContact.service'); _createStarExport(_DeleteContactservice);
var _FindContactservice = require('./Contact/FindContact.service'); _createStarExport(_FindContactservice);
var _FindContactsservice = require('./Contact/FindContacts.service'); _createStarExport(_FindContactsservice);
var _UpdateContactservice = require('./Contact/UpdateContact.service'); _createStarExport(_UpdateContactservice);

// CONTACT HISTORY
var _CreateContactHistoryservice = require('./ContactHistory/CreateContactHistory.service'); _createStarExport(_CreateContactHistoryservice);
var _DeleteContactHistoryservice = require('./ContactHistory/DeleteContactHistory.service'); _createStarExport(_DeleteContactHistoryservice);
var _FindContactHistoriesservice = require('./ContactHistory/FindContactHistories.service'); _createStarExport(_FindContactHistoriesservice);
var _FindContactHistoryservice = require('./ContactHistory/FindContactHistory.service'); _createStarExport(_FindContactHistoryservice);
var _UpdateContactHistoryservice = require('./ContactHistory/UpdateContactHistory.service'); _createStarExport(_UpdateContactHistoryservice);

// MAP
var _GetProjectsCoordinatesservice = require('./Map/GetProjectsCoordinates.service'); _createStarExport(_GetProjectsCoordinatesservice);
var _GetProjectsDataLocationservice = require('./Map/GetProjectsDataLocation.service'); _createStarExport(_GetProjectsDataLocationservice);
var _GetProjectsDataTimelapseservice = require('./Map/GetProjectsDataTimelapse.service'); _createStarExport(_GetProjectsDataTimelapseservice);
var _GetProjectsCoordinatesFromCityservice = require('./Map/GetProjectsCoordinatesFromCity.service'); _createStarExport(_GetProjectsCoordinatesFromCityservice);
