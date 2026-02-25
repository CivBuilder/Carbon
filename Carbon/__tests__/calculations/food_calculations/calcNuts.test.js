import calcNuts from "../../../calculations/food_calculations/calcNuts.js"

test("calcNuts", () =>
{
    ret = calcNuts(3);
    expect(ret).toBe(Math.round(3 * 0.3));
})
