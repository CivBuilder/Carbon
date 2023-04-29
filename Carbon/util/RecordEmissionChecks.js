// all the regex for record emissions and alerts if needed
export function validateElectricityEntry(entry) {
    const regex = /^(\d{1,2}(\.\d+)?|100(\.0+)?)$/;
    return regex.test(entry);
}

export function validateFoodEntry(beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption) {
    const regex = /^(10(\.0+)?|[0-9](\.\d+)?|0)$/;
    const beef = regex.test(beefConsumption);
    const pork = regex.test(porkConsumption);
    const cheese = regex.test(cheeseConsumption);
    const poultry = regex.test(poultryConsumption);
    return beef && pork && cheese && poultry;
}

export function validateTransportationEntry(entry) {
    const regex = /^(4000(\.0{1,3})?|[1-3]\d{0,3}(\.\d{1,3})?|\d{1,2}(\.\d{1,3})?|0(\.\d{1,3})?)$/; // 0-4000
    return regex.test(entry);
}

export function validateRecyclingEntry(paperAmount, plasticAmount, glassAmount, metalAmount) {
    const regex = /^(50(\.0+)?|[0-4]?\d(\.\d+)?|0(\.\d+)?)$/;
    const paper = regex.test(paperAmount);
    const plastic = regex.test(plasticAmount);
    const glass = regex.test(glassAmount);
    const metal = regex.test(metalAmount);
    return paper && plastic && glass && metal;
}