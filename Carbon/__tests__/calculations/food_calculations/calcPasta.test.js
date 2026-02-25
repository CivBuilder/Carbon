import calcPasta from "../../../calculations/food_calculations/calcPasta.js"

test("calcPasta", () =>
{
    ret = calcPasta(3);
    expect(ret).toBe(Math.round(3 * 1.4));
})
