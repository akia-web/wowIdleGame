<template>
    <div class="containerPopup">
        <div class="dpf-row dpf-j-btw padding10 cursor-pointer header-popup" >
           <h1>{{ props?.item?.name }} - Niveau {{ props?.item?.level }}</h1> 
           <span class="padding10" @click="closePopup">X</span>
        </div>
        <p>Travailleurs : {{ props?.item?.workers }}</p>
        <p>Extraction : {{ props?.item?.gainSecondes }} / travailleurs</p>

        <div class="container-bas dpf-row dpf-j-btw padding10 dpf-a-bottom">
            <div class="dpf-row container-level-up dpf-a-bottom">
                <div :class="{'active':state === '1'}">x1</div>
                <div>max</div>
            </div>
            <p>{{  props?.item?.price1}}</p>
            <button @click="updateLevel">
                <p>Niveau sup. x</p>
                <p >Améliorer</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import {money, maxLevel, addWorker} from  "@/data/levels"
import type { Level } from "@/types/Level";
const emit = defineEmits();
let state : string = "1"

const props = defineProps<{
item: Level | null
}>()

const closePopup=()=>{
   emit('closePopup', false);
}

const updateLevel = ():void=>{

    if(money.value  >= props!.item!.price1 && props!.item!.level < maxLevel){
        props!.item!.level += 1
        money.value = arrondir(money.value - props!.item!.price1)
        props!.item!.gainSecondes = arrondir(props!.item!.gainSecondes + (props!.item!.gainSecondes*50/100))
        if(addWorker.includes(props!.item!.level)){
            props!.item!.workers += 1
            emit('addWorker', props!.item!)
        }   
    }
    
}

const arrondir=(number:number):number=>{
    return Math.ceil(number*100)/100;
}

</script>
<style scoped src="./style.css"></style>