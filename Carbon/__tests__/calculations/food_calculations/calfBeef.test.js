import calcBeef from "../../../calculations/food_calculations/calcBeef.js"

test("calcBeef", () =>
{
    ret = calcBeef(3);
    expect(ret).equalsTo(Math.round(3 * 45));
})