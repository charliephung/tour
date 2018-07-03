import { LOADING_END, LOADING_START } from "../constants/actionTypes";

export const actLoadingStart = () => ({ type: LOADING_START });
export const actLoadingEnd = () => ({ type: LOADING_END });
