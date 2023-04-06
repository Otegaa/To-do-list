/**
 * @jest-environment jsdom
 */

import { addList } from './addRemove.js';

const getStorage = JSON.parse(localStorage.getItem('list')) || [];

describe('add and remove to/from the list', () => {
  // document.body.innerHTML =
  test('add to the list', () => {
    addList('hello', getStorage);
    expect(getStorage).toHaveLength(1);
  });
});
