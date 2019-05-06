const alphaSwap = require('./hw2');

describe('hw2', () => {
  it('should return correct answer when str = nick', () => {
    expect(alphaSwap('ABCZ')).toBe('abcz');
  });

  it('should return correct answer when str = Nick', () => {
    expect(alphaSwap('abcz')).toBe('ABCZ');
  });

  it('should return correct answer when str = ,hEllO123', () => {
    expect(alphaSwap(',hEllO123')).toBe(',HeLLo123');
  });

  it('should return correct answer when str = ', () => {
    expect(alphaSwap('')).toBe('');
  });
});
