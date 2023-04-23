import calcCheese from "../../../calculations/food_calculations/calcCheese.js"

test("calcCheese", async() =>
{
    ret = await calcCheese(3)
    expect(ret).toBe(Math.round(3 * 16.6792));
})
