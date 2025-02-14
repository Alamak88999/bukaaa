const catcher = document.getElementById('catcher');
const emojiContainer = document.getElementById('emoji-container');
const scoreElement = document.getElementById('score');
const countdownElement = document.getElementById('countdown');
const startPopup = document.getElementById('startPopup');
const rulesPopup = document.getElementById('rulesPopup');
const startButton = document.getElementById('startButton');
const rulesButton = document.getElementById('rulesButton');
const closeRules = document.getElementById('closeRules');
const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');
const noButton = document.getElementById('noButton');
const restartButton = document.getElementById('restartButton');
const endScreen = document.getElementById('endScreen');
const returnButton = document.getElementById('returnButton');
const loadingContainer = document.getElementById('loadingContainer');
const loadingText = document.getElementById('loadingText');

let score = 0;
let gameInterval;

// Tampilkan pop-up awal saat game dimuat
window.onload = () => {
    startPopup.style.display = 'flex';
};

// Fungsi untuk memulai game
function startGame() {
    startPopup.style.display = 'none';
    countdownElement.style.display = 'block';
    let count = 3;
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        if (count === 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            gameInterval = setInterval(createEmoji, 1000);
        }
    }, 1000);
}

// Fungsi untuk menampilkan pop-up aturan
function showRules() {
    rulesPopup.style.display = 'flex';
}

// Fungsi untuk menutup pop-up aturan
function closeRulesPopup() {
    rulesPopup.style.display = 'none';
}

// Fungsi untuk membuat emoji
function createEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.innerHTML = '😋';
    emoji.style.left = Math.random() * (400 - 30) + 'px'; // Sesuaikan dengan lebar game-container
    emoji.style.animationDuration = Math.random() * 2 + 1 + 's';
    emojiContainer.appendChild(emoji);

    // Cek tabrakan antara emoji dan catcher
    const checkCollision = setInterval(() => {
        const emojiRect = emoji.getBoundingClientRect();
        const catcherRect = catcher.getBoundingClientRect();

        if (
            emojiRect.bottom >= catcherRect.top &&
            emojiRect.left >= catcherRect.left &&
            emojiRect.right <= catcherRect.right
        ) {
            score++;
            scoreElement.textContent = `Skor: ${score}`;
            emoji.remove();
            clearInterval(checkCollision);

            if (score === 15) {
                showPopup1();
                clearInterval(gameInterval);
            }
        }
    }, 10);

    emoji.addEventListener('animationend', () => {
        emoji.remove();
        clearInterval(checkCollision);
    });
}

// Fungsi untuk menampilkan pop-up pertama
function showPopup1() {
    popup1.style.display = 'flex';
    setTimeout(() => {
        noButton.style.display = 'block';
    }, 1000); // Tombol "Tidak" muncul setelah 1 detik
}

// Fungsi untuk menampilkan pop-up kedua
function showPopup2() {
    popup1.style.display = 'none';
    popup2.style.display = 'flex';
}

// Fungsi untuk menampilkan tampilan akhir
function showEndScreen() {
    popup2.style.display = 'none';
    endScreen.style.display = 'flex';
}

// Fungsi untuk memulai loading bar dan efek emoji
function startLoading() {
    returnButton.style.display = 'none';
    loadingContainer.style.display = 'flex';

    // Efek emoji muncul secara acak
    const emojiInterval = setInterval(() => {
        const loadingEmoji = document.createElement('div');
        loadingEmoji.classList.add('emoji');
        loadingEmoji.innerHTML = '♥️';
        loadingEmoji.style.left = Math.random() * (window.innerWidth - 30) + 'px';
        loadingEmoji.style.top = Math.random() * (window.innerHeight - 30) + 'px';
        document.body.appendChild(loadingEmoji);

        setTimeout(() => {
            loadingEmoji.remove();
        }, 2000);
    }, 500);

    // Setelah 3 detik, hapus halaman web
    setTimeout(() => {
        clearInterval(emojiInterval);
        deletePage(); // Hapus halaman web
    }, 3000);
}

// Fungsi untuk menghapus halaman web
function deletePage() {
    // Hapus semua elemen dari body
    document.body.innerHTML = '';

    // Tambahkan pesan terakhir
    const goodbyeMessage = document.createElement('div');
    goodbyeMessage.style.position = 'fixed';
    goodbyeMessage.style.top = '50%';
    goodbyeMessage.style.left = '50%';
    goodbyeMessage.style.transform = 'translate(-50%, -50%)';
    goodbyeMessage.style.fontSize = '24px';
    goodbyeMessage.style.color = '#333';
    goodbyeMessage.textContent = 'Terima kasih sudah bermain!';
    document.body.appendChild(goodbyeMessage);

    // Setelah 1 detik, hapus pesan dan buat halaman kosong
    setTimeout(() => {
        document.body.innerHTML = '';
    }, 1000);
}

// Event listener untuk tombol "Mulai Game"
startButton.addEventListener('click', startGame);

// Event listener untuk tombol "Aturan Game"
rulesButton.addEventListener('click', showRules);

// Event listener untuk tombol "Tidak"
noButton.addEventListener('click', showPopup2);

// Event listener untuk tombol "Kembali ke Awal"
restartButton.addEventListener('click', showEndScreen);

// Event listener untuk tombol "x" pada pop-up aturan
closeRules.addEventListener('click', closeRulesPopup);

// Event listener untuk tombol "Tekan untuk Kembali"
returnButton.addEventListener('click', startLoading);

// Event listener untuk pergerakan wadah penangkap
catcher.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const newLeft = touch.clientX - (window.innerWidth - 400) / 2 - catcher.offsetWidth / 2;
    if (newLeft >= 0 && newLeft <= 400 - catcher.offsetWidth) {
        catcher.style.left = newLeft + 'px';
    }
});

catcher.addEventListener('mousemove', (e) => {
    const newLeft = e.clientX - (window.innerWidth - 400) / 2 - catcher.offsetWidth / 2;
    if (newLeft >= 0 && newLeft <= 400 - catcher.offsetWidth) {
        catcher.style.left = newLeft + 'px';
    }
});