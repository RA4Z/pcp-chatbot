export function getIp(callback) {
    function response() {
      const request = new XMLHttpRequest();
      request.open("GET", "https://api.ipify.org?format=json");
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.response);
          callback(data.ip);
        } else {
          callback(false);
        }
      };
      request.onerror = () => {
        callback(false);
      };
      request.send();
    }
  
    if (/^(interactive|complete)$/i.test(document.readyState)) {
      response();
    } else {
      document.addEventListener('DOMContentLoaded', response);
    }
  }
  