console.log("Welcome to Spotify");

//Initialises the variables
let SongIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let MasterSongName = document.getElementById('MasterSongName');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { SongName: "Heeriye Heeriye - Arijit Singh", filePath: "songs/1.mp3", CoverPath: "covers/cover.png", setTimeout:"03.14" },
    { SongName: "Maan Meri jaan - King", filePath: "songs/2.mp3", CoverPath: "covers/cover4.png",setTimeout:"03.14" },
    { SongName: "Tere Hawale - Pritam", filePath: "songs/3.mp3", CoverPath: "covers/cover1.png",setTimeout:"05.50" },
    { SongName: "Raatan Lambiyan - Tanishk Bagchi", filePath: "songs/4.mp3", CoverPath: "covers/cover5.png",setTimeout:"03.50"},
    { SongName: "Moon Rise - Guru Randhawa", filePath: "songs/5.mp3", CoverPath: "covers/cover2.png",setTimeout:"02.54"},
    { SongName: "Har Har Shambhu - Jetu Sharma", filePath: "songs/6.mp3", CoverPath: "covers/cover3.png",setTimeout:"05.54" },
]

songitems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].setTimeout;
})

//handle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change', () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        SongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${SongIndex + 1}.mp3`;
        MasterSongName.innerText = songs[SongIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (SongIndex >= 5) {
        SongIndex = 0;
    }
    else {
        SongIndex += 1;
    }
    audioElement.src = `songs/${SongIndex + 1}.mp3`;
    MasterSongName.innerText = songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0;
    }
    else {
        SongIndex -= 1;
    }
    audioElement.src = `songs/${SongIndex + 1}.mp3`;
    MasterSongName.innerText = songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
})