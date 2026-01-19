// ===== КОНФИГУРАЦИЯ ЮKASSA =====
// ДЕМО-КЛЮЧИ - для реальных платежей замените на свои!
const YOO_KASSA_CONFIG = {
    shopId: 'test_shop_id',  // Замените на ваш shopId из кабинета ЮKassa
    secretKey: 'test_secret_key', // Замените на ваш secretKey
    isTestMode: true // true - тестовый режим, false - реальные платежи
};

// ===== ОСНОВНЫЕ ФУНКЦИИ ДЛЯ ОПЛАТЫ =====

// 1. Инициализация платежной формы
function initPaymentForm(amount, description, trackTitle = '') {
    // Проверяем, есть ли у нас реальные ключи
    if (YOO_KASSA_CONFIG.shopId === 'test_shop_id') {
        showDemoPaymentForm(amount, description, trackTitle);
        return;
    }
    
    // Реальная интеграция с ЮKassa
    createYooKassaPayment(amount, description);
}

// 2. Демо-форма оплаты (показывает, как будет выглядеть)
function showDemoPaymentForm(amount, description, trackTitle) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-credit-card"></i> Оформление заказа</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-summary">
                    <p><strong>Товар:</strong> ${description}</p>
                    ${trackTitle ? `<p><strong>Трек:</strong> ${trackTitle}</p>` : ''}
                    <p class="total-amount">Сумма к оплате: <strong>${amount} ₽</strong></p>
                </div>
                
                <div class="demo-payment-form">
                    <h4>Демо-режим оплаты</h4>
                    <p class="demo-note">Для реальных платежей нужно подключить ЮKassa</p>
                    
                    <div class="card-input">
                        <label>Номер карты:</label>
                        <input type="text" class="card-number" placeholder="1234 5678 9012 3456" value="5555 5555 5555 5555">
                    </div>
                    
                    <div class="card-details">
                        <div>
                            <label>Срок действия:</label>
                            <input type="text" placeholder="ММ/ГГ" value="12/25">
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type="text" placeholder="123" value="123">
                        </div>
                    </div>
                    
                    <button class="submit-payment-btn" onclick="processDemoPayment(${amount}, '${description}')">
                        <i class="fas fa-lock"></i> Оплатить ${amount} ₽
                    </button>
                </div>
                
                <div class="real-integration-info">
                    <h5><i class="fas fa-info-circle"></i> Как подключить реальные платежи:</h5>
                    <ol>
                        <li>Зарегистрируйтесь на <a href="https://yookassa.ru" target="_blank">yookassa.ru</a></li>
                        <li>Получите shopId и secretKey в личном кабинете</li>
                        <li>Замените тестовые ключи в файле payment.js</li>
                        <li>Установите isTestMode: false</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие модального окна
    modal.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Закрытие при клике вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 3. Обработка демо-платежа
function processDemoPayment(amount, description) {
    // Показываем анимацию загрузки
    const submitBtn = document.querySelector('.submit-payment-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    submitBtn.disabled = true;
    
    // Имитация обработки платежа
    setTimeout(() => {
        alert(`✅ Платёж на сумму ${amount} ₽ успешно обработан!\n\nЗаказ: ${description}\n\nВ реальной системе здесь произошла бы реальная оплата через банк.`);
        
        // Закрываем модальное окно
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        // Можно добавить запись в историю заказов
        saveOrderToHistory(amount, description);
        
    }, 2000);
}

// 4. Реальная интеграция с ЮKassa (заготовка)
function createYooKassaPayment(amount, description) {
    // Это упрощенный пример. В реальности нужно использовать API ЮKassa
    alert(`Реальная интеграция с ЮKassa\n\nСумма: ${amount} ₽\nОписание: ${description}\n\nShopId: ${YOO_KASSA_CONFIG.shopId}\n\nДля реальной интеграции обратитесь к документации ЮKassa.`);
}

// 5. Сохранение заказа в историю (в localStorage)
function saveOrderToHistory(amount, description) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
        date: new Date().toLocaleString(),
        amount: amount,
        description: description,
        status: 'completed'
    });
    localStorage.setItem('orders', JSON.stringify(orders));
}

// 6. Обработка кнопок заказа на сайте
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Заказать аранжировку" в шапке
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const amount = getSelectedAmount();
            initPaymentForm(amount, 'Заказ аранжировки');
        });
    }
    
    // Кнопки выбора суммы
    document.querySelectorAll('.price-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.getAttribute('data-price');
            document.querySelector('.custom-price').value = '';
            
            // Сброс активного состояния
            document.querySelectorAll('.price-btn').forEach(b => {
                b.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            this.style.background = 'rgba(96, 165, 250, 0.3)';
        });
    });
    
    // Поле для своей суммы
    const customPrice = document.querySelector('.custom-price');
    if (customPrice) {
        customPrice.addEventListener('input', function() {
            document.querySelectorAll('.price-btn').forEach(b => {
                b.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
    
    // Кнопки "Заказать" на карточках треков
    document.addEventListener('click', function(e) {
        if (e.target.closest('.order-track-btn')) {
            const btn = e.target.closest('.order-track-btn');
            const index = btn.getAttribute('data-index');
            const track = window.tracks ? window.tracks[index] : null;
            
            if (track) {
                const amount = prompt(`Заказ аранжировки для "${track.title}"\nВведите сумму в рублях:`, "1500");
                if (amount && !isNaN(amount) && parseInt(amount) >= 1000) {
                    initPaymentForm(parseInt(amount), `Аранжировка трека: ${track.title}`, track.title);
                } else if (amount) {
                    alert('Пожалуйста, введите сумму не менее 1000 рублей');
                }
            }
        }
    });
});

// Вспомогательная функция для получения выбранной суммы
function getSelectedAmount() {
    const customPrice = document.querySelector('.custom-price');
    const activePriceBtn = document.querySelector('.price-btn[style*="background"]');
    
    if (customPrice && customPrice.value) {
        return parseInt(customPrice.value);
    } else if (activePriceBtn) {
        return parseInt(activePriceBtn.getAttribute('data-price'));
    } else {
        return 1500; // Сумма по умолчанию
    }
}

// Экспорт функций в глобальную область видимости
window.initPaymentForm = initPaymentForm;
window.processDemoPayment = processDemoPayment;