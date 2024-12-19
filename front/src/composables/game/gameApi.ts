import axiosInstance from '@/config/AxiosConfig';
import { ApiGetGameOfUser,ApiPostNewGame,ApiGetGameById,ApiUpdateMove , ApiIsMoveValid} from '@/constants/ApiUrl';
import type { Game } from '@/model/Game.model';


async function createGame(white:number, black:number, date:Date,hidden:boolean, ranked:boolean): Promise<number> {
  const res = await axiosInstance.post<{ }>(`${ApiPostNewGame}`, {
    white_id: white,
    black_id: black,
    date:date.getDate(),
    winner: -1,
    hidden:hidden,
    ranked:ranked,
    move:""
  });
  return res.status;
}

async function updateMove(id:number , move:string): Promise<number> {
  const res = await axiosInstance.patch<{ }>(`${ApiPostNewGame}${id}`, {
    move:move
  });
  return res.status;
}

async function getGameOfUser(id:number){
  const res = await axiosInstance.get<Game[]>(`${ApiGetGameOfUser}${id}`);
  return res.data;
}

async function getGame(id:number){
  const res = await axiosInstance.get<Game>(`${ApiGetGameById}${id}`);
  return res.data;
}

async function getAvailableMove(id:number, position:string, piece:string){
  const res = await axiosInstance.post<string[]>(`${ApiIsMoveValid}${id}`,
  {
    position: position,
    piece:piece
  });

  return res;
}

export{
    getGameOfUser,
    createGame,
    getAvailableMove,
    
}
