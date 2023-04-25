import homeElec from "../../calculations/home_calculations/homeElec.js"

test("homeElec", () =>
{
    ret = homeElec(344);
    expect(ret).toBe(Math.round(884.2 * 344));
});