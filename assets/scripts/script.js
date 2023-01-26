const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const matin = document.getElementById('matin');
const midi = document.getElementById('midi');
const soir = document.getElementById('soir');


let songIndex = 0;

// info de musique
const songs = [
  {
    title: 'Green Chair',
    artist: 'Diego Nava',
    coverPath: 'assets/images/matin.mp4',
    discPath: 'assets/music/music1.mp3',
    duration: '1:33',
  },
  {
    title: 'Dance with Me', 
    artist: 'Ahjay Stelino',
    coverPath: 'assets/images/midi.mp4',
    discPath: 'assets/music/music2.mp3',
    duration: '2:22',
  },
  {
    title: 'Gimme that Bottle',
    artist: 'Michael Ramir',
    coverPath: 'assets/images/soir.mp4',
    discPath: 'assets/music/music3.mp3',
    duration: '1:54',
  },
];

// Charger la chanson initialement
loadSong(songs[songIndex]);

// Charger la chanson donnée
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Basculer la lecture et la pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// mettre a jour l'icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// mettre a jour la progression de la bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Réinitialiser la progression
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Aller à la chanson précédente
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Aller à la chanson suivante
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change la progression du song ad on click sur la bar de progression
function Progression(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Lecture/Pause lorsque le bouton de lecture est cliqué
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Déplacer à un endroit différent dans la chanson
progressContainer.addEventListener('click', Progression);

// au click sur matin 
matin.addEventListener('click', playPauseMedia);

// au click sur midi
midi.addEventListener('click', playPauseMedia);

// au click sur soir
soir.addEventListener('click', playPauseMedia);
