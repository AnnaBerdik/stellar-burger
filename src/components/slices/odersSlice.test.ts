import { describe, expect, test } from '@jest/globals';
import {
  orderBurger,
  getOrders,
  order,
  initialState,
  getOrderNumber
} from './ordersSlice';

const orderTest = {
  _id: '66645cb097ede0001d06f8a9',
  status: 'done',
  name: 'Флюоресцентный био-марсианский бургер',
  createdAt: '2024-06-08T13:29:20.730Z',
  updatedAt: '2024-06-08T13:29:21.166Z',
  number: 41975,
  ingredients: ['1', '2', '3']
};

describe('Проверка слайса ordersSlice', () => {
  test('обработка экшена orderBurger(pending)', () => {
    const state = order(
      initialState,
      orderBurger.pending('pending', orderTest.ingredients)
    );
    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
  });

  test('обработка экшена orderBurger(fulfilled)', () => {
    const state = order(
      initialState,
      orderBurger.fulfilled(
        {
          order: orderTest,
          name: 'string',
          success: false
        },
        'fulfilled',
        orderTest.ingredients
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(orderTest);
  });

  test('обработка экшена getOrderNumber(pending)', () => {
    const state = order(
      initialState,
      getOrderNumber.pending('pending', Number(orderTest._id))
    );
    expect(state.isLoading).toBe(true);
  });

  test('обработка экшена getOrderNumber(pending)', () => {
    const state = order(
      initialState,
      getOrderNumber.pending('pending', Number(orderTest._id))
    );
    expect(state.isLoading).toBe(true);
  });

  test('обработка экшена getOrderNumber(fulfilled)', () => {
    const state = order(
      initialState,
      getOrderNumber.fulfilled(
        {
          success: true,
          orders: [orderTest]
        },
        'fulfilled',
        Number(orderTest._id)
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderId[0]).toEqual(orderTest);
  });

  test('обработка экшена getOrders(pending)', () => {
    const state = order(initialState, getOrders.pending('pending'));
    expect(state.isLoading).toBe(true);
  });

  test('обработка экшена getOrders(fulfilled)', () => {
    const state = order(
      initialState,
      getOrders.fulfilled([orderTest], 'fulfilled')
    );
    expect(state.isLoading).toBe(false);
    expect(state.userOrders[0]).toEqual(orderTest);
  });
});
