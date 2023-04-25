import calcPlastic from "../../../calculations/recycling_calculations/calcPlastic.js"

describe('calcPlastic', () => {
  it('returns the correct amount of CO2 saved from plastic in pounds', () => {
    expect(calcPlastic(10)).toBe(44);
  });

  it('returns 0 when the input is 0', () => {
    expect(calcPlastic(0)).toBe(0);
  });
});