import calcBottles from "../../calculations/calcBottles.js"

test("calcBottles", () =>
{
    ret = calcBottles(30);
    expect(ret).toBe(Math.round(.343 * 30));
});