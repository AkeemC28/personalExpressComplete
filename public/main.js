const serverURL = 'http://localhost:2000'; 

var trash = document.getElementsByClassName("fa-trash");
var edits = document.querySelectorAll("editButton");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const flavor1 = this.parentNode.parentNode.childNodes[1].innerText;
    const flavor2 = this.parentNode.parentNode.childNodes[3].innerText;
    const add = this.parentNode.parentNode.childNodes[5].innerText;
    fetch('flavors', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'flavor1': flavor1,
        'flavor2': flavor2,
        'add': add,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
Array.from(edits).forEach(function(element) {
  element.addEventListener('click', function(){
    // const flavor1 = this.parentNode.parentNode.childNodes[1].innerText;
    // const flavor2 = this.parentNode.parentNode.childNodes[3].innerText;
    const add = this.parentNode.parentNode.childNodes[5].innerText;
    fetch('flavors', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'add': add,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
