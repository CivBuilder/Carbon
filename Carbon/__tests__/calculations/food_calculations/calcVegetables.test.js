import calcVegetables from "../../../calculations/food_calculations/calcVegetables.js"

test("calcVegetables", () =>
{
    ret = calcVegetables(3);
    expect(ret).toBe(Math.round(3 * 0.5));
})
