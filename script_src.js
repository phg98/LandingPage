function formSubmit(event) {
  var url = "http://127.0.0.1:3000/users";
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.onload = function () { // request successful
    // we can use server response to our request now
    console.log(request.responseText);
  };

  request.onerror = function () {
    // request failed
  };

  //var formData = new FormData(event.target);
  var formData = {};
  formData['serverName'] = document.getElementById('serverName').value;
  formData['timeout'] = document.getElementById('timeout').value
  formData['phoneNumber'] = document.getElementById('phoneNumber').value

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData)); // create FormData from form that triggered event
  event.preventDefault();
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId) {
  document.getElementById(formId).addEventListener("submit", formSubmit);
}

attachFormSubmitEvent('AddServer')