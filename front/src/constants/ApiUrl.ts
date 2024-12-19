import config from '@/config.json';

const ApiUrl = config.VUE_APP_API_BASE_URL;

export const ApiUrlConnection = `${ApiUrl}/auth`;
export const ApiUrlUser = `${ApiUrl}/users`;
export const ApiGetUser = `${ApiUrl}/users/name/`;

export const ApiGetGameOfUser = `${ApiUrl}/games/user/`;
export const ApiPostNewGame = `${ApiUrl}/games/create/`;
export const ApiGetGameById = `${ApiUrl}/games`;
export const ApiUpdateMove = `${ApiUrl}/games/update/move/`;
export const ApiIsMoveValid = `${ApiUrl}/games/validmove/`;



export const ApiGetMovesOfGame = `${ApiUrl}/moves/`;

