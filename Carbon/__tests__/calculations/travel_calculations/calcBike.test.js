import calcBike from "../../../calculations/travel_calculations/calcBike.js"

describe('calcBike', () => {
  it('returns the correct amount of CO2 emitted from biking in pounds', () => {
    expect(calcBike(10)).toBe(1);
  });

  it('returns 0 when the input is 0', () => {
    expect(calcBike(0)).toBe(0);
  });
});