import calcPotatoes from "../../../calculations/food_calculations/calcPotatoes.js"

test("calcPotatoes", () =>
{
    ret = calcPotatoes(3);
    expect(ret).toBe(Math.round(3 * 0.5));
})
