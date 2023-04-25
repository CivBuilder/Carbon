import calcPaper from "../../../calculations/recycling_calculations/calcPaper.js"

describe('calcPaper', () => {
  it('returns the correct amount of CO2 saved from paper in pounds', () => {
    expect(calcPaper(10)).toBe(44);
  });

  it('returns 0 when the input is 0', () => {
    expect(calcPaper(0)).toBe(0);
  });
});