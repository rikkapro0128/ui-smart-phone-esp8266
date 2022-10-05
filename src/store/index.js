import { configureStore } from '@reduxjs/toolkit';

import signSlice from '~/store/signSlice';

export const store = configureStore({
  reducer: {
    sign: signSlice,
  },
});
