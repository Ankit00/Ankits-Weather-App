console.log('Client Side JavaScript Code');
const forecastForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

messageOne.textContent = '';
messageTwo.textContent = '';

forecastForm.addEventListener('submit', (e) => {
    messageTwo.textContent = '';
    e.preventDefault();
    const place = address.value;
    messageOne.textContent = "Loading..."
        fetch('http://localhost:3000/weather?address='+place).then((response) => {
        response.json().then((data) => {
            if(data.Error){
                messageOne.textContent = data.Error;
            }
            else{
                messageOne.textContent = data.place;
                messageTwo.textContent = data.summary + " Temperature is " + data.temperature;
            }
        })
    });
})
