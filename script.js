document.addEventListener('DOMContentLoaded', function() {
    const typingEffectElement = document.querySelector('.typing-effect');
    const revealSections = document.querySelectorAll('.reveal-on-scroll');
    const currentYearSpan = document.getElementById('current-year');
    const backgroundMusic = document.getElementById('background-music'); // Ambil elemen audio

    // Mengatur tahun saat ini di footer
    currentYearSpan.textContent = new Date().getFullYear();

    // --- Usaha Memutar Musik Otomatis ---
    // Cobalah memutar musik segera.
    // Jika gagal (karena kebijakan browser), tangkap error dan coba lagi saat ada interaksi.
    backgroundMusic.play().catch(error => {
        console.log("Autoplay musik diblokir. Musik akan diputar setelah interaksi pengguna pertama.");
        // Tambahkan event listener ke seluruh dokumen untuk mendeteksi interaksi pertama
        document.addEventListener('click', playMusicOnInteraction, { once: true });
        document.addEventListener('scroll', playMusicOnInteraction, { once: true });
        document.addEventListener('keydown', playMusicOnInteraction, { once: true });
    });

    function playMusicOnInteraction() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log("Musik diputar setelah interaksi pengguna.");
            }).catch(e => {
                console.error("Gagal memutar musik setelah interaksi:", e);
            });
        }
    }

    // --- Efek Ketik (Typing Effect) ---
    const messages = [
        "Teruslah bersinar terang, Shitie Hallimah!",
        "Semoga harimu penuh kebahagiaan.",
        "Semua impianmu menjadi kenyataan.",
        "Kami semua menyayangimu!"
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // Kecepatan ketik
    let deletingSpeed = 75; // Kecepatan hapus
    let delayBetweenMessages = 2000; // Jeda antar pesan

    function typeWriter() {
        const currentMessage = messages[messageIndex];
        if (isDeleting) {
            typingEffectElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            typingEffectElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            typingSpeed = delayBetweenMessages;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 200;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mulai efek ketik setelah jeda singkat
    setTimeout(typeWriter, 1500);

    // --- Animasi Reveal on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Ketika 20% dari elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Hentikan observasi setelah diaktifkan
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        observer.observe(section);
    });
});