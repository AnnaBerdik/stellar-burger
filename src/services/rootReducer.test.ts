import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';
import { expect, test } from '@jest/globals';

describe('Проверка rootReducer', () => {
  test('Проверка на undefined', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const reducerTest = rootReducer(undefined, { type: 'unknown' });

    expect(reducerTest).toEqual(store.getState());
  });
});
