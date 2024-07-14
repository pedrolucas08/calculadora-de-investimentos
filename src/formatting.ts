document.addEventListener("DOMContentLoaded", () => {
  const valorInicial = document.getElementById(
    "valor-inicial"
  ) as HTMLInputElement;
  const deposito = document.getElementById("deposito") as HTMLInputElement;
  const juros = document.getElementById("juros") as HTMLInputElement;
  const tempo = document.getElementById("tempo") as HTMLInputElement;

  type myFunction = (value: string) => string;

  function formattingFields(callBack: myFunction) {
    return function (e: Event) {
      const target = e.target as HTMLInputElement;
      let value = target.value;
      value = value.replace(/\D/g, "");
      value = callBack(value);
      target.value = value;
    };
  }

  function formatTime(e: Event) {
    const target = e.target as HTMLInputElement;
    let value = target.value;
    value = value.replace(/\D/g, "");
    target.value = value;
  }

  function formatCurrency(value: string): string {
    if (value.length === 0) {
      return "R$0,00";
    }

    let number: number = parseFloat(value) / 100;

    return (
      "R$" +
      number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  function formatPercentage(value: string): string {
    if (value.length === 0) {
      return "0";
    }

    let number: number = parseFloat(value) / 100;

    const parts = number.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Milhares com vírgula
    return parts.join(".");
  }

  valorInicial.addEventListener("input", formattingFields(formatCurrency));
  deposito.addEventListener("input", formattingFields(formatCurrency));
  juros.addEventListener("input", formattingFields(formatPercentage));
  tempo.addEventListener("input", formatTime);
});
