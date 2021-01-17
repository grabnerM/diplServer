export interface ITask{
    id: number;
    startlat: number;
    startlng: number;
    endlat: number;
    endlng: number;
    description: string;
    title: string;
    status: number;
    receiverid: number;
}