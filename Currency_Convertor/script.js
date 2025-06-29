const API_KEY = "8db1179e4c434d4fbed657682534a36f";
const BASE_URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`;

const dropdowns = document.querySelectorAll(".container2 select");
const btn = document.querySelector("button");
const toCurr = document.querySelector("#to");
const msg = document.querySelector("#para3");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".currency-container input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  let code = toCurr.value;
  const URL = `${BASE_URL}&symbols=${code}&base=USD`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[code];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} USD = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector(".select-container img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  msg.classList.remove("hidden");
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

toCurr.addEventListener("change", () => {
  updateExchangeRate();
});
