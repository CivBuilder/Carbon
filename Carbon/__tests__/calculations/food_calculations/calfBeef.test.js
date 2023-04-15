import calcBeef from "../../../calculations/food_calculations/calcBeef.js"

test("calcBeef", () =>
{
    ret = calcBeef(3);
    expect(ret).toBe(Math.round(3 * 45));
})