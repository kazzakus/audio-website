// Массив с аудиофайлами
const tracks = [
    {
        id: 1,
        title: "Расслабляющая мелодия",
        artist: "Природа и звуки",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "3:42",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Минусовка "Бумажный змей" Голос 3. Мариам Мерабова, Виктория Черенцова, Ксения Бузина.",
        artist: "голос",
        src: "https://drive.google.com/file/d/1ch1Cz_LXDARGqxhr2hiuHKEgHyrYSUX9/view?usp=drive_link",
        duration: "4:15",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Джазовая импровизация",
        artist: "Джаз-бэнд",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "5:20",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        title: "Классическая симфония",
        artist: "Оркестр",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: "6:10",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        title: "Акустическая гитара",
        artist: "Соло гитара",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: "3:55",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        title: "Эмбиент атмосфера",
        artist: "Эмбиент проект",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: "7:30",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        title: "Рок-композиция",
        artist: "Рок-группа",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        duration: "4:45",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        title: "Хип-хоп бит",
        artist: "Битмейкер",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
];

// Элементы DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const trackImage = document.getElementById('track-image');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const searchInput = document.getElementById('search');

// Переменные состояния
let currentTrackIndex = 0;
let isPlaying = false;

// Инициализация плейлиста
function initPlaylist() {
    playlistEl.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.innerHTML = `
            <div class="track-number">${track.id}</div>
            <div class="track-info-small">
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-duration">${track.duration}</div>
            <button class="play-btn-small" onclick="playTrack(${index})">
                <i class="fas fa-play"></i>
            </button>
        `;
        playlistEl.appendChild(trackElement);
    });
}

// Воспроизведение трека
function playTrack(index) {
    if (index === currentTrackIndex && isPlaying) {
        pauseTrack();
        return;
    }
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    audioPlayer.src = track.src;
    currentTitle.textContent = track.title;
    currentArtist.textContent = track.artist;
    trackImage.src = track.cover;
    
    // Обновление активного трека в списке
    document.querySelectorAll('.track').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
    
    playTrackInternal();
}

// Внутренняя функция воспроизведения
function playTrackInternal() {
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            playIcon.className = 'fas fa-pause';
            playBtn.title = 'Пауза';
        })
        .catch(error => {
            console.log('Ошибка воспроизведения:', error);
            alert('Не удалось воспроизвести трек. Проверьте интернет-соединение.');
        });
}

// Пауза
function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    playBtn.title = 'Воспроизвести';
}

// Управление воспроизведением
function playPause() {
    if (audioPlayer.src) {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrackInternal();
        }
    } else {
        // Если ничего не играет, начинаем с первого трека
        playTrack(0);
    }
}

function stopTrack() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    playBtn.title = 'Воспроизвести';
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

// Обновление прогресса
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', updateDuration);

function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

function updateDuration() {
    durationEl.textContent = formatTime(audioPlayer.duration);
}

// Клик по прогресс-бару
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Громкость
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

// Поиск
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.track').forEach((trackEl, index) => {
        const title = tracks[index].title.toLowerCase();
        const artist = tracks[index].artist.toLowerCase();
        const isVisible = title.includes(searchTerm) || artist.includes(searchTerm);
        trackEl.style.display = isVisible ? 'flex' : 'none';
    });
});

// Автопереход к следующему треку
audioPlayer.addEventListener('ended', nextTrack);

// Форматирование времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Горячие клавиши
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            playPause();
            break;
        case 'ArrowLeft':
            prevTrack();
            break;
        case 'ArrowRight':
            nextTrack();
            break;
        case 'KeyM':
            audioPlayer.muted = !audioPlayer.muted;
            break;
    }
});

// Инициализация при загрузке
window.onload = function() {
    initPlaylist();
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Начинаем воспроизведение с первого трека
    playTrack(0);
    
    // Информационное сообщение
    console.log('Аудиоплеер загружен! Для замены треков редактируйте массив tracks в script.js');
};
