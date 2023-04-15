import homeElec from "../../calculations/homeElec.js"

test("homeElec", () =>
{
    ret = homeElec(344);
    expect(ret).equalsTo(Math.round(884.2 * 344));
});