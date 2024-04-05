import bot from "./assets/bot.svg"
import user from "./aassets/user.svg"


const form = document.querySelector("form")
const chatContainer = document.querySelector("#chat_container")


let loadInterval;

function loader(element){
      element.textContent = "";
      loadInterval = setInterval(()=>{
        element.textContent += ".";

        if(element.textContent==="...."){
          element.textContent="";
        }
      },300)

}


// stream the response - line by line

function typeText(element,text){
  let index =0;
  let interval = setInterval(()=>{
    if(index<text.length){
      element.innerHTML += text.charAt(index)
      index++
    }else{
      clearInterval(interval)
    }
  },20)

}


// unique id for every single response
function generateUniqueID(){

  const timeStamp = Date.now()
  const randomNumber = Math.random()
  const hexaDecimal = randomNumber.toString(16)


  return `id-${timeStamp}-${hexaDecimal}`
}


// chat stripe

function chatStripe(isAi, value, uniqueId){
  return (`
        <div class="wrapper ${isAi}" >
            <div class="profile">
                <img src="${isAi?bot:user} alt="${isAi?"bot":"user"}"/> 
            </div>

            <div class="message" id=${uniqueId}>${value}</div>
        </div>
  `)
}



// handle submit buton

const handleSubmit = async (e)=>{

  // default browser behaviour is to reload the browser while submit the form 
  e.preventDefault()
  const data = new FormData(form)

  // generate users chatStripe
  chatContainer.innerHTML +=chatStripe(false, data.get("prompt"))
  form.reset()

  // bots chat stripe
  const uniqueId = generateUniqueID()
 
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)



  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId)

  loader(messageDiv)

}


form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e)=>{
  if(e.keyCode===13){
    handleSubmit(e)
  }
})