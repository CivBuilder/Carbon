import calcCar from "../../../calculations/travel_calculations/calcCar.js"

describe('calcCar', () => {
    it("calcCar default case", () => {
        ret = calcCar(30, 0);
        expect(ret).equalsTo(Math.round(19.59248 * (30 / 24.2)));

    });
    it("caclCar choosen case", () => {
        ret = calcCar(36, 18);
        expect(ret).toBe(Math.round(19.59248 * (36 / 18)));
    });
});