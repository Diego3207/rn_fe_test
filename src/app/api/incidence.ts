export interface Incidence {
    id: number,
    incidenceCostumerId: number,
    incidenceSourceInformation: string,
    incidenceStartDateAttention: Date,
    incidenceInformant: string,
    incidenceType: string,
    incidenceTypeDescription: string,
    incidenceQuadrant: string,
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
