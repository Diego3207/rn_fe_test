export interface MonitoringDevice {
    id: number,
    monitoringDeviceName: string,
    monitoringDeviceCostumerId: number,
    monitoringDeviceOperationalAreaId: number,
    monitoringDeviceType: string,
    monitoringDeviceProvider: boolean,
    monitoringDeviceActive:boolean; 
    monitoringDeviceIsInvolved:boolean; 
    monitoringDeviceIsFault:boolean,
    //x:boolean 
}