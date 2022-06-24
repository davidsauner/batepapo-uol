/*let nome = prompt("qual seu nome")
let nomedeentrada = {name:nome}


function peganome(){
    let chat = document.querySelector(".chat")
    chat.innerHTML += `<div class="mensagemstatus msg">
     ${nomedeentrada.name}  :</div>`
    
}*/

//LISTA DE MENSAGEM
let objt = [];
//PEGA MENSAGEM DO SERVIODOR



     const promessamensagem = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
      );



promessamensagem.then(mensagemserver);
console.log(promessamensagem);
function mensagemserver(resposta) {
    
  console.log(resposta.data);
  objt = resposta.data;
  colocaMsg();
  focarNaUltimaMensagem()
}

function colocaMsg() {
  let chat = document.querySelector(".chat");
  for (let i = 0; i < objt.length; i++) {
    if (objt[i].type === "status") {
      chat.innerHTML += `<li class="mensagemstatus msg">
             <span>${objt[i].time}</span> ${objt[i].from}  <span class="text">${objt[i].text}</span>:</li>`;
    }
    if (objt[i].type === "message") {
        chat.innerHTML += `<li class="mensagemtodos msg">
               <span>${objt[i].time}</span> ${objt[i].from}  <span class="text">${objt[i].text}</span>:</li>`;
      }
      if (objt[i].type === "private_message") {
        chat.innerHTML += `<li class="mensagemprivada msg">
               <span>${objt[i].time}</span> ${objt[i].from}  <span class="text">${objt[i].text}</span>:</li>`;
      }

  }
}
function focarNaUltimaMensagem(){
    let chat = document.querySelector(".chat");
    let ultimamensagem = chat.lastElementChild
    ultimamensagem.scrollIntoView()


}

/*[{from:"João",to:"Todos",text:"entra na sala...",time: "08:01:17"},
 {from:"carol",to:"Todos",text:"entra na sala...",time: "08:05:17",},
 {from:"paulo",to:"Todos",text:"entra na sala...",time: "08:09:17",},
 {from:"gilberto",to:"Todos",text:"entra na sala...",time: "08:11:17",}]*/
