import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";
import { Piece } from "../models/piece";
import { gameService, GameService } from "./game.service";

export class PieceService {

    async movementOfPiece(pieceName:string, game:number, position:string):Promise<string[]> {

        const gameMoves = (await gameService.getGameById(game)).move;
        let a = [Piece.newPiece("R",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("R",false)];
        let b  = [Piece.newPiece("N",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("N",false)];
        let c = [Piece.newPiece("B",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("B",false)];
        let d = [Piece.newPiece("Q",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("Q",false)];
        let e = [Piece.newPiece("K",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("K",false)];
        let f = [Piece.newPiece("B",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("B",false)];
        let g = [Piece.newPiece("N",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("N",false)];
        let h = [Piece.newPiece("R",true),Piece.newPiece("P",true),"","","","",Piece.newPiece("P",false),Piece.newPiece("R",false)];

        let chessboard =  [a,b,c,d,e,f,g,h]; 
        const allmove = (await gameService.getGameById(game)).move;
        if(allmove){
            //alogrythme qui charge le déroulement d'une partie à partir des mouvements en BD
        }
        
        switch (pieceName) {
          case "K":
            this.kingMovement(chessboard,position);
            break;
          case "Q":
            this.queenMovement(chessboard,position);
            break;
          case "P":
            return this.pawnMovement(chessboard,position);
            break;
          case "N":
            this.horseMovement(chessboard,position);
            break;
          case "R":
            this.towerMovement(chessboard,position);
            break;
          case "B":
            this.foolMovement(chessboard,position);
            break;
          default:
            break;
        }
        return [""];
    }

    private queenMovement(chessboard:(string | Piece)[][], position:string){
        
    } 

    private kingMovement(chessboard:(string | Piece)[][], position:string){

    }

    private foolMovement(chessboard:(string | Piece)[][], position:string){

    }

    private towerMovement(chessboard:(string | Piece)[][], position:string){

    }

    private pawnMovement(chessboard:(string | Piece)[][], position:string):string[]{
        let piece:Piece | string = chessboard[this.letterInNumber(position[0])][Number(position[1])];
        
        if(typeof piece === 'string'){
            return ["erreur position"];
        }

        if(piece.shortName != "P"){
            return ["erreur mauvaise piece trouve"];
        }
        const columnName:string = position[0]
        const columnValue:number = this.letterInNumber(position[0]);
        const line:number = Number(position[1])-1;
        let movementPossible:string[] = [];
        let movementPossibleNumber = 0;

        if(piece.color && line == 2 ){ // cas spécial blanc avance 2 case
            if(chessboard[columnValue+1][line] === ""){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1);
                if(chessboard[columnValue+2][line] === ""){
                    movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+2);
                }
            }

        }else if(!piece.color && line == 7){// Cas spécial noir avance 2 case
            if(chessboard[columnValue-1][line] === ""){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1);
                if(chessboard[columnValue-2][line] === ""){
                    movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+2);
                }
            }

        }else if(piece.color){// blanc avance d'une case ou fait une prise en diagonale
            if(chessboard[columnValue+1][line] == ""){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1);
            }
            
            if(Piece.isPiece(chessboard[columnValue+1][line+1]) && line+1<8 ){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1)+(line+1);
            }
            if(line-1>0 && typeof chessboard[columnValue+1][line-1] !== "string"){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1)+(line-1);
            }
        }else if(!piece.color){ // noir avance d'une case ou fait une prise en diagonale
            if(chessboard[columnValue-1][line] == ""){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1);
            }
            let tempPiece = chessboard[columnValue-1][line+1];
            if(line+1<8 && Piece.isPiece(tempPiece) && !tempPiece.color){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1)+(line+1);
            }
            tempPiece = chessboard[columnValue-1][line-1];
            if(line-1>0 && Piece.isPiece(tempPiece) && !tempPiece.color){
                movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1)+(line-1);
            }
        }
        return movementPossible;

    }

    private horseMovement(chessboard:(string | Piece)[][], position:string){

    }

    private numberInLetter(n:number):string{
        switch (n) {
            case 0:
                return "a";
            case 1:
                return "b";
            case 2:
                return "c";
            case 3:
                return "d";
            case 4:
                return "e";
            case 5:
                return "f";
            case 6:
                return "g";
            case 7:
                return "h";
            default:
                return "";
        }
    }

    private letterInNumber(letter:string):number{
        switch (letter) {
            case "a":
                return 0;
            case "b":
                return 1;
            case "c":
                return 2;
            case "d":
                return 3;
            case "e":
                return 4;
            case "f":
                return 5;
            case "g":
                return 6;
            case "h":
                return 7;
            default:
                return 8;
        }
    }
    
}

export const moveService = new PieceService();
