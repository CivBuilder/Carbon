import calcPlane from "../../../calculations/travel_calculations/calcPlane.js"

test("calcPlane", () =>
{
    ret = calcPlane(355);
    expect(ret).equalsTo(Math.round(53 * 355));
});