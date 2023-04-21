import calcElecCar from "../../../calculations/travel_calculations/calcElecCar.js"

test("calcElecCar", () =>
{
    ret = calcElecCar(30);
    expect(ret).toBe(Math.round(0.771618 * 30));
});