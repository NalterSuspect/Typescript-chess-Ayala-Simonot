import config from '@/config.json';

const ApiUrl = config.VUE_APP_API_BASE_URL;

export const ApiUrlConnection = `${ApiUrl}/auth`;
export const ApiUrlUser = `${ApiUrl}/users`;
export const ApiUrlAuthor = `${ApiUrl}/author`;
export const ApiGetUser = `${ApiUrl}/users/`;
export const ApiGetGameOfUser = `${ApiUrl}/games/user/`;
export const ApiGetMovesOfGame = `${ApiUrl}/moves/`;


