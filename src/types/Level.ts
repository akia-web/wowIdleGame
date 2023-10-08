export interface Level {
    name:string,
    index:number,
    level:number | string,
    maxLevel:number 
    price1: number,
    priceMax:number,
    stock: number,
    gainSecondes:number,
    workers:number,
    isLock:boolean,
    complete: number;
    isClickable : boolean,
    speedWorkers:number,
    addWorker: number[],
    nextUnblock: boolean,
    priceUnblock : number
    recolteTime:number,
    haveManager:boolean

}