"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const valorInicial = document.getElementById("valor-inicial");
    const deposito = document.getElementById("deposito");
    const juros = document.getElementById("juros");
    const tempo = document.getElementById("tempo");
    function formattingFields(callBack) {
        return function (e) {
            const target = e.target;
            let value = target.value;
            value = value.replace(/\D/g, "");
            value = callBack(value);
            target.value = value;
        };
    }
    function formatTime(e) {
        const target = e.target;
        let value = target.value;
        value = value.replace(/\D/g, "");
        target.value = value;
    }
    function formatCurrency(value) {
        if (value.length === 0) {
            return "R$0,00";
        }
        let number = parseFloat(value) / 100;
        return ("R$" +
            number.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }));
    }
    function formatPercentage(value) {
        if (value.length === 0) {
            return "0";
        }
        let number = parseFloat(value) / 100;
        const parts = number.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Milhares com vírgula
        return parts.join(".");
    }
    valorInicial.addEventListener("input", formattingFields(formatCurrency));
    deposito.addEventListener("input", formattingFields(formatCurrency));
    juros.addEventListener("input", formattingFields(formatPercentage));
    tempo.addEventListener("input", formatTime);
});
