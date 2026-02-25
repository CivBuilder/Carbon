import { Alert } from "react-native";
// all the regex for record emissions and alerts if needed
export function validateElectricityEntry(entry) {
    const electricityNumber = Number(entry);
    const regex = /^(100(\.00?)?|\d{1,2}(\.\d{1,2})?|0(\.\d{1,2})?)$/;
    return regex.test(electricityNumber);
}

export function validateFoodEntry(beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption, riceConsumption = 0, tofuConsumption = 0, beansConsumption = 0, lentilsConsumption = 0, vegetablesConsumption = 0, fruitConsumption = 0, nutsConsumption = 0, breadConsumption = 0, potatoesConsumption = 0, pastaConsumption = 0) {
    const regex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/;
    const allValues = [
        beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption,
        riceConsumption, tofuConsumption, beansConsumption, lentilsConsumption,
        vegetablesConsumption, fruitConsumption, nutsConsumption, breadConsumption,
        potatoesConsumption, pastaConsumption
    ];

    return allValues.every(val => regex.test(Number(val)));
}

function validateTransportationEntry(entry) {
    const transportationNumber = Number(entry);
    const regex = /^(4000(\.00?)?|[0-3]?\d{1,3}(\.\d{1,2})?|0(\.\d{1,2})?)$/; // 0-4000
    return regex.test(transportationNumber);
}

export function validateRecyclingEntry(paperAmount, plasticAmount, glassAmount, metalAmount) {
    const paperNumber = Number(paperAmount);
    const plasticNumber = Number(plasticAmount);
    const glassNumber = Number(glassAmount);
    const metalNumber = Number(metalAmount);
    const regex = /^(50(\.00?)?|[0-4]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/;
    const paper = regex.test(paperNumber);
    const plastic = regex.test(plasticNumber);
    const glass = regex.test(glassNumber);
    const metal = regex.test(metalNumber);
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