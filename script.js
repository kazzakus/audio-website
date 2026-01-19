javascript
// Массив с минусовками и аранжировками
const tracks = [
    {
        id: 1,
        title: "Yesterday - Beatles",
        artist: "Поп-рок | Тоника: C | Темп: 70bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "3:42",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Billie Jean - Michael Jackson",
        artist: "Фанк/Диско | Тоника: F#m | Темп: 117bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "4:15",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Fly Me To The Moon",
        artist: "Джаз/Свинг | Тоника: Am | Темп: 120bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "5:20",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Shape of You - Ed Sheeran",
        artist: "Поп | Тоника: C#m | Темп: 96bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: "6:10",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Hallelujah - Leonard Cohen",
        artist: "Баллада | Тоника: C | Темп: 65bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: "3:55",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Bohemian Rhapsody - Queen",
        artist: "Рок-опера | Тоника: Bb | Темп: 72bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: "7:30",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        title: "Let It Be - Beatles",
        artist: "Рок-баллада | Тоника: C | Темп: 68bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        duration: "4:45",
        cover: "https://images.unsplash.com/photo-1526281216101-ea7a7c00792c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        title: "Imagine - John Lennon",
        artist: "Поп-баллада | Тоника: C | Темп: 76bpm",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// Элементы DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const currentTrackTitle = document.getElementById('current-track-title');
const currentTrackArtist = document.getElementById('current-track-artist');
const trackImage = document.querySelector('.track-image img');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const tracksGrid = document.getElementById('tracksGrid');
const searchInput = document.getElementById('search');

// Переменные состояния
let currentTrackIndex = 0;
let isPlaying = false;

// Инициализация сетки треков
function initTracksGrid() {
    tracksGrid.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        trackCard.innerHTML = `
            <div class="track-image-small">
                <img src="${track.cover}" alt="${track.title}">
            </div>
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
                <div class="track-duration">${track.duration}</div>
            </div>
            <div class="track-controls">
                <button class="track-play-btn" onclick="playTrack(${index})">
                    <i class="fas fa-play"></i>
                </button>
                <button class="donate-track-btn" onclick="orderArrangement(${index})">
                    <i class="fas fa-shopping-cart"></i> Заказать
                </button>
            </div>
        `;
        tracksGrid.appendChild(trackCard);
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
    currentTrackTitle.textContent = track.title;
    currentTrackArtist.textContent = track.artist;
    trackImage.src = track.cover;
    
    // Обновление активной карточки
    document.querySelectorAll('.track-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    // Обновление кнопки на активной карточке
    const activePlayBtn = document.querySelector(`.track-card.active .track-play-btn i`);
    if (activePlayBtn) {
        activePlayBtn.className = 'fas fa-pause';
    }
    
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
            alert('Не удалось воспроизвести минусовку. Проверьте интернет-соединение или выберите другую.');
        });
}

// Пауза
function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    playBtn.title = 'Воспроизвести';
    
    // Обновление кнопки на активной карточке
    const activePlayBtn = document.querySelector(`.track-card.active .track-play-btn i`);
    if (activePlayBtn) {
        activePlayBtn.className = 'fas fa-play';
    }
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
    
    // Обновление кнопки на активной карточке
    const activePlayBtn = document.querySelector(`.track-card.active .track-play-btn i`);
    if (activePlayBtn) {
        activePlayBtn.className = 'fas fa-play';
    }
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
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
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
    document.querySelectorAll('.track-card').forEach((card, index) => {
        const title = tracks[index].title.toLowerCase();
        const artist = tracks[index].artist.toLowerCase();
        const isVisible = title.includes(searchTerm) || artist.includes(searchTerm);
        card.style.display = isVisible ? 'flex' : 'none';
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

// Функция заказа аранжировки
function orderArrangement(index) {
    const track = tracks[index];
    const priceOptions = [
        {name: "Базовая аранжировка", price: 1500},
        {name: "Стандартная аранжировка", price: 3000},
        {name: "Профессиональная аранжировка", price: 5000}
    ];
    
    let message = `Заказать аранжировку "${track.title}"\n\n`;
    message += `Жанр: ${track.artist}\n\n`;
    message += "Выберите вариант:\n";
    priceOptions.forEach((opt, i) => {
        message += `${i+1}. ${opt.name} - ${opt.price}₽\n`;
    });
    message += "4. Другой вариант/обсудить";
    
    const choice = prompt(message, "1");
    
    if (choice) {
        let amount = 0;
        let service = "";
        
        switch(choice) {
            case "1": amount = 1500; service = "Базовая аранжировка"; break;
            case "2": amount = 3000; service = "Стандартная аранжировка"; break;
            case "3": amount = 5000; service = "Профессиональная аранжировка"; break;
            case "4": 
                alert("Для обсуждения индивидуального заказа напишите на arrangements@example.com");
                return;
            default: 
                amount = parseInt(choice);
                if (isNaN(amount) || amount < 1000) {
                    alert("Введите корректную сумму (от 1000₽)");
                    return;
                }
                service = "Индивидуальный заказ";
        }
        
        // Показываем форму оплаты
        document.getElementById('donateBtn').click();
        
        // Устанавливаем сумму
        document.querySelector('.custom-amount').value = amount;
        
        alert(`Вы выбрали: ${service}\nСумма: ${amount}₽\n\nПосле оплаты с вами свяжется аранжировщик для уточнения деталей.`);
    }
}

// Инициализация при загрузке
window.onload = function() {
    initTracksGrid();
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Начинаем воспроизведение с первого трека
    playTrack(0);
};
