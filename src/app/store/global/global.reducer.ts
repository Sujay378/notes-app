import { createReducer, on } from '@ngrx/store';
import { setAppProcessing } from './global.action';
import { GlobalState } from 'src/app/shared/models/store.model';

const initialState: GlobalState = {
  appProcessing: false,
};

export const globalReducer = createReducer(
  initialState,
  on(setAppProcessing, (state, action) => {
    return { ...state, appProcessing: action.payload };
  })
);
