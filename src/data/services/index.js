// CATEGORY
export * from './Category/CreateCategory.service';
export * from './Category/DeleteCategory.service';
export * from './Category/UpdateCategory.service';
export * from './Category/FindCategories.service';
export * from './Category/FindCategory.service';

// PROGRAM
export * from './Program/CreateProgram.service';
export * from './Program/DeleteProgram.service';
export * from './Program/FindPrograms.service';
export * from './Program/UpdateProgram.service';
export * from './Program/FindProgram.service';

// REGION
export * from './Region/CreateRegion.service';
export * from './Region/DeleteRegion.service';
export * from './Region/FindRegions.service';
export * from './Region/UpdateRegion.service';
export * from './Region/FindRegion.service';

// CITY
export * from './City/CreateCity.service';
export * from './City/DeleteCity.service';
export * from './City/FindCities.service';
export * from './City/UpdateCity.service';
export * from './City/FindCity.service';

// JURISDICTION
export * from './Jurisdiction/CreateJurisdiction.service';
export * from './Jurisdiction/DeleteJurisdiction.service';
export * from './Jurisdiction/FindJurisdictions.service';
export * from './Jurisdiction/UpdateJurisdiction.service';
export * from './Jurisdiction/FindJurisdiction.service';

// AGENCY
export * from './Agency/CreateAgency.service';
export * from './Agency/DeleteAgency.service';
export * from './Agency/FindAgencies.service';
export * from './Agency/UpdateAgency.service';
export * from './Agency/FindAgency.service';

// PROJECT
export * from './Project/CreateProject.service';
export * from './Project/DeleteProject.service';
export * from './Project/FindProject.service';
export * from './Project/FindProjects.service';
export * from './Project/UpdateProject.service';
export * from './Project/CreateCopyProject.service';

// LOCATION
export * from './Location/CreateLocation.service';
export * from './Location/DeleteLocation.service';
export * from './Location/FindLocation.service';
export * from './Location/FindLocations.service';
export * from './Location/UpdateLocation.service';

// POLYGON AREA
export * from './PolygonArea/CreatePolygonArea.service';
export * from './PolygonArea/DeletePolygonArea.service';
export * from './PolygonArea/FindPolygonArea.service';
export * from './PolygonArea/FindPolygonAreas.service';
export * from './PolygonArea/UpdatePolygonArea.service';

// TECHNICAL MANAGER
export * from './TechnicalManager/CreateTechnicalManager.service';
export * from './TechnicalManager/DeleteTechnicalManager.service';
export * from './TechnicalManager/FindTechinalManagers.service';
export * from './TechnicalManager/FindTechnicalManager.service';
export * from './TechnicalManager/UpdateTechnicalManager.service';

// PROJECT PHASE
export * from './ProjectPhase/CreateProjectPhase.service';
export * from './ProjectPhase/DeleteProjectPhase.service';
export * from './ProjectPhase/FindProjectPhase.service';
export * from './ProjectPhase/FindProjectPhases.service';
export * from './ProjectPhase/UpdateProjectPhase.service';
export * from './ProjectPhase/FindProjectPhasesWithTimelapse.service';

// ROLE
export * from './Role/CreateRole.service';
export * from './Role/DeleteRole.service';
export * from './Role/FindRole.service';
export * from './Role/FindRoles.service';
export * from './Role/UpdateRole.service';

// PRODUCT
export * from './Product/CreateProduct.service';
export * from './Product/DeleteProduct.service';
export * from './Product/FindProduct.service';
export * from './Product/FindProducts.service';
export * from './Product/UpdateProduct.service';

// DOCUMENT
export * from './Document/CreateDocument.service';
export * from './Document/DeleteDocument.service';
export * from './Document/FindDocument.service';
export * from './Document/FindDocuments.service';
export * from './Document/UpdateDocument.service';
export * from './Document/UploadDocument.service';
export * from './Document/RemoveUploadDocument.service';

// USER
export * from './User/CreateUser.service';
export * from './User/DeleteUser.service';
export * from './User/FindUser.service';
export * from './User/FindUsers.service';
export * from './User/UpdateUser.service';
export * from './User/ProvisoryPassword.service';
export * from './User/CreatePasswordAndLogin.service';
export * from './User/UpdatePassword.service';

// LOGIN
export * from './Login/Login.service';

// RECOVERY PASSWORD
export * from './PasswordRecovery/PasswordRecovery.service';
export * from './PasswordRecovery/PasswordUpdate.service';

// GRADE
export * from './Grade/CreateGrade.service';
export * from './Grade/DeleteGrade.service';
export * from './Grade/FindGrade.service';
export * from './Grade/FindGradies.service';
export * from './Grade/UpdateGrade.service';

// SECTOR
export * from './Sector/CreateSector.service';
export * from './Sector/DeleteSector.service';
export * from './Sector/FindSector.service';
export * from './Sector/FindSectories.service';
export * from './Sector/UpdateSector.service';

