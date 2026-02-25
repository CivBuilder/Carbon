import calcLentils from "../../../calculations/food_calculations/calcLentils.js"

test("calcLentils", () =>
{
    ret = calcLentils(3);
    expect(ret).toBe(Math.round(3 * 0.9));
})
