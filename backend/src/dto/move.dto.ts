import { UserOutputDTO } from "./user.dto";

export interface MoveInputDTO {
  position:string;
  piece:string;
}

export interface MoveInputPatchDTO {
  position:string;
  piece:string;
}

export interface MoveOutputDTO {
  position:string;
  piece:string;
}
