import orderJson from '../fixtures/order.json';

describe('проверяем доступность приложения', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'token');
    localStorage.setItem('refreshToken', 'token');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.visit('http://localhost:4000');
  });

  describe('проверка модальных окон', () => {
    it('проверка открытия модального окна', function () {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals').contains('Биокотлета из марсианской Магнолии');
    });

    it('проверка закрытого модального окна', function () {
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка закрытия модального окна по клику на крестик', function () {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('#modals').find('button').click();
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка закрытия модального окна по клику на esc', function () {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('body').type('{esc}');
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка закрытия модального окна по клику на оверлей', function () {
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('#overlay').click({ force: true });
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Добавление ингрединетов в заказ', () => {
    it('Проверка добавление булки в заказ', () => {
      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('Проверка добавление ингредиентов в заказ', () => {
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    it('Проверка формирования заказа', () => {
      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.contains('Оформить заказ').click();
      cy.contains('43000');
      cy.get('body').type('{esc}');
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка, что конструктор пуст', () => {
      cy.get('.text_type_main-default').contains('Выберите булки');
      cy.get('.text_type_main-default').contains('Выберите начинку');
    });
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
