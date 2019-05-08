/***********
* Client js*
***********/


const weatherForm = document.getElementById('form');
const search = document.querySelector('input');
const messageError = document.getElementById('error');
const messageInfo = document.getElementById('message');

const getWeather = (adress) => {

    if(!adress){
        messageInfo.textContent = '';
        return messageError.textContent = 'Please enter adress';

    }

    messageInfo.textContent = 'loading...';
    messageError.textContent = '';

    fetch(`http://localhost:3000/weather?adress=${adress}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageInfo.textContent = '';
                messageError.textContent = data.error;
            } else {
                messageError.textContent = '';
                messageInfo.textContent = data.forecast
            }
        })
    });

};


weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const location = search.value;
    getWeather(location)
});