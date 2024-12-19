<template>
<div style="display: flex;">
  <div>
  <div class="board">
    <div> </div>
    <div class="cell">a</div>
    <div class="cell">b</div>
    <div class="cell">c</div>
    <div class="cell">d</div>
    <div class="cell">e</div>
    <div class="cell">f</div>
    <div class="cell">g</div>
    <div class="cell">h</div>
    <template v-for="(row, rowIndex) in board" :key="rowIndex">
      <div class="cell"> {{ 8-rowIndex }}</div>
      <div v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'white': (rowIndex + colIndex) % 2 !== 0, 'black': (rowIndex + colIndex) % 2 == 0, 'selected':(boolBoard[rowIndex][colIndex])}" class="cell" @click="selectPiece(rowIndex,colIndex)">
          <img :src="'/public/img/'+cell.img" alt="">
      </div>
    </template>
  </div>
  <div class="capturedPieces-container">
    <template v-for="piece in capturedPiecesByWhite" :key="piece">
      <img :src="'/public/img/'+piece.img" alt="">
    </template>
  </div>
  <div class="capturedPieces-container">
    <template v-for="piece in capturedPiecesByBlack" :key="piece">
      <img :src="'/public/img/'+piece.img" alt="">
    </template>
  </div>
</div>
<div style="display: flex;flex-direction: column ;justify-content: center; align-items: center;padding: 0 25px;">
  <p>{{ currentMove }}</p>
  <div :class="{'black-player':(!currentPlayer),'white-player':(currentPlayer)}"></div>
  <div>
    <button @click="playNextMove">Next</button>
    <button @click="startGame">START</button>
  </div>
</div>
</div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { getMove } from '../composables/move/moveService';
import type { Move } from '@/model/Move.model';
import { useRoute } from 'vue-router';
import {initBoard,nextMove,initBoolBoard} from '@/composables/piece/pieceService';

const board=ref();
const boolBoard=ref();
const currentMove=ref('');
const currentPlayer=ref();
const capturedPiecesByWhite=ref();
const capturedPiecesByBlack=ref();
const selectedCases:Array<{col:number,row:number}>=[];

let moveIndex=0;
function playNextMove(){
  currentPlayer.value=!currentPlayer.value;
  currentMove.value=nextMove(moveIndex);
  readMove();
  moveIndex++;
}

function startGame(){
  board.value=initBoard();
  boolBoard.value=initBoolBoard();
  capturedPiecesByWhite.value=[];
  capturedPiecesByBlack.value=[];
  currentPlayer.value=false;
}

function readMove(){
  switch(currentMove.value[0]){
    case "R":console.log("rook");break;
    case "N":getKnightFromMove();break;
    case "K":console.log("king");break;
    case "B":getBishopFromMove();break;
    case "Q":console.log("queen");break;
    case "O":makeCastle();break;
    default: getPawnFromMove();
  }
  switch(currentMove.value[1]){
    case "x":console.log("capture time");break;
    default: console.log("...");
  }
}

function getPawnFromMove(){
  const col=currentMove.value[0].charCodeAt(0)-97;
  const row=8-parseInt(currentMove.value[1],10);

  if(currentPlayer.value){
    for(let i=1 ;i<3;i++){
      if(board.value[row+i][col].type=="P"){
        //boolBoard.value[row+i][col]=true;
        movePieceV2(row+i,col,row,col);
      }
    }
  }else{
    for(let i=1;i<3;i++){
      if(board.value[row-i][col].type=="P"){
        //boolBoard.value[row-i][col]=true;
        movePieceV2(row-i,col,row,col);
      }
    }
  }
}

function getBishopFromMove(){
  const col=currentMove.value[1].charCodeAt(0)-97;
  const row=8-parseInt(currentMove.value[2],10);

  if(currentPlayer.value){
    for(let i=0;i<8;i++){
      if((0<=row-i) && (0<=col-i) && board.value[row-i][col-i].type=="B"){
        movePieceV2(row-i,col-i,row,col);
      }
      if((row+i<8) && (col+i<8) && board.value[row+i][col+i].type=="B"){
        movePieceV2(row+i,col+i,row,col);
      }
      if((0<=row-i) && (col+i<8) && board.value[row-i][col+i].type=="B"){
        movePieceV2(row-i,col+i,row,col);
      }
      if((row+i<8) && (0<=col-i) && board.value[row+i][col-i].type=="B"){
        movePieceV2(row+i,col-i,row,col);
      }
    }
  }else{
    for(let i=0;i<8;i++){
      if((0<=row-i) && (0<=col-i) && board.value[row-i][col-i].type=="B"){
        movePieceV2(row-i,col-i,row,col);
      }
      if((row+i<8) && (col+i<8) && board.value[row+i][col+i].type=="B"){
        movePieceV2(row+i,col+i,row,col);
      }
      if((0<=row-i) && (col+i<8) && board.value[row-i][col+i].type=="B"){
        movePieceV2(row-i,col+i,row,col);
      }
      if((row+i<8) && (0<=col-i) && board.value[row+i][col-i].type=="B"){
        movePieceV2(row+i,col-i,row,col);
      }
    }
  }
}

function getKnightFromMove(){
  const col=currentMove.value[1].charCodeAt(0)-97;
  const row=8-parseInt(currentMove.value[2],10);

  if(currentPlayer.value){
    if((0<=row-1) && (0<=col-2) && board.value[row-1][col-2].type=="N"){
      //boolBoard.value[row-1][col-2]=true;
      movePieceV2(row-1,col-2,row,col);
    }
    if((0<=row-2) && (0<=col-1) && board.value[row-2][col-1].type=="N"){
      //boolBoard.value[row-2][col-1]=true;
      movePieceV2(row-2,col-1,row,col);
    }
    if((0<=row-1) && (col+2<8) && board.value[row-1][col+2].type=="N"){
      //boolBoard.value[row-1][col+2]=true;
      movePieceV2(row-1,col+2,row,col);
    }
    if((0<=row-2) && (col+1<8) && board.value[row-2][col+1].type=="N"){
      //boolBoard.value[row-2][col+1]=true;
      movePieceV2(row-2,col+1,row,col);
    }

    if((row+1<8) && (0<=col-2) && board.value[row+1][col-2].type=="N"){
      //boolBoard.value[row+1][col-2]=true;
      movePieceV2(row+1,col-2,row,col);
    }
    if((row+2<8) && (0<=col-1) && board.value[row+2][col-1].type=="N"){
      //boolBoard.value[row+2][col-1]=true;
      movePieceV2(row+2,col-1,row,col);
    }

    if((row+1<8) && (col+2<8) && board.value[row+1][col+2].type=="N"){
      //boolBoard.value[row+1][col+2]=true;
      movePieceV2(row+1,col+2,row,col);
    }
    if((row+2<8) && (col+1<8) && board.value[row+2][col+1].type=="N"){
      //boolBoard.value[row+2][col+1]=true;
      movePieceV2(row+2,col+1,row,col);
    }
  }else{
    if((0<=row-1) && (0<=col-2) && board.value[row-1][col-2].type=="N"){
      //boolBoard.value[row-1][col-2]=true;
      movePieceV2(row-1,col-2,row,col);
    }
    if((0<=row-2) && (0<=col-1) && board.value[row-2][col-1].type=="N"){
      //boolBoard.value[row-2][col-1]=true;
      movePieceV2(row-2,col-1,row,col);
    }
    if((0<=row-1) && (col+2<8) && board.value[row-1][col+2].type=="N"){
      //boolBoard.value[row-1][col+2]=true;
      movePieceV2(row-1,col+2,row,col);
    }
    if((0<=row-2) && (col+1<8) && board.value[row-2][col+1].type=="N"){
      //boolBoard.value[row-2][col+1]=true;
      movePieceV2(row-2,col+1,row,col);
    }

    if((row+1<8) && (0<=col-2) && board.value[row+1][col-2].type=="N"){
      //boolBoard.value[row+1][col-2]=true;
      movePieceV2(row+1,col-2,row,col);
    }
    if((row+2<8) && (0<=col-1) && board.value[row+2][col-1].type=="N"){
      //boolBoard.value[row+2][col-1]=true;
      movePieceV2(row+2,col-1,row,col);
    }

    if((row+1<8) && (col+2<8) && board.value[row+1][col+2].type=="N"){
      //boolBoard.value[row+1][col+2]=true;
      movePieceV2(row+1,col+2,row,col);
    }
    if((row+2<8) && (col+1<8) && board.value[row+2][col+1].type=="N"){
      //boolBoard.value[row+2][col+1]=true;
      movePieceV2(row+2,col+1,row,col);
    }
  }
}

function makeCastle(){
  if(currentPlayer.value){
    if(currentMove.value.length==3)
      permutePieces(7,4,7,7);
    else
      permutePieces(7,4,7,0);
  }else{
    if(currentMove.value.length==3)
      permutePieces(0,4,0,7)
    else
      permutePieces(0,4,0,0)
  }
}

function selectPiece(r:number,c:number){
  boolBoard.value[r][c]=true;
  selectedCases.push({col:c,row:r});


  if(selectedCases.length>1){
    const col = selectedCases[0].col;
    const row = selectedCases[0].row;

    boolBoard.value[row][col]=false;

    const d_col = selectedCases[1].col;
    const d_row = selectedCases[1].row;

    movePieceV2(row,col,d_row,d_col);

    boolBoard.value[r][c]=false;
    selectedCases.length=0;
  }
}

function movePieceV2(row:number,col:number,d_row:number,d_col:number){
  if(board.value[d_row][d_col].type!="-")
    capturePiece(d_row,d_col);

  board.value[d_row][d_col]=board.value[row][col];
  board.value[row][col]={type:"-",img:""};
}

function permutePieces(row:number,col:number,d_row:number,d_col:number){
  const res=board.value[d_row][d_col];
  board.value[d_row][d_col]=board.value[row][col];
  board.value[row][col]=res;
}

function capturePiece(d_row:number,d_col:number){
  if(currentPlayer.value){
    const piece=board.value[d_row][d_col];
    capturedPiecesByWhite.value.push(piece);
  }else{
    const piece=board.value[d_row][d_col];
    capturedPiecesByBlack.value.push(piece);
  }
}

function writeMove(){

}

const moves = ref<Move>();
const route = useRoute(); // Accéder aux données de la route

onMounted(
  async()=>{
        const param:number = Number(route.params.game);
        moves.value = await getMove(param);
        }
)
</script>
