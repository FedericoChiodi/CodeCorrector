const serverIP = 'http://localhost:5000';

const form = document.querySelector('form');
const responseArea = document.getElementById('responseArea');
const button = document.getElementById('submitButton');

/* 
* Questa funzione si occupa di scrivere la risposta ricevuta contenente il risultato
* dell'elaborazione da parte del modello in stile chat, quindi scrivendo un carattere
* per volta seguito da un breve delay.
* 'element' contiene l'elemento dove sarà scritto il testo.
* 'text' contiene il testo da scrivere.
*/
function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } 
    else{
      clearInterval(interval)
    }
  }, 10)
}

/*
* Questa funzione gestisce le azioni da compiere quando viene inviato il form che l'utente
* ha riempito con il codice da correggere.
*/
const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  button.disabled = true
  let buttonText = button.innerHTML

  /*
  * Se il prompt non è vuoto viene impostato un messaggio di attesa nella textarea dedicata
  * a contenere la risposta del modello e si invia al server, con metodo POST, un oggetto
  * JSON contenente il prompt dell'utente codificato.
  */
  if (data.get('prompt') !== ""){
    button.innerHTML = ""
    responseArea.innerHTML = "CodeCorrector sta pensando ..."
    const response = await fetch(serverIP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt')
      })
    })
    /*
    * Se la risposta del server contiene uno status code positivo
    * la inizio a scrivere a schermo, altrimenti stampo un messaggio di errore.
    */
    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim()
      responseArea.innerHTML = ""
      typeText(responseArea, parsedData)
    }
    else{
      const err = await response.text()
      responseArea.innerHTML = ""
      typeText(responseArea, "Errore interno, prova di nuovo!")
    }
  }
  else {
    responseArea.innerHTML = ""
  }

  button.disabled = false
  button.innerHTML = buttonText
}

form.addEventListener('submit', handleSubmit)