import { describe, expect, test } from '@jest/globals';
import { feed, feedApi, initialState } from './feedSlice';

const feedTest = {
  orders: [
    {
      _id: '666422d897ede0001d06f802',
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-06-08T09:22:32.567Z',
      updatedAt: '2024-06-08T09:22:32.970Z',
      number: 41954,
      ingredients: ['1', '2', '3']
    },
    {
      _id: '666422e097ede0001d06f804',
      status: 'done',
      name: 'Традиционный-галактический флюоресцентный бессмертный бургер',
      createdAt: '2024-06-08T09:22:40.831Z',
      updatedAt: '2024-06-08T09:22:41.252Z',
      number: 41955,
      ingredients: ['4', '5', '6']
    }
  ],
  success: true,
  total: 3,
  totalToday: 3
};

describe('Проверка слайса feedSlice', () => {
  test('обработка экшена feed(pending)', () => {
    const state = feed(initialState, feedApi.pending('pending'));
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена feed(fulfilled)', () => {
    const state = feed(initialState, feedApi.fulfilled(feedTest, 'fulfilled'));
    expect(state.isLoading).toBe(false);
    expect(state.feed).toEqual(feedTest);
  });
});
