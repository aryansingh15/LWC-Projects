import { LightningElement } from "lwc";
import { countryCodeList } from "c/countryCodeList";
import currencyConverterAssets from "@salesforce/resourceUrl/currencyConverterAssets";

export default class CurrencyConverter extends LightningElement {
  currentImage =
    currencyConverterAssets + "/currencyConverterAssets/currency.svg";
  countryList = countryCodeList;
  countryFrom = "USD";
  countryTo = "AUD";
  amount = "";
  result;
  error;

  handleChange(event) {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
  }
  submitHandler(event) {
    event.preventDefault();
    this.convert();
  }
  async convert() {
    const API_KEY = "46c1b792f58cab920b120676";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`;
    try {
      const data = await fetch(API_URL);
      const jsonData = await data.json();

      this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2);
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}
