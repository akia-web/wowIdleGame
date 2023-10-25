<template>
    <div class="containerPopup">
        <div class="dpf-row dpf-j-btw padding10 cursor-pointer header-popup" >
           <h1>{{ props?.item?.name }} - Niveau {{ props?.item?.level }}</h1> 
           <span class="padding10" @click="closePopup">X</span>
        </div>
        <div class="main-popup">
            <p>Travailleurs : {{ props?.item?.workers }}</p>
            <p>Extraction : {{ props?.item?.gainSecondes }} / travailleurs</p>
            {{ state }}
        </div>
        <div class="container-bas dpf-row dpf-j-btw padding10 dpf-a-center">
            <div class="dpf-row container-level-up dpf-a-bottom dpf-j-btw">
                <div :class="{'active':state === '1'}" @click="changeMultiplicateur()">x1</div>
                <div :class="{'active':state === 'max'}" @click="changeMultiplicateur()">max</div>
            </div>
            <p :class="{'green':money >= prix, 'red': money < prix}"> prix : {{prix}}</p>
            <button @click="updateLevel(state)" :class="{'disabled-button':money < prix}">
                <p class="level" :class="{'disabled-text':money < prix }">Niveau sup. x {{iteration}}</p>
                <p class="buy" >Améliorer</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits,onMounted  } from 'vue';
import { ref } from "vue"
import {money, maxLevel, addWorker} from  "@/data/levels"
import type { Level } from "@/types/Level";

const emit = defineEmits();
let state= ref<string>("1")
const x1 = ref<number>(0)
const max = ref<number>(0)
const iteration = ref<number>(0)
const prix = ref<number>(0)

const props = defineProps<{
item: Level | null
}>()

const closePopup=()=>{
   emit('closePopup', false);
}

const updateLevel = (step:string):void=>{

    if(money.value  >= props!.item!.price1 && props!.item!.level < maxLevel){
        const total: number = step === '1'? x1.value : max.value;

        addWorkerOnImage(props!.item!.level, props!.item!.level+iteration.value )

        money.value = arrondir(money.value - total)
        props.item!.price1 = total*2
        max.value = total*2
        x1.value = total*2
        iteration.value = 1
        prix.value = total*2      
    }
    
}

const arrondir=(number:number):number=>{
    return Math.ceil(number*100)/100;
}

const addWorkerOnImage = (lastlevel: number, newLevel:number):void=>{
    let totalAdd:number = 0
    for(let i = lastlevel; i < newLevel; i++){
        props!.item!.level += 1
        props!.item!.gainSecondes = arrondir(props!.item!.gainSecondes + (props!.item!.gainSecondes*50/100))
        if(addWorker.includes(props!.item!.level)){
            props!.item!.workers += 1
            totalAdd +=1
        }
    }
    emit('addWorker', props!.item!, totalAdd)

}
const changeMultiplicateur=()=>{
    state.value = state.value === '1'? 'max':'1'
    getPrice()
    prix.value = state.value ==='max'? max.value : x1.value
}

const getPrice =()=>{
    x1.value = 0;
    max.value=0;
    iteration.value = 1;
    if(state.value === '1'){
        const price : number = props!.item!.price1
        x1.value = price;
    }else{
        let priceAmelio = 0

        while(money.value >0 && money.value >= priceAmelio! ){

            if(iteration.value >0 && iteration.value === 1){
                priceAmelio +=props.item!.price1;
            }else{
                priceAmelio! += priceAmelio!
            }

            if(priceAmelio! <= money.value){
                iteration.value += 1
            }else{
                if(iteration.value === 1){
                    max.value = props.item!.price1;
                    return
                }else{
                    priceAmelio! -= priceAmelio!/2
                    max.value = priceAmelio!
                    iteration.value -=1 
                    return 
                } 
            }
            
        }
        if(priceAmelio===0){
            max.value = props.item!.price1
        }else{
            max.value = priceAmelio!
        }
     
    }

 
}
onMounted(() => {
    getPrice()
    prix.value = state.value ==='max'? max.value : x1.value
});

</script>
<style scoped src="./style.css"></style>