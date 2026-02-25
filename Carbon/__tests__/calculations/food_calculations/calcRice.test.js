import calcRice from "../../../calculations/food_calculations/calcRice.js"

test("calcRice", () =>
{
    ret = calcRice(3);
    expect(ret).toBe(Math.round(3 * 4.0));
})
