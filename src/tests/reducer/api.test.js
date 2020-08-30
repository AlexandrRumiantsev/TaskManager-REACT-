import {getData} from "../../actions/ApiActions.js"; 
import "babel-polyfill";
const axios = require('axios');

/**
  * Функция для прямого тестирования АПИ
**/
function apiTest() {
  return new Promise(resolve => {
      axios.get('https://test.megapolis-it.ru/api/list').then(resp => {
			resolve(resp.data)
	  }); 
  });
}


/**
  * Функция для асинхронного вызова функции для теста
**/
async function asyncCall() {
  return await apiTest();
}


/**
  * Тест на успешный запрос к АПИ
**/
test('Запрос выполнился успешно', () => {
  return asyncCall().then(data => {
    expect(data.success).toBe(true);
  });
});

/**
  * Тест на возврат минимум 1 элемента
**/
test('Запрос вернул не менее 1 элемента от АПИ', () => {
  return asyncCall().then(data => {
    expect(data.length).toBeGreaterThanOrEqual(1);
  });
});


