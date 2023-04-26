import calcBottles from "../../calculations/calcBottles.js"

test("calcBottles", () =>
{
    ret = calcBottles(30);
    expect(ret).equalsTo(Math.round(.343 * 30));
});