import { expect, test } from 'vitest';
import { isExtMatched } from '../findFiles';
test('isExtMatched', () => {
  expect(isExtMatched('.pdf', ['.pdf'])).toBeTruthy();
  expect(isExtMatched('.pdf', ['.pdf', '.epub'])).toBeTruthy();
  expect(isExtMatched('.pdf', ['.epub', '.pdf'])).toBeTruthy();
});

test('readdir', () => {
  expect();
});
