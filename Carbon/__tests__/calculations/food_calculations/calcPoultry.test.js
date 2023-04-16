
import calcPoultry from "../../../calculations/food_calculations/calcPoultry.js"

test("calcPoultry", () =>
{
    ret = calcPoultry(3);
    expect(ret).toBe(Math.round(3 * 8.55));
})
