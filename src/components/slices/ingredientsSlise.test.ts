import { describe, expect, test } from '@jest/globals';
import { getIngredients, ingredients, initialState } from './ingredientsSlice';

const ingredientsTest = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '643d69a5c3f7b9001cfa093c'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '643d69a5c3f7b9001cfa0941'
  }
];

describe('Проверка слайса ingredientsSlice', () => {
  test('обработка экшена ingredients(pending)', () => {
    const state = ingredients(initialState, getIngredients.pending('pending'));
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена feed(fulfilled)', () => {
    const state = ingredients(
      initialState,
      getIngredients.fulfilled(ingredientsTest, 'fulfilled')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredientData).toEqual(ingredientsTest);
  });
});
