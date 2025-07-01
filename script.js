document.addEventListener('DOMContentLoaded', function() {
    const greetingForm = document.getElementById('greeting-form');
    const greetingTextarea = greetingForm.querySelector('textarea');
    const greetingList = document.getElementById('greeting-list');
    const typingEffectElement = document.querySelector('.typing-effect');
    const revealSections = document.querySelectorAll('.reveal-on-scroll');
    const currentYearSpan = document.getElementById('current-year');

    // Mengatur tahun saat ini di footer
    currentYearSpan.textContent = new Date().getFullYear();

    // --- Efek Ketik (Typing Effect) ---
    const messages = [
        "Teruslah bersinar terang!",
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

    // --- Form Ucapan ---
    greetingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form reload halaman
        const ucapan = greetingTextarea.value.trim();

        if (ucapan) {
            addGreeting(ucapan);
            greetingTextarea.value = ''; // Kosongkan textarea
            removeNoGreetingsMessage();
        }
    });

    function addGreeting(ucapan) {
        const greetingItem = document.createElement('div');
        greetingItem.classList.add('greeting-item');
        greetingItem.innerHTML = `<p>${ucapan}</p>`; // Menggunakan innerHTML karena ada ikon di CSS ::before

        // Tambahkan ke paling atas daftar ucapan
        greetingList.prepend(greetingItem);

        // Hapus pesan "Belum ada ucapan" jika ada
        const noGreetings = greetingList.querySelector('.no-greetings-yet');
        if (noGreetings) {
            noGreetings.remove();
        }
    }

    function removeNoGreetingsMessage() {
        const noGreetings = greetingList.querySelector('.no-greetings-yet');
        if (noGreetings) {
            noGreetings.remove();
        }
    }

    // Optional: Load existing greetings from Local Storage if any
    // This part requires more advanced logic if you want persistence
    // For now, it will start fresh on each load.
});