"use strict";
const initial = document.getElementById("valor-inicial");
const monthly = document.getElementById("deposito");
const fees = document.getElementById("juros");
const time = document.getElementById("tempo");
const button = document.getElementById("button");
const result = document.getElementById("balance");
button.addEventListener("click", () => {
    let formattedInitial = transformStringToNumber(initial);
    let formattedMonthly = transformStringToNumber(monthly);
    let formattedFees = transformStringToNumber(fees);
    let formattedTime = parseInt(time.value);
    if (isNaN(formattedInitial) ||
        isNaN(formattedMonthly) ||
        isNaN(formattedFees) ||
        isNaN(formattedTime)) {
        result.textContent = "R$0,00";
        return;
    }
    let number = calculate(formattedInitial, formattedMonthly, formattedFees, formattedTime);
    result.textContent = formatCurrency(number);
});
function transformStringToNumber(input) {
    let value = input.value;
    let formattedValue;
    if (value.includes("R$")) {
        formattedValue = value.replace(/[R$]/g, "").replace(/\./g, "");
        formattedValue = formattedValue.replace(",", ".");
    }
    else {
        formattedValue = value.replace(/,/g, "");
    }
    return parseFloat(formattedValue);
}
function calculate(initial, monthly, fees, time) {
    let monthlyRate = fees / 100 / 12;
    let balance = initial;
    for (let i = 0; i < time; i++) {
        balance = (balance + monthly) * (monthlyRate + 1);
    }
    return balance;
}
function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
