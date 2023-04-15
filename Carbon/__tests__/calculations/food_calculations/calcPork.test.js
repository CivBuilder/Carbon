
import calcPork from "../../../calculations/food_calculations/calcPork.js"

test("calcPork", () =>
{
    ret = calcPork(3);
    expect(ret).equalsTo(Math.round(3 * 11.7));
})
