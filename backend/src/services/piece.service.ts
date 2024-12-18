import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";
import { Piece } from "../models/piece";
import { gameService, GameService } from "./game.service";

export class PieceService {

    async movementOfPiece(pieceName:string, game:number, position:string):Promise<string> {
        if(position.length != 2){
            throw notFound("Position of piece");
        }
        const gameMoves = (await gameService.getGameById(game)).move;
        //Tableau dans le mauvais sens !!!!!!!!!!!!!!!!!!!!!
        let a = ["T","C","F","Q","K","F","C","T"];
        let b  = ["P","P","P","P","P","P","P","P"];
        let c = ["","","","","","","",""];
        let d = ["","","","","","","",""];
        let e = ["","","","","","","",""];
        let f = ["","","","","","","",""];
        let g = ["P","P","P","P","P","P","P","P"];
        let h = ["T","C","F","Q","K","F","C","T"];

        let chessboard:string[][] =  [a,b,c,d,e,f,g,h]; 


        //alogrythme qui affiche sous forme de tableau

        switch (pieceName) {
          case "K":
            break;
          case "Q":
              break;
          case "P":
            break;
          case "C":
            break;
          case "T":
            break;
          case "F":
            break;
          default:
            break;
        }
        return "";
    }

    private queenMovement(chessboard:string[][], position:string){
        
    } 

    private kingMovement(chessboard:string[][], position:string){

    }

    private foolMovement(chessboard:string[][], position:string){

    }

    private towerMovement(chessboard:string[][], position:string){

    }

    private pawnMovement(chessboard:string[][], position:string):string[]{
        const columnName:string = position[0]
        const columnValue:number = this.letterInNumber(position[0]);
        const line:number = Number(position[1]);
        let movementPossible:string[] = [];
        let movementPossibleNumber = 0;

        if(chessboard[line][columnValue+1] == ""){
            movementPossible[movementPossibleNumber] = this.numberInLetter(columnValue+1)+;
        }

        return movementPossible;

    }

    private horseMovement(chessboard:string[][], position:string){

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
