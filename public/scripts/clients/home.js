'use strict'

const slider = document.querySelector("#sliderNosotros");
let sliderSection = document.querySelectorAll(".nosotros__img");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
	let sliderSectionFirst = document.querySelectorAll(".nosotros__img")[0];
	slider.style.marginLeft = "-200%";
	slider.style.transition = "all 0.5s";
	setTimeout( function(){
		slider.style.transition = "none";
		slider.insertAdjacentElement('beforeend', sliderSectionFirst);
		slider.style.marginLeft = "-100%";
	}, 500);
}

setInterval(function(){
	Next();
}, 5000);

// Contact Send
let sendedAvailable = true;

const sendMessageForm = () => {
    contactMessageAdv.style.display = 'none';

    if(!contactName.value || contactName.value.length < 5){
        contactMessageAdv.innerHTML = 'Error! por favor ingrese su nombre';
        contactMessageAdv.style.display = 'block';
        return;
    }

    let emailVerification = /\S+@\S+\.\S+/;
    if(!contactEmail.value || !emailVerification.test(contactEmail.value)){
        contactMessageAdv.innerHTML = 'Error! por favor ingrese su email';
        contactMessageAdv.style.display = 'block';
        return;
    }

    if(!contactQuery.value || contactQuery.value.length <= 5){
        contactMessageAdv.innerHTML = 'Error! por favor ingrese un mensaje';
        contactMessageAdv.style.display = 'block';
        return;
    }

    const arrQuerySend = {
        name: contactName.value,
        email: contactEmail.value,
        phone: contactPhone.value,
        message: contactQuery.value,
    }

    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arrQuerySend)
    };

    const url = '/contact/message';

    if(sendedAvailable){
        sendedAvailable = false;
        contactMessageBtn.innerHTML = 'Enviando ...';

        fetch(url, requestOptions)
        .then(function (response) {
            if (response.ok) {
                response.json().then((data) => {
                    sendedAvailable = true;
                    contactMessageBtn.innerHTML = 'Enviar Consulta';

                    if(data.response){
                        querySuccessContainer.style.transform = 'scale(1)';

                        contactName.value = '';
                        contactEmail.value = '';
                        contactPhone.value = '';
                        contactQuery.value = '';

                        setTimeout(() => {
                            querySuccessContainer.style.transform = 'scale(0)';
                        }, 3000)
                    }
                    else {
                        contactMessageAdv.innerHTML = 'Disculpe! no se ha podido enviar el mensaje';
                        contactMessageAdv.style.display = 'block';
                    }
                });
            }
            else {
                console.log(error);
                sendedAvailable = true;
                contactMessageBtn.innerHTML = 'Enviar Consulta';
                contactMessageAdv.innerHTML = 'Disculpe! ha ocurrido un error inesperado';
                contactMessageAdv.style.display = 'block';
            }
        })
        .catch(function (error) {
            console.log(error);
            sendedAvailable = true;
            contactMessageBtn.innerHTML = 'Enviar Consulta';
            contactMessageAdv.innerHTML = 'Disculpe! ha ocurrido un error inesperado';
            contactMessageAdv.style.display = 'block';
        });
    }
}

// HOME
const arrServicesLinks = document.querySelectorAll('.servicios__item');

arrServicesLinks.forEach((container) => {
	container.addEventListener('click', function(event) {
		if(event.target.classList.contains('servicios__item-wsp') ||
		event.target.classList.contains('servicios__item-icon')){
			event.preventDefault();
            let textService = event.target.dataset.id == 1 ? 'el%20servicio%20de%20laboratorio%20' :
            event.target.dataset.id == 2 ? 'el%20servicio%20de%20ingenieria%20y%20consultoria%20' :
            'el%20servicio%20de%20innovacion%20y%20desarrollo%20';

            if(window.innerWidth <= 600 || screen.width <= 600) {
				window.open('https://wa.me/5493415637696?text=Hola,%20queria%20consultar%20sobre%20' + textService, '_blank');
			} else {
				window.open('https://wa.me/5493415637696?text=Hola,%20queria%20consultar%20sobre%20' + textService, '_blank');
			}
		}
	});
});
