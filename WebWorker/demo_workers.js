// Function process some thing and then callback to main.js
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();


// Assign function to onmessage to recieve data
onmessage = function(e) {
  console.log('Worker: Message received from main script');
  console.log(e.data, ': this is data from main.js')
}