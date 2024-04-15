import { Message } from './message'

export interface TrackerInstallationEvidence {
    id:number,  
    trackerInstallationEvidenceTrackerInstallationId: number,
    trackerInstallationEvidencPath: string,
    trackerInstallationEvidencSize: number,
    trackerInstallationEvidenceName: string,
    trackerInstallationEvidenceDescription: string,
    trackerInstallationEvidencActive : boolean,
     
}