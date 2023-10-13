import { createReducer, on } from '@ngrx/store';
import { hideAlert, setAppProcessing, showAlert } from './global.action';
import { GlobalState } from 'src/app/shared/models/store.model';

const initialState: GlobalState = {
  appProcessing: false,
  alertData: {
    visible: false,
    type: '',
    message: '',
  },
};

export const globalReducer = createReducer(
  initialState,
  on(setAppProcessing, (state, action) => {
    return { ...state, appProcessing: action.payload };
  }),
  on(showAlert, (state, action) => {
    return { ...state, alertData: { visible: true, ...action.payload } };
  }),
  on(hideAlert, (state, action) => {
    return { ...state, alertData: { visible: false, type: '', message: '' } };
  })
);
