import calcPublic from "../../../calculations/travel_calculations/calcPublic.js"


describe('calcPublic', () => {
    it("calcPublic bus case", () => {
        ret = calcPublic(56, "bus");
        expect(ret).equalsTo(Math.round(56 * 0.659182));

    });
    it("calcPublic train case", () => {
        ret = calcPublic(68, "train");
        expect(ret).equalsTo(Math.round(68 * 0.390218));
    });
});