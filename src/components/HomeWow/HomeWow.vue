<template>
   <span>Argent : {{ money }}</span>
   

    <div class="container">
        <div 
            v-for="item in player" v-bind:key="item.index"
            class="green  mb"
            
            >
                <div class="containerBidule dpf-row dpf-j-btw dpf-a-center" v-if="!item.nextUnblock && !item.isLock">
                    <div class="containerBox container20 dpf-column">
                        <span>{{ item.gainSecondes }}$ /travailleur</span>
                        <button v-on:click="getManager(item)">Manager</button>
                        <span>{{ item.stock }}</span>
                        <div class="box" v-on:click="getMoney(item)"></div>
                    </div>
                    <div class="containerWorker container60 dpf-row dpf-a-bottom">
                        <div class="workers" :class="'class-' +item.index" v-on:click="startWorker(item)" v-for="index in item.workers" >
                            <!-- <img width="180" :class="'image'+item.index" src="@/assets/elfe/stand.gif" alt=""> -->
                        </div>
                    </div>
                    
                    <div class="container-amelioration container20 dpf-column">
                        <div class="amelioration" :class="{'active':money >= item.price1 && item.level !== 'max'}"
                        v-on:click="updateLevel(item)">
                        <span> lvl {{ item.level }}</span> <br>
                        <span v-if="item.level !== 'max'"> {{item.price1}} $</span>
                        </div>
                    </div>
                </div> 

                <div class="containerBidule" v-if="item.nextUnblock && item.isLock">
                    <button v-on:click="unblock(item)">{{ item.priceUnblock }} $</button>

                </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import { ref } from "vue"
import { Level } from "@/types/Level"
const money = ref<number>(0)
const maxLevel:number = 800;
const player = ref<Level[]>([
  {
    name:'Foret d',
    index:0,
    level:1,
    maxLevel: maxLevel,
    price1: 20,
    priceMax:20,
    stock: 0,
    gainSecondes:10,
    addWorker: [2, 3, 4, 5],
    workers:1,
    isLock:false,
    complete: 2,
    isClickable: true,
    speedWorkers:8000,
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
    addWorker: [2, 20, 50, 100],
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

const getManager=(item:Level)=>{
    item.haveManager = true;
    startWorker(item);
    setInterval(function () {
        console.log('start setInterval')
    startWorker(item);
  }, 10100);

}

const updateLevel = (item:Level)=>{
    if(money.value >= item.price1 && typeof item.level !== 'string' && item.level < maxLevel ){
        item.level = item.level+1
        money.value = arrondir(money.value - item.price1)
        item.price1 = arrondir(item.price1 *2)
        item.gainSecondes = arrondir(item.gainSecondes + (item.gainSecondes*50/100))

        if(item.addWorker.includes(item.level)){
            item.workers += 1
            const worker =  document.getElementsByClassName("class-"+item.index);

            setTimeout(function () {
                const bidule =  worker[item.workers-1] as HTMLElement
                const option : {ecart:string, url:string } = getBackgroundAndGap(item)
                bidule.style.left = option!.ecart
                bidule.style.backgroundImage = option!.url
            }, 100 )
            
        }
        
        if(item.level === maxLevel){
            item.level = 'max';
            item.price1 = 0
        }
    } 
}

const getBackgroundAndGap=(item:Level):{ ecart: string; url: string }=>{
    switch (item.workers){
        case 1:
        return {ecart:"40px",url:"url('src/assets/elfe/stand.gif')" } 
        case 2: 
        return {ecart:"30px",url:"url('src/assets/human/stand.gif')" }
        case 3: 
        return {ecart:"20px",url:"url('src/assets/nain/stand.gif')" }
        case 4: 
        return {ecart:"10px",url:"url('src/assets/human/stand.gif')" }
        case 5: 
        return {ecart:"0px",url:"url('src/assets/human/stand.gif')" }
        default:
            return {ecart:"0px",url:"url('src/assets/human/stand.gif')" }
    }
    

}
const startWorker = (item:Level)=>{
    console.log(document.styleSheets)
    if(item.isClickable){
        item.isClickable = false;
        const worker =  document.getElementsByClassName("class-"+item.index);
        for (let i = 0; i < worker.length; i++) {
            const element = worker[i] as HTMLElement;
            setTimeout(function () {
               
                element.classList.add('workers'+i)
                element.style.animationDuration = item.speedWorkers+"ms"

            }, i*500)
          

                setTimeout(function () {
                    element.classList.remove("workers"+i);
                    item.stock =arrondir(item.stock + item.gainSecondes) ;
                    item.isClickable = true
                   
            }, item.speedWorkers+i* 500)
        }  
       
    }
  
}


const getMoney = (item:Level)=>{
    money.value = arrondir(money.value +  item.stock);
    item.stock = 0
}

const arrondir=(number:number)=>{
    return Math.ceil(number*100)/100
}
const unblock=(item:Level)=>{

    item.isLock = false;
    item.nextUnblock = false;
}

</script>
<style scoped src="./animation.css"></style>
<style scoped src="./style.css"></style>