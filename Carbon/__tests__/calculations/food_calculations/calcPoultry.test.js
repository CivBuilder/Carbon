
import calcPoultry from "../../../calculations/food_calculations/calcPoultry.js"

test("calcPoultry", () =>
{
    ret = calcPoultry(3);
    expect(ret).equalsTo(Math.round(3 * 8.55));
})
