import { LightningElement } from "lwc";

export default class BmiCalculator extends LightningElement {
  height = "";
  weight = "";
  bmiValue = "";
  result = "";

  inputHandler(event) {
    const { name, value } = event.target;

    if (name === "height") {
      this.height = value;
    }
    if (name === "weight") {
      this.weight = value;
    }
    //this[name] = value;
  }

  submitHandler(event) {
    event.preventDefault();
    console.log("height:", this.height);
    console.log("weight:", this.weight);
    this.calculate();
  }

  calculate() {
    let heights = Number(this.height) / 100;
    let bmi = Number(this.weight) / (heights * heights);

    this.bmiValue = Number(bmi.toFixed(2));
    if (this.bmiValue < 18.5) {
      this.result = "UnderWeight";
    } else if (this.bmiValue >= 18.5 && this.bmiValue < 25) {
      this.result = "Healthy";
    } else if (this.bmiValue >= 25 && this.bmiValue < 30) {
      this.result = "OverWeight";
    } else {
      this.result = "Obese";
    }

    console.log("BMI:", bmi.toFixed(2));
    console.log("result", this.result);
  }
  recalculate() {
    this.height = "";
    this.weight = "";
    this.bmiValue = "";
    this.result = "";
  }
}
