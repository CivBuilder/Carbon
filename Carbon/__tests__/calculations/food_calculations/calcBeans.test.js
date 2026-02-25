import calcBeans from "../../../calculations/food_calculations/calcBeans.js"

test("calcBeans", () =>
{
    ret = calcBeans(3);
    expect(ret).toBe(Math.round(3 * 1.6));
})
