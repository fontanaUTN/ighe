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

contactMapa.innerHTML = '<iframe class="contacto__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.4140174316994!2d-59.6745804!3d-29.175577299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x944eb009ffb10c05%3A0x3f8c373619b3f398!2sHormax%20Hormigones!5e1!3m2!1ses-419!2sar!4v1751407374866!5m2!1ses-419!2sar" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';