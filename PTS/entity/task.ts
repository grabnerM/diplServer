export interface ITask{
    id: number;
    startlat: number;
    startlng: number;
    endlat: number;
    endlng: number;
    description: string;
    status: number;
    receiverid: number;
}