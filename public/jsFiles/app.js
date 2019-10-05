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
        fetch('/weather?address='+place).then((response) => {
        response.json().then((data) => {
            if(data.Error){
                messageOne.textContent = data.Error;
            }
            else{
                messageOne.textContent = data.place;
                messageTwo.textContent = data.summary + "\r\nCurrent temperature is " + data.temperature + " degrees.\r\nProbability of rain is "+data.rainProbability+"%.\r\nTemperature High : "+data.highTemp+"\r\nTemperature Low : "+data.lowTemp;
                messageTwo.setAttribute('style','white-space: pre;');
            }
        })
    });
})
