import calcBread from "../../../calculations/food_calculations/calcBread.js"

test("calcBread", () =>
{
    ret = calcBread(3);
    expect(ret).toBe(Math.round(3 * 1.4));
})
