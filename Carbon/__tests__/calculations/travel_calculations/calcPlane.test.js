import calcPlane from "../../../calculations/travel_calculations/calcPlane.js"

test("calcPlane", () =>
{
    ret = calcPlane(355);
    expect(ret).toBe(Math.round(53 * 355));
});