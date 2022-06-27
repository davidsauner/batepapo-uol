let nome = prompt("qual seu nome");
let nomedeentrada = { name: nome };
console.log(nomedeentrada);
//Função de login ainda cru
peganome();
function peganome() {
  let pedidonome = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    nomedeentrada
  );
  pedidonome.then(nomeAceito);
  pedidonome.catch(nomeRecusado);
  console.log(pedidonome);
}
function nomeAceito() {
  console.log("deu boa");
}
function nomeRecusado() {
  console.log("deu ruim");
  alert("nome ja utilizado pf tente outro");
  location.reload();
}

//LISTA DE MENSAGEM
let objt = [];
//PEGA MENSAGEM DO SERVIODOR
attmsg();
setInterval(attmsg, 3000);
function attmsg() {
  const promessamensagem = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );

  promessamensagem.then(mensagemserver);
  function mensagemserver(resposta) {
    objt = resposta.data;
    colocaMsg();
    focarNaUltimaMensagem();
  }
}

//MANTER A USUARIO CONECTADO, INTAVALO 5 SEC!
setInterval(manterConectado, 5000);
function manterConectado() {
  let conexao = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    nomedeentrada
  );
  conexao.then(conexaopositvo);
  conexao.catch(conexainegativo);
}
function conexaopositvo() {
  console.log("nome atualizado certo");
}
function conexainegativo() {
  alert("Você foi desconectado por inatividade !!");
  console.log("nome quitou F");
  location.reload();
}

//COLOCA MENSAGEM DO SERVIDOR
function colocaMsg() {
  let chat = document.querySelector(".chat");
  for (let i = 0; i < objt.length; i++) {
    if (objt[i].type === "status") {
      chat.innerHTML += `<li class="mensagemstatus msg">
             <span class="hora">(${objt[i].time})</span> <span class="usuario">${objt[i].from}:</span>  <span class="text">${objt[i].text}</span></li>`;
    }
    if (objt[i].type === "message") {
      chat.innerHTML += `<li class="mensagemtodos msg">
      <span class="hora">(${objt[i].time})</span> <span class="usuario">${objt[i].from}:</span>  <span class="text">${objt[i].text}</span></li>`;
    }
    if (objt[i].type === "private_message" && objt[i].to === nomedeentrada) {
      chat.innerHTML += `<li class="mensagemprivada msg">
      <span class="hora">(${objt[i].time})</span> <span class="usuario">${objt[i].from}</span>  <span class="text">${objt[i].text}</span></li>`;
    }
  }
}
function focarNaUltimaMensagem() {
  let chat = document.querySelector(".chat");
  let ultimamensagem = chat.lastElementChild;
  ultimamensagem.scrollIntoView();
}
// FUNÇÂO DE ENVIAR A MSG E PEGAR DO CORPO DO INPUT
let escreve = "";
function enviarMsg() {
  console.log("chamou enviarmsg");
  escreve = document.querySelector(".corpomsg").value;
  let objtmsg = {
    from: nome,
    to: "Todos",
    text: escreve,
    type: "message",
  };
  console.log(objtmsg);
  let enviando = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    objtmsg
  );
  enviando.then(envioumsg);
  enviando.catch(naoenviou);
  escreve = document.querySelector(".corpomsg").value = "";
}

document.addEventListener("keypress", function apertouenter(e) {
  if (e.key === "Enter") {
    enviarMsg();
  }
});

function envioumsg() {
  attmsg();
}
function naoenviou() {
  alert("Erro ao enviar a mensagem, por gentileza entrar novamente!");
  location.reload();
}
