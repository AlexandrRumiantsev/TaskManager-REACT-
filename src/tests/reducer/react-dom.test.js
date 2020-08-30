/*
jsdom - реализация DOM API на чистом JS 
для использования в Node.js
*/

test('normalize', () => {
  const expected = '<p class="row">Text</p>';
  document.documentElement.innerHTML = expected;
  expect(document.body.innerHTML).toEqual(expected);
});