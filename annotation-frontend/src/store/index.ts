import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

// Define the state for the image navigation
interface ImageState {
  currentIndex: number;
}

const initialState: ImageState = {
  currentIndex: 0,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setCurrentIndex } = imageSlice.actions;

// Configure the store
export const store = configureStore({
  reducer: {
    image: imageSlice.reducer,
  },
});

// TypeScript types for useDispatch and useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
