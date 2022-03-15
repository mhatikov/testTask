import { CharLimitPipe } from './char-limit.pipe';

describe('CharLimitPipe', () => {
  it('create an instance', () => {
    const pipe = new CharLimitPipe();
    expect(pipe).toBeTruthy();
  });
});
