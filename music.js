var holding = false;
var track = document.getElementById("track");
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
    title: 'Promesas',
    artist: 'Promesas - José José',
    url: 'audio/Promesas.mp3',
    art: 'img/promesas.jpg'
},
    
{
    title: 'Quemame los Ojos',
    artist: 'De Pueblo en Pueblo - José José',
    url: 'audio/QuemameLosOjos.mp3',
    art: 'img/depueblo.jpg'
},

{
    title: 'Seré',
    artist: 'Reflexiones - José José',
    url: 'audio/Sere.mp3',
    art: 'img/reflexiones.jpg'
},

{
    title: 'Soy Tan Infiel',
    artist: 'Mi Vida - José José',
    url: 'audio/SoyTanInfiel.mp3',
    art: 'img/mivida.jpg'
},

{
    title: 'Vamos a Darnos Tiempo',
    artist: 'Gracias - José José',
    url: 'audio/VamosADarnosTiempo.mp3',
    art: 'img/gracias.jpg'
},

{
    title: 'Lo Que No Fue No Será',
    artist: 'Lo Pasado, Pasado - José José',
    url: 'audio/LoQueNoFueNoSera.mp3',
    art: 'img/lopasado.jpg'
},

{
    title: 'Dos',
    artist: 'El Triste - José José',
    url: 'audio/Dos.mp3',
    art: 'img/eltriste.jpg'
},

{
    title: 'El Amor Acaba',
    artist: 'Secretos - José José',
    url: 'audio/ElAmorAcaba.mp3',
    art: 'img/secretos.jpg'
}];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.innerHTML = song.title;
    artist.innerHTML = song.artist;
    art.setAttribute("src", song.art);

    audio.onended = function(){
        nextTrack();
    };
}

audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<img class="pad" src="img/play.png" />';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.innerHTML = '<img src="img/pause.png" />';
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);


function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}
function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function() {
        audio.play();
    }
}

