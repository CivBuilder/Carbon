import calcMetal from "../../../calculations/recycling_calculations/calcMetal.js"

describe('calcMetal', () => {
  it('returns the correct amount of CO2 saved from metal in pounds', () => {
    expect(calcMetal(10)).toBe(22);
  });

  it('returns 0 when the input is 0', () => {
    expect(calcMetal(0)).toBe(0);
  });
});