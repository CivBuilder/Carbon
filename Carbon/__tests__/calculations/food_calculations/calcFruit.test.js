import calcFruit from "../../../calculations/food_calculations/calcFruit.js"

test("calcFruit", () =>
{
    ret = calcFruit(3);
    expect(ret).toBe(Math.round(3 * 0.7));
})
