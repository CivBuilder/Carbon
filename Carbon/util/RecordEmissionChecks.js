import { Alert } from "react-native";
// all the regex for record emissions and alerts if needed
export function validateElectricityEntry(entry) {
    const regex = /^(\d*(\.\d+)?|100(\.0+)?)$/;
    return regex.test(entry);
}

export function validateFoodEntry(beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption) {
    const regex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/;
    const beef = regex.test(beefConsumption);
    const pork = regex.test(porkConsumption);
    const cheese = regex.test(cheeseConsumption);
    const poultry = regex.test(poultryConsumption);
    return beef && pork && cheese && poultry;
}

function validateTransportationEntry(entry) {
    const regex = /^(4000(\.0{1,3})?|[1-3]\d{0,3}(\.\d{1,3})?|\d*(\.\d{1,3})?|0(\.\d{1,3})?)$/; // 0-4000
    return regex.test(entry);
}

export function validateRecyclingEntry(paperAmount, plasticAmount, glassAmount, metalAmount) {
    const regex = /^(50(\.0+)?|[0-4]?\d*(\.\d+)?|0(\.\d+)?)$/;
    const paper = regex.test(paperAmount);
    const plastic = regex.test(plasticAmount);
    const glass = regex.test(glassAmount);
    const metal = regex.test(metalAmount);
    return paper && plastic && glass && metal;
}

export function validateTransportationScreen(entry, selectedValue) {
    let noErrors = true;
    noErrors = validateTransportationEntry(entry);

    if (selectedValue === null) {
        noErrors = false;
    }

    return noErrors;
}

export function getTransportationError(entry, selectedValue) {
    let errors = [];
    if (selectedValue === null) {
        errors.push("Please select a mode of transportation.");
    }
    const goodEntry = validateTransportationEntry(entry);
    if (!goodEntry) {
        errors.push("Miles traveled must be between 0 and 4000.")
    }
    const errorMessage = errors.join("\n");

    alert(errorMessage);
}