const serverIP = 'https://codexcorrector.onrender.com';

const form = document.querySelector('form');
const responseArea = document.getElementById('responseArea');
const button = document.getElementById('submitButton');

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

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  button.disabled = true
  let buttonText = button.innerHTML

  if (data.get('prompt') !== ""){
    button.innerHTML = ""
    responseArea.innerHTML = "Codex sta pensando ..."
    const response = await fetch(serverIP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt')
      })
    })
  
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