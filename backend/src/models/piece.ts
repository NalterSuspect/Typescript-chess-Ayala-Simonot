import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model";

export interface MoveAttributes {
  name:string;
  color:boolean;
}

export class Piece
  extends Model<MoveAttributes>
  implements MoveAttributes
{
  public name!:string;
  public color!:boolean; // black=0 white=1

  public newPiece(name:string, color:boolean):Piece{
    let piece = new Piece();
    switch (name) {
          case "K":
            piece.name="King";
            break;
          case "Q":
            piece.name="Queen";
              break;
          case "P":
            piece.name="Pawn";
            break;
          case "N":
            piece.name="Night"
            break;
          case "R":
            piece.name="Rook"
            break;
          case "B":
            piece.name="Bishop";
            break;
          default:
            break;
    }
    piece.color=color;
    return piece;
  }


}