// ROLE GRADE
export * from './RoleGrade/CreateRoleGrade.service';
export * from './RoleGrade/DeleteRoleGrade.service';
export * from './RoleGrade/FindRoleGrade.service';
export * from './RoleGrade/FindRoleGrades.service';
export * from './RoleGrade/UpdateRoleGrade.service';

// PROFESSIONAL
export * from './Professional/CreateProfessional.service';
export * from './Professional/DeleteProfessional.service';
export * from './Professional/FindProfessional.service';
export * from './Professional/FindProfessionals.service';
export * from './Professional/UpdateProfessional.service';

// ALLOCATION PERIOD
export * from './AllocationPeriod/CreateAllocationPeriod.service';
export * from './AllocationPeriod/DeleteAllocationPeriod.service';
export * from './AllocationPeriod/FindAllocationPeriod.service';
export * from './AllocationPeriod/FindAllocationPeriods.service';
export * from './AllocationPeriod/UpdateAllocationPeriod.service';

// ALLOCATION
export * from './Allocation/CreateAllocation.service';
export * from './Allocation/DeleteAllocation.service';
export * from './Allocation/FindAllocation.service';
export * from './Allocation/FindAllocations.service';
export * from './Allocation/UpdateAllocation.service';
export * from './Allocation/FindProfessionalsFromAllocation.service';
export * from './Allocation/FindProfessionalsAllocated.service';

// PTI
export * from './Pti/FindPeriodPti.service';
export * from './Pti/FindProductHistoryPti.service';
export * from './Pti/FindProfessionalsPti.service';
export * from './Pti/DownloadPti.service';
export * from './Pti/FindProductHistoryPtiFromProfessional.service';

// INSPECTION
export * from './Inspection/CreateInspection.service';
export * from './Inspection/DeleteInspection.service';
export * from './Inspection/FindInspection.service';
export * from './Inspection/FindInspections.service';
export * from './Inspection/UpdateInspection.service';

// INSPECTION DOCUMENT
export * from './InspectionDocument/CreateInspectionDocument.service';
export * from './InspectionDocument/DeleteInspectionDocument.service';
export * from './InspectionDocument/FindInspectionDocument.service';
export * from './InspectionDocument/FindInspectionDocuments.service';
export * from './InspectionDocument/UpdateInspectionDocument.service';
export * from './InspectionDocument/DownloadInspectionDocument.service';

// TIMELAPSE
export * from './Timelapse/CreateTimelapse.service';
export * from './Timelapse/DeleteTimelapse.service';
export * from './Timelapse/FindTimelapse.service';
export * from './Timelapse/FindTimelapses.service';
export * from './Timelapse/UpdateTimelapse.service';
export * from './Timelapse/FindCoordinates.service';

// MEDIA TIMELAPSE
export * from './MediaTimelapse/CreateMediaTimelapse.service';
export * from './MediaTimelapse/DeleteMediaTimelapse.service';
export * from './MediaTimelapse/FindMediaTimelapse.service';
export * from './MediaTimelapse/FindMediaTimelapses.service';
export * from './MediaTimelapse/UpdateMediaTimelapse.service';
export * from './MediaTimelapse/DownloadMediaTimelapse.service';
export * from './MediaTimelapse/GetMediaByCoordinates.service';

// DELIVERY
export * from './Delivery/FindDeliveries.service';
export * from './Delivery/CreateDelivery.service';
export * from './Delivery/UndoDelivery.service';

// ANALYSIS
export * from './Analysis/FindAnalysis.service';
export * from './Analysis/Accept.service';
export * from './Analysis/UndoAccept.service';
export * from './Analysis/Correction.service';
export * from './Analysis/UndoCorrection.service';

// REPORT
export * from './Report/ProjectPortfolio.service';
export * from './Report/Project.service';
export * from './Report/ReportPti.service';
export * from './Report/ReportProfessional.service';
export * from './Report/ReportContact.service';

// POWER BI
export * from './PowerBi/PowerBiPortfolio.service';
export * from './PowerBi/PowerBiProfessional.service';
export * from './PowerBi/PowerBiProject.service';
export * from './PowerBi/PowerBiInspection.service';

// CONTACT
export * from './Contact/CreateContact.service';
export * from './Contact/DeleteContact.service';
export * from './Contact/FindContact.service';
export * from './Contact/FindContacts.service';
export * from './Contact/UpdateContact.service';

// CONTACT HISTORY
export * from './ContactHistory/CreateContactHistory.service';
export * from './ContactHistory/DeleteContactHistory.service';
export * from './ContactHistory/FindContactHistories.service';
export * from './ContactHistory/FindContactHistory.service';
export * from './ContactHistory/UpdateContactHistory.service';

// MAP
export * from './Map/GetProjects.service';
