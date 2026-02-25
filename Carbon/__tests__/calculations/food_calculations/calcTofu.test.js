import calcTofu from "../../../calculations/food_calculations/calcTofu.js"

test("calcTofu", () =>
{
    ret = calcTofu(3);
    expect(ret).toBe(Math.round(3 * 3.0));
})
