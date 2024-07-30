"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '7054304489:AAHJT5fQQ7s9U88j3tHmSwuuvfo3KTE_Mh4';
const TELEGRAM_CHAT_ID = '@ModelingSite';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
   event.preventDefault();

   const form = event.target;
   const formBtn = document.querySelector(".send_btn button");
   const formSendResult = document.querySelector(".form__send-result");
   formSendResult.textContent = "";

   const { email, message } = Object.fromEntries(new FormData(form).entries());
   const text = `Message from: ${email}\nText: ${message}`;

   try {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
        })
      });

      if (response.ok) {
        formSendResult.textContent = 'Thank you for getting in touch. I will respond to you very soon';
        form.reset();
      } else {
        throw new Error(response.statusText);
      }

   } catch(error){
        console.error(error);
        formSendResult.textContent = 'This message can not be sent right now. Please try again later';
        formSendResult.computedStyleMap.color = "red";
   }
}