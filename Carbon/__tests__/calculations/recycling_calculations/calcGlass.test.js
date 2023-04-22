import calcGlass from "../../../calculations/recycling_calculations/calcGlass.js"

describe('calcGlass', () => {
  it('returns the correct amount of CO2 saved from glass in pounds', () => {
    expect(calcGlass(10)).toBe(28);
  });

  it('returns 0 when the input is 0', () => {
    expect(calcGlass(0)).toBe(0);
  });
});