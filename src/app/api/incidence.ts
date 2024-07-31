export interface Incidence {
    id: number,
    incidenceCostumerId: number,
    incidenceSourceInformation: string,
    incidenceSourceChannel: string,
    incidenceStartDateAttention: Date,
    incidenceInformant: string,
    incidenceClassification: string,
    incidenceType: string,
    incidenceStartDate: Date,
    incidenceEndDate: Date,
    incidenceDescriptionInvolvedPeople: string,
    incidenceDescriptionInvolvedVehicles: string,
    incidenceDependencyId: number,
    incidenceObservation: string,
    incidenceValidationEvent: string,
    incidenceEndDateAttention: string,
    incidenceActive: boolean
}
