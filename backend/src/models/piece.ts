import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model";

export interface PieceAttributes {
  name:string;
  shortName:string;
  color:boolean;
}

export class Piece
  extends Model<PieceAttributes>
  implements PieceAttributes
{
  public name!:string;
  public shortName!:string;
  public color!:boolean; // black=false white=true  

  static isPiece(obj: any): obj is Piece {
    return typeof obj === 'object' && obj !== null && 'name' in obj;
}


  static newPiece(name:string, color:boolean):Piece{
    let piece = new Piece();
    switch (name) {
          case "K":
            piece.name="King";
            piece.shortName="K";
            piece.color=color;
            break;
          case "Q":
            piece.name="Queen";
            piece.shortName="Q";
            piece.color=color;
              break;
          case "P":
            piece.name="Pawn";
            piece.shortName="P";
            piece.color=color;
            break;
          case "N":
            piece.name="Night"
            piece.shortName="N";
            piece.color=color;
            break;
          case "R":
            piece.name="Rook"
            piece.shortName="R";
            piece.color=color;
            break;
          case "B":
            piece.name="Bishop";
            piece.shortName="B";
            piece.color=color;
            break;
          default:
            break;
    }
    return piece;
  }


}
