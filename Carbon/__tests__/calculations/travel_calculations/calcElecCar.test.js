import calcElecCar from "../../../calculations/travel_calculations/calcElecCar.js"

test("calcElecCar", () =>
{
    ret = calcElecCar(30);
    expect(ret).equalsTo(Math.round(0.771618 * 30));
});