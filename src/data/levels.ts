import type { Level } from "@/types/Level";
import { ref } from 'vue';
export const maxLevel:number = 10; 
export const addWorker: number[] = [2, 3, 4, 5]


export const money = ref(0);

export const level = ref<Level[]>( 
[
    {
        name:`Forêt d'Elwynn`,
        index:0,
        level:1,
        maxLevel: maxLevel,
        price1: 20,
        priceMax:20,
        stock: 0,
        gainSecondes:10,
        workers:1,
        isLock:false,
        complete: 2,
        isClickable: true,
        speedWorkers:4000,
        nextUnblock:false,
        priceUnblock: 0,
        recolteTime:1000,
        haveManager:false
      },  
      {
        name:'Foret d',
        index:1,
        level:1,
        maxLevel: maxLevel,
        price1: 1000,
        priceMax:20,
        stock: 0,
        gainSecondes:10,
        workers:1,
        isLock:true,
        complete: 2,
        isClickable: true,
        speedWorkers:2000,
        nextUnblock: true,
        priceUnblock: 1000,
        recolteTime:1000,
        haveManager: false
      },
])