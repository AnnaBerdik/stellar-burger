import { describe, expect, test } from '@jest/globals';
import {
  addBun,
  addIngredient,
  clearIngredient,
  constructorBurger,
  initialState,
  removeIngredient
} from './burgerConstructorSlice';

const ingredientBunTest = {
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
};

const ingredientTest = {
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
};

describe('Проверка слайса ConstructorBurgerSlice', () => {
  test('обработка экшена добавления ингредиента', () => {
    const state = constructorBurger(
      initialState,
      addIngredient(ingredientTest)
    );
    expect(state.constructorIngredients[0]).toEqual(ingredientTest);
  });

  test('обработка экшена удаления ингредиента', () => {
    const state = constructorBurger(
      { bun: null, constructorIngredients: [ingredientTest] },
      removeIngredient(ingredientTest)
    );
    expect(state.constructorIngredients).toHaveLength(0);
    expect(state.constructorIngredients[0]).toBeNull;
  });

  test('обработка экшена добавления булочек', () => {
    const state = constructorBurger(initialState, addBun(ingredientBunTest));
    expect(state.bun).toEqual(ingredientBunTest);
  });

  test('очистка конструктора ингридиентов', () => {
    const state = constructorBurger(
      { bun: ingredientBunTest, constructorIngredients: [ingredientTest] },
      clearIngredient()
    );
    expect(state).toEqual({ bun: null, constructorIngredients: [] });
  });
});
