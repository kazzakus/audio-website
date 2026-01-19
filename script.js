// ===== КОНФИГУРАЦИЯ =====
// Массив с минусовками
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
    }
];

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentTrackIndex = 0;
let isPlaying = false;

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

// 1. Инициализация списка треков
function initTracks() {
    const container = document.getElementById('tracksContainer');
    if (!container) {
        console.error('Контейнер для треков не найден!');
        return;
    }
    
    container.innerHTML = '';
    
    tracks.forEach((track, index) => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        trackCard.dataset.index = index;
        
        trackCard.innerHTML = `
            <div class="track-cover">
                <img src="${track.cover}" alt="${track.title}" loading="lazy">
            </div>
            <div class="track-details">
                <div class="track-title">${track.title}</div>
                <div class="track-meta">${track.artist}</div>
                <div class="track-length">${track.duration}</div>
            </div>
            <div class="track-actions">
                <button class="action-btn play-track-btn" data-index="${index}">
                    <i class="fas fa-play"></i>
                </button>
                <button class="order-btn-small order-track-btn" data-index="${index}">
                    <i class="fas fa-shopping-cart"></i> Заказать
                </button>
            </div>
        `;
        
        container.appendChild(trackCard);
    });
    
    console.log(`Загружено ${tracks.length} треков`);
}

// 2. Воспроизведение трека
function playTrack(index) {
    const audioPlayer = document.getElementById('audioPlayer');
    const track = tracks[index];
    
    if (!track || !audioPlayer) {
        console.error('Трек или аудиоплеер не найден');
        return;
    }
    
    // Останавливаем текущее воспроизведение
    audioPlayer.pause();
    
    // Устанавливаем новый трек
    audioPlayer.src = track.src;
    currentTrackIndex = index;
    
    // Обновляем интерфейс
    updateNowPlaying(track);
    updateActiveCard(index);
    
    // Начинаем воспроизведение
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            updatePlayButton(true);
            console.log(`Воспроизведение: ${track.title}`);
        })
        .catch(error => {
            console.error('Ошибка воспроизведения:', error);
            alert('Не удалось воспроизвести трек. Проверьте интернет-соединение.');
        });
}

// 3. Пауза/возобновление
function togglePlayPause() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (!audioPlayer.src) {
        // Если ничего не играет, начинаем с первого трека
        playTrack(0);
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
            })
            .catch(error => {
                console.error('Ошибка возобновления:', error);
            });
    }
    
    updatePlayButton(isPlaying);
}

// 4. Остановка
function stopPlayback() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    
    updatePlayButton(false);
}

// 5. Следующий трек
function playNext() {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
}

// 6. Предыдущий трек
function playPrev() {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

// Обновление информации о текущем треке
function updateNowPlaying(track) {
    const titleEl = document.getElementById('nowPlayingTitle');
    const artistEl = document.getElementById('nowPlayingArtist');
    const coverEl = document.getElementById('albumCover');
    
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (coverEl) coverEl.src = track.cover;
}

// Обновление активной карточки
function updateActiveCard(index) {
    document.querySelectorAll('.track-card').forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Обновление кнопки воспроизведения
function updatePlayButton(playing) {
    const playIcon = document.getElementById('playIcon');
    const playBtn = document.getElementById('playPauseBtn');
    
    if (playIcon) {
        playIcon.className = playing ? 'fas fa-pause' : 'fas fa-play';
    }
    
    if (playBtn) {
        playBtn.title = playing ? 'Пауза' : 'Воспроизвести';
    }
}

// Обновление прогресс-бара
function updateProgress() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    
    if (!audioPlayer.duration || !progressFill) return;
    
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percent}%`;
    
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
    
    if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    }
}

// Форматирование времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Обработка заказа
function handleOrder(index) {
    const track = tracks[index];
    const price = prompt(`Заказ аранжировки для "${track.title}"\nВведите сумму в рублях:`, "1500");
    
    if (price && !isNaN(price) && parseInt(price) >= 1000) {
        alert(`Спасибо! Заказ на сумму ${price}₽ принят.\nС вами свяжутся для уточнения деталей.`);
    } else if (price) {
        alert('Пожалуйста, введите сумму не менее 1000 рублей');
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализация...');
    
    // 1. Создаём список треков
    initTracks();
    
    // 2. Находим элементы
    const audioPlayer = document.getElementById('audioPlayer');
    
    // 3. Настраиваем обработчики событий для аудио
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', playNext);
        audioPlayer.volume = 0.7; // Устанавливаем громкость 70%
    }
    
    // 4. Настраиваем кнопки плеера
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeControl = document.getElementById('volumeControl');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', playPrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', playNext);
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopPlayback);
    }
    
    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            if (audioPlayer) {
                audioPlayer.volume = this.value / 100;
            }
        });
    }
    
    // 5. Настраиваем поиск
    const searchInput = document.getElementById('trackSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.track-card').forEach(card => {
                const title = card.querySelector('.track-title').textContent.toLowerCase();
                const meta = card.querySelector('.track-meta').textContent.toLowerCase();
                const isVisible = title.includes(searchTerm) || meta.includes(searchTerm);
                card.style.display = isVisible ? 'flex' : 'none';
            });
        });
    }
    
    // 6. Делегирование событий для карточек треков
    document.addEventListener('click', function(event) {
        // Клик по кнопке воспроизведения на карточке
        if (event.target.closest('.play-track-btn')) {
            const btn = event.target.closest('.play-track-btn');
            const index = parseInt(btn.dataset.index);
            playTrack(index);
        }
        
        // Клик по кнопке заказа на карточке
        if (event.target.closest('.order-track-btn')) {
            const btn = event.target.closest('.order-track-btn');
            const index = parseInt(btn.dataset.index);
            handleOrder(index);
        }
        
        // Клик по самой карточке (кроме кнопок)
        if (event.target.closest('.track-card') && 
            !event.target.closest('.track-actions')) {
            const card = event.target.closest('.track-card');
            const index = parseInt(card.dataset.index);
            playTrack(index);
        }
    });
    
    // 7. Клик по прогресс-бару для перемотки
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('click', function(event) {
            const audioPlayer = document.getElementById('audioPlayer');
            if (!audioPlayer.duration) return;
            
            const rect = this.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
        });
    }
    
    // 8. Горячие клавиши
    document.addEventListener('keydown', function(event) {
        if (event.target.tagName === 'INPUT') return; // Не мешаем вводу текста
        
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                playPrev();
                break;
            case 'ArrowRight':
                playNext();
                break;
        }
    });
    
    console.log('Инициализация завершена успешно!');
});

// ===== ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА =====
// (Если понадобится вызывать из HTML-атрибутов)
window.playTrack = playTrack;
window.togglePlayPause = togglePlayPause;
window.playNext = playNext;
window.playPrev = playPrev;
window.stopPlayback = stopPlayback;
window.handleOrder = handleOrder;