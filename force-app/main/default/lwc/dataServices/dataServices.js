import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DataServices extends LightningElement {
  handleSuccess(event) {
    const toastEvent = new ShowToastEvent({
      title: "Success",
      message: "Contact created with ID: " + event.detail.id,
      variant: "success"
    });
    this.dispatchEvent(toastEvent);

    // Clear the form fields by resetting them
    this.resetForm();

    // Refresh the page
    //window.location.reload();
  }
  resetForm() {
    // Find all the input fields and reset them
    const inputFields = this.template.querySelectorAll("lightning-input-field");
    if (inputFields) {
      inputFields.forEach((field) => {
        field.reset();
      });
    }
  }
}
