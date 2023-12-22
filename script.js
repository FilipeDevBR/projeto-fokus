const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPause = document.querySelector("#start-pause")
const startPauseBt = document.querySelector("#start-pause span")
const imagemBotao = document.querySelector(".app__card-primary-butto-icon")
const timer = document.querySelector(".app__card-timer")

const startAudio = new Audio('./sons/play.wav')
const pauseAudio = new Audio('./sons/pause.mp3')
const endAudio = new Audio('./sons/beep.mp3')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    temporizador()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        endAudio.play()
        alert("Tempo Finalizado!")

        return;
    }
    tempoDecorridoEmSegundos-= 1
    temporizador()
};

startPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar () {
    if (intervaloId) {
        pauseAudio.play()
        zerar()
        return;
    }
    startAudio.play()
    imagemBotao.setAttribute('src', `./imagens/pause.png`)
    startPauseBt.textContent = "Pausar"
    intervaloId = setInterval(contagemRegressiva, 1000)
  
}

function zerar() {
    startPauseBt.textContent = "Começar"
    imagemBotao.setAttribute('src', `./imagens/play_arrow.png`)
    clearInterval(intervaloId)
    intervaloId = null
}

function temporizador () {
    const time = new Date(tempoDecorridoEmSegundos * 1000)
    const formatedTime = time.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    timer.innerHTML = `${formatedTime}`
}

temporizador()