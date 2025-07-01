// JavaScript (script.js)
document.addEventListener('DOMContentLoaded', function() {
    const fotoGrid = document.querySelector('.foto-grid'); // Memilih div dengan class 'foto-grid'

    // Daftar foto adik Anda (ganti dengan path atau URL foto sebenarnya)
    const daftarFoto = [
        'images/foto1.jpg', // Path ke gambar Anda
        'images/foto2.jpg',
        'images/foto3.jpg',
        'images/foto4.jpg',
        'images/foto5.jpg'
    ];

    // Tambahkan foto ke galeri
    daftarFoto.forEach(foto => { // Melakukan iterasi untuk setiap foto di 'daftarFoto'
        const img = document.createElement('img'); // Membuat elemen <img> baru
        img.src = foto; // Menetapkan atribut 'src' dari <img> ke path foto
        img.alt = 'Foto Adik'; // Menetapkan atribut 'alt' untuk aksesibilitas
        fotoGrid.appendChild(img); // Menambahkan <img> ke dalam div 'foto-grid' di HTML
    });
});