import { describe, expect, test } from '@jest/globals';
import {
  getUserThunk,
  registUser,
  loginUser,
  logoutUser,
  updateUser,
  forgotPassword,
  user,
  initialState,
  resetPassword
} from './userSlice';

const userTest = {
  email: 'string',
  name: 'string'
};

const userLoginTest = {
  email: 'string',
  name: 'string',
  password: 'string'
};
describe('Проверка слайса userSlice', () => {
  test('обработка экшена getUserThunk(pending)', () => {
    const state = user(initialState, getUserThunk.pending('pending'));
    expect(state.isAuth).toBe(false);
  });

  test('обработка экшена getUserThunk(fulfilled)', () => {
    const state = user(
      initialState,
      getUserThunk.fulfilled({ user: userTest, success: true }, 'fulfilled')
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userTest);
  });

  test('обработка экшена registUser(pending)', () => {
    const state = user(
      initialState,
      registUser.pending('pending', userLoginTest)
    );
    expect(state.isAuth).toBe(false);
  });

  test('обработка экшена registUser(fulfilled)', () => {
    const state = user(
      initialState,
      registUser.fulfilled(
        {
          refreshToken: 'string',
          accessToken: 'string',
          user: userTest,
          success: true
        },
        'fulfilled',
        userLoginTest
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userTest);
  });

  test('обработка экшена loginUser(pending)', () => {
    const state = user(
      initialState,
      loginUser.pending('pending', userLoginTest)
    );
    expect(state.isAuth).toBe(false);
  });

  test('обработка экшена loginUser(fulfilled)', () => {
    const state = user(
      initialState,
      loginUser.fulfilled(
        {
          refreshToken: 'string',
          accessToken: 'string',
          user: userTest,
          success: true
        },
        'fulfilled',
        userLoginTest
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userTest);
  });

  test('обработка экшена logoutUser(pending)', () => {
    const state = user(initialState, logoutUser.pending('pending'));
    expect(state.isAuth).toBe(true);
  });

  test('обработка экшена logoutUser(fulfilled)', () => {
    const state = user(
      initialState,
      logoutUser.fulfilled(undefined, 'fulfilled')
    );
    expect(state.isAuth).toBe(false);
    expect(state.user).toBeNull();
  });

  test('обработка экшена updateUser(pending)', () => {
    const state = user(initialState, updateUser.pending('pending', userTest));
    expect(state.isAuth).toBe(false);
  });

  test('обработка экшена updateUser(fulfilled)', () => {
    const state = user(
      initialState,
      updateUser.fulfilled(
        {
          user: userTest,
          success: true
        },
        'fulfilled',
        userTest
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userTest);
  });

  test('обработка экшена forgotPassword(pending)', () => {
    const state = user(
      initialState,
      forgotPassword.fulfilled(undefined, 'fulfilled', userTest.email)
    );
    expect(state.isAuth).toBe(false);
  });

  test('обработка экшена forgotPassword(fulfilled)', () => {
    const state = user(
      initialState,
      resetPassword.fulfilled(
        {
          success: true
        },
        'fulfilled',
        { password: userLoginTest.password, token: '3333333333333bbbb' }
      )
    );
    expect(state.isAuth).toBe(false);
  });
});
