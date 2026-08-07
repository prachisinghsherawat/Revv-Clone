// Demo checkout. There is no payment gateway behind this — the card and OTP
// checks below are format validation only, and the "OTP" is always 1234.

var DEMO_OTP = "1234";

var otpDiv = document.querySelector(".otpDiv"); // hidden by checkout.css

document.querySelector("form").addEventListener("submit", paymentFunction);

function paymentFunction(e) {
  e.preventDefault();

  var cc = document.getElementById("cc").value.trim();
  var cvv = document.getElementById("cvv").value.trim();
  var month = document.getElementById("expMonth").value;
  var year = document.getElementById("expYear").value;

  if (cc.length !== 16) {
    alert("Card number must be 16 digits");
    return;
  }
  if (cvv.length !== 3) {
    alert("CVV must be 3 digits");
    return;
  }
  if (!month || !year) {
    alert("Please pick the card's expiry month and year");
    return;
  }

  alert('Enter Otp : "' + DEMO_OTP + '"');
  otpDiv.style.display = "flex";
  document.getElementById("otp").focus();
}

// Previously a second listener redirected after 3s no matter what was typed,
// so a wrong OTP still reached the success page. One handler now owns both the
// check and the redirect.
document.getElementById("otpButton").addEventListener("click", otpFunction);

function otpFunction(e) {
  e.preventDefault();

  if (document.getElementById("otp").value.trim() !== DEMO_OTP) {
    alert("Invalid Otp");
    return;
  }

  alert("Payment Successful. Thank you for booking with Revv!");
  window.location.href = "./payments.html";
}
