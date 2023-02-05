import { Content } from './content';

describe('Notification Content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('a'.repeat(6));
    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification content with less than 5 characters', () => {
    try {
      new Content('a'.repeat(4));
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual('Content length error.');
    }
  });

  test('it should not be able to create a notification content with more than 240 characters', () => {
    try {
      new Content('a'.repeat(241));
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual('Content length error.');
    }
  });
});
