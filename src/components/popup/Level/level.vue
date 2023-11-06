<template>
    <div class="containerPopup">
        <div class="dpf-row dpf-j-btw padding10 cursor-pointer header-popup" >
            <h1>{{ props?.item?.name }} - Niveau {{ props?.item?.level }}</h1> 
            <span 
            class="padding10" 
            @click="closePopup">
                X
            </span>
        </div>
        <div class="main-popup">
            <div class="dpf-row container-amelioration">
                <div class="left">
                    <p>Travailleurs : </p>
                </div>  
                <div class="amelioration">
                    <div>
                        <p>{{ props?.item?.workers }}</p>
                        <p class="green">+ {{ mineur }}</p>
                    </div>
                </div>
            </div>
            <hr>
            <div class="dpf-row container-amelioration">
                <div class="left">
                    <p>Extraction :</p>
                </div>
                
                <div class="amelioration">
                    <div>
                        <p>{{ props?.item?.gainSecondes }} par travailleurs</p>
                        <p class="green">+ {{ extraction }}</p>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <div class="container-bas dpf-row dpf-j-btw padding10 dpf-a-center">
            <div class="dpf-row container-level-up dpf-a-bottom dpf-j-btw">
                <div 
                :class="{'active':state === '1'}" 
                @click="changeMultiplicateur()">
                   x1 
                </div>
                <div 
                :class="{'active':state === 'max'}" 
                @click="changeMultiplicateur()">
                    max
                </div>
            </div>
            <p :class="{'green':money >= prix, 'red': money < prix}"> prix : {{prix}}</p>
            <button 
            @click="updateLevel(state)" 
            :class="{'disabled-button':money < prix}">
                <p 
                class="level" 
                :class="{'disabled-text':money < prix }">
                Niveau sup. x {{iteration}}
                </p>
                <p class="buy" >Améliorer</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits,onMounted  } from 'vue';
import { ref } from "vue";
import {money, maxLevel, addWorker} from  "@/data/levels";
import type { Level } from "@/types/Level";

const emit = defineEmits();
let state= ref<string>("1");
const x1 = ref<number>(0);
const max = ref<number>(0);
const iteration = ref<number>(0);
const prix = ref<number>(0);
const extraction = ref<number>(0);
const previsionExtration = ref<number>(0);
const mineur = ref<number>(0);

const props = defineProps<{
item: Level | null
}>()

const closePopup = () : void =>{
   emit('closePopup', false);
}

const updateLevel = (step:string) : void =>{

    if(money.value >= props!.item!.price1 && props!.item!.level < maxLevel){
        const total: number = step === '1'? x1.value : max.value;

        addWorkerOnImage(props!.item!.level, props!.item!.level+iteration.value);

        money.value = arrondir(money.value - total);
        props.item!.price1 = arrondir(total+(total*0.2));
        max.value = arrondir(total+(total*0.2));
        x1.value = arrondir(total+(total*0.2));
        iteration.value = 1;
        prix.value = arrondir(total+(total*0.2));
        getPrevisionExtraction(1);
        getPrevisionMineur(1);
    }
    
}

const arrondir = (number:number) : number =>{
    return Math.ceil(number*100)/100;
}

const addWorkerOnImage = (lastlevel: number, newLevel:number) : void=>{
    let totalAdd: number = 0;

    for(let i = lastlevel; i < newLevel; i++){
        props!.item!.level += 1;
        props!.item!.gainSecondes = arrondir(props!.item!.gainSecondes + (props!.item!.gainSecondes*50/100));
        
        if(addWorker.includes(props!.item!.level)){
            props!.item!.workers += 1;
            totalAdd +=1;
        }
    }

    emit('addWorker', props!.item!, totalAdd);
}

const changeMultiplicateur = () : void =>{
    state.value = state.value === '1'? 'max':'1';
    getPrice();
    prix.value = state.value ==='max'? max.value : x1.value;
}

const getPrice = () : void =>{
    x1.value = 0;
    max.value=0;
    iteration.value = 1;
    let priceAmelio : number = 0;
    let removeMoneyToAmelioration : number = 0;
    let addMoneyToAmelioration : number = 0;
    let currentPercentage : number = 0.2;
    let finish : boolean = false;

    while(money.value > 0 && money.value >= priceAmelio! && !finish){

        if(iteration.value === 1 ){
            priceAmelio +=props.item!.price1;
        }else{
            addMoneyToAmelioration += priceAmelio + (priceAmelio * currentPercentage);
            removeMoneyToAmelioration = addMoneyToAmelioration;
            priceAmelio! += addMoneyToAmelioration;
        }

        if(priceAmelio! <= money.value){
            iteration.value += 1;
        }else{
            priceAmelio! -=  removeMoneyToAmelioration
            iteration.value -=1;
            finish = true;
        }

    }

    x1.value = props.item!.price1;
    max.value = priceAmelio === 0 ? props.item!.price1 : arrondir(priceAmelio!);
    iteration.value = getIteration(iteration.value);
    getPrevisionExtraction(state.value ==="1"? 1 :  iteration.value);
    getPrevisionMineur(state.value ==="1"? 1 : iteration.value);
}

const getPrevisionExtraction = (iteration:number) : void =>{

    for(let i  : number = 1; i < iteration + 1; i++){

        if(i === 1){
            previsionExtration.value = props!.item!.gainSecondes + (props!.item!.gainSecondes*50/100);
            extraction.value = arrondir(props!.item!.gainSecondes*50/100);
        }else{
            previsionExtration.value += (previsionExtration.value*50/100);
            extraction.value = arrondir(previsionExtration.value - props!.item!.gainSecondes);
        }
    }
}

const getPrevisionMineur = (iteration:number) : void =>{
    let totalMineur : number = 0;
    let ancienLevel : number = props.item?.level || 1;

    for(let i : number = 0 ; i < iteration; i++){
        ancienLevel! += 1;

        if (addWorker.includes(ancienLevel)){
            totalMineur+=1;
        }
    }
    mineur.value = totalMineur;
}

const getIteration = (iteration: number) : number =>{
    if(state.value==='1'){
        return 1;
    }else{
        return iteration === 0 ? 1 : iteration;
    }
}

onMounted(() => {
    getPrice();
    prix.value = state.value ==='max'? max.value : x1.value;
});

</script>
<style scoped src="./style.css"></style>