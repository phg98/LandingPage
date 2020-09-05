var url;
console.log(window.location.hostname)
if (window.location.hostname.includes('localhost')) {
  url = "http://127.0.0.1:3000";
} 
else {
  //url = "http://api.myserverdown.com:3000"
  url = "https://hb-api-phg98.herokuapp.com"
}
console.log('API server is ' + url);

function formSubmit(event) {
  
  event.preventDefault();
  var request = new XMLHttpRequest();
  request.open('POST', url+'/users', true);
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
  formData['email'] = document.getElementById('email').value

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData)); // create FormData from form that triggered event
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId) {
  document.getElementById(formId).addEventListener("submit", formSubmit);
}

attachFormSubmitEvent('AddServer')

function SearchServer() {
  var serverName = document.getElementById('serverName').value
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {        
        document.getElementById('serverName').value = JSON.parse(request.responseText)[0].serverName || ''
        document.getElementById('timeout').value = JSON.parse(request.responseText)[0].timeout || ''
        document.getElementById('phoneNumber').value = JSON.parse(request.responseText)[0].phoneNumber || ''
        document.getElementById('email').value = JSON.parse(request.responseText)[0].email || ''
      } else if (request.status === 429) {
        alert('요청이 너무 많으니 잠시후에 다시 시도해 주세요.');
      }
      else {
        alert('검색에 실패하였습니다.');
      }
    }
  }
  request.open('GET', url+'/users'+'/'+serverName);
  request.onload = function () { // request successful
    // we can use server response to our request now
    console.log(request.responseText);
  };

  request.onerror = function () {
    // request failed
  };

  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
  event.preventDefault();
} 

function PingServer() {
  var serverName = document.getElementById('serverName').value
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {        
        if (JSON.parse(request.responseText).message === "Got ping")
          alert(`전송하였습니다.`)
        else
          alert('전송결과 실패입니다.')
      } else {
        alert('전송에 실패하였습니다.');
      }
    }
  }
  request.open('GET', url+'/ping'+'/'+serverName);
  request.onload = function () { // request successful
    // we can use server response to our request now
    console.log(request.responseText);
  };

  request.onerror = function () {
    // request failed
  };

  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
  event.preventDefault();
} 