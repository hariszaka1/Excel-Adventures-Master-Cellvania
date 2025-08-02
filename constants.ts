import { Level, GridData } from './types';

const createEmptyGrid = (rows: number, cols: number): GridData => {
  return Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => ({ value: '', isEditable: true }))
  );
};

// Helper untuk menormalkan string formula untuk validasi
const normalizeFormula = (value: string): string => {
    return value.trim().replace(/\s/g, '').toUpperCase();
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Level 1: Langkah Pertama',
    instruction: 'Untuk memulai, pilih sel A1. Cukup klik pada sel yang benar.',
    hint: 'A adalah kolom pertama, dan 1 adalah baris pertama. Cari persimpangan keduanya.',
    initialGrid: createEmptyGrid(5, 5),
    validate: (grid, activeCell) => {
      return activeCell?.row === 0 && activeCell?.col === 0;
    },
    successMessage: 'Tepat sekali! Kamu sudah memilih sel pertama!',
  },
  {
    id: 2,
    title: 'Level 2: Input Data',
    instruction: 'Sekarang, mari kita masukkan data. Ketik angka 50 ke dalam sel A1.',
    hint: 'Klik pada sel A1, ketik "50", lalu tekan tombol "Periksa Jawaban".',
    initialGrid: createEmptyGrid(5, 5),
    validate: (grid) => {
      return grid[0][0].value.trim() === '50';
    },
    successMessage: 'Bagus! Memasukkan data adalah dasar dari semuanya.',
  },
  {
    id: 3,
    title: 'Level 3: Penjumlahan Dasar',
    instruction: 'Di sel C1, tulis formula untuk menjumlahkan nilai di A1 dan B1. Ingat, formula dimulai dengan =.',
    hint: 'Formula yang benar adalah =A1+B1. Ini akan menjumlahkan nilai dari kedua sel tersebut.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '10', isEditable: false };
      grid[0][1] = { value: '15', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][2].value) === '=A1+B1';
    },
    successMessage: 'Kerja bagus! Kamu baru saja melakukan perhitungan pertamamu!',
  },
  {
    id: 4,
    title: 'Level 4: Operasi Pengurangan',
    instruction: 'Di sel C1, tulis formula untuk mengurangi nilai B1 dari A1.',
    hint: 'Gunakan tanda kurang (-). Formula yang kamu cari adalah =A1-B1.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '100', isEditable: false };
      grid[0][1] = { value: '40', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][2].value) === '=A1-B1';
    },
    successMessage: 'Sempurna! Pengurangan sudah kamu kuasai.',
  },
  {
    id: 5,
    title: 'Level 5: Operasi Perkalian',
    instruction: 'Waktunya mengalikan! Di sel C1, kalikan nilai A1 dengan B1.',
    hint: 'Di spreadsheet, simbol untuk perkalian adalah tanda bintang (*). Formulanya: =A1*B1.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '8', isEditable: false };
      grid[0][1] = { value: '7', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][2].value) === '=A1*B1';
    },
    successMessage: 'Luar biasa! Kamu semakin mahir.',
  },
  {
    id: 6,
    title: 'Level 6: Operasi Pembagian',
    instruction: 'Terakhir dari aritmatika dasar. Di sel C1, bagi nilai A1 dengan B1.',
    hint: 'Gunakan garis miring (/) untuk pembagian. Tulis =A1/B1.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '144', isEditable: false };
      grid[0][1] = { value: '12', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][2].value) === '=A1/B1';
    },
    successMessage: 'Fantastis! Kamu sudah menguasai empat operasi dasar!',
  },
  {
    id: 7,
    title: 'Level 7: Formula SUM',
    instruction: 'Gunakan formula SUM di sel A4 untuk menjumlahkan semua angka di atasnya (A1 sampai A3).',
    hint: 'Formatnya adalah =SUM(SelAwal:SelAkhir). Jadi, kamu perlu mengetik =SUM(A1:A3).',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '25', isEditable: false };
      grid[1][0] = { value: '50', isEditable: false };
      grid[2][0] = { value: '75', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[3][0].value) === '=SUM(A1:A3)';
    },
    successMessage: 'Tepat! SUM adalah salah satu formula yang paling sering digunakan.',
  },
  {
    id: 8,
    title: 'Level 8: Formula AVERAGE',
    instruction: 'Di sel B4, hitung nilai rata-rata dari angka di B1 sampai B3 menggunakan formula AVERAGE.',
    hint: 'Mirip seperti SUM, formulanya adalah =AVERAGE(B1:B3).',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][1] = { value: '10', isEditable: false };
      grid[1][1] = { value: '20', isEditable: false };
      grid[2][1] = { value: '30', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[3][1].value) === '=AVERAGE(B1:B3)';
    },
    successMessage: 'Benar sekali! Kamu sekarang bisa mencari nilai rata-rata dengan cepat.',
  },
  {
    id: 9,
    title: 'Level 9: Formula MAX',
    instruction: 'Di sel C4, temukan angka terbesar dari C1 sampai C3 menggunakan formula MAX.',
    hint: 'Gunakan formula =MAX(C1:C3) untuk menemukan nilai maksimum dalam rentang tersebut.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][2] = { value: '150', isEditable: false };
      grid[1][2] = { value: '300', isEditable: false };
      grid[2][2] = { value: '225', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[3][2].value) === '=MAX(C1:C3)';
    },
    successMessage: 'Sempurna! Mencari nilai tertinggi jadi mudah!',
  },
  {
    id: 10,
    title: 'Level 10: Formula MIN',
    instruction: 'Sekarang kebalikannya. Di sel D4, temukan angka terkecil dari D1 sampai D3 dengan formula MIN.',
    hint: 'Cukup ketik =MIN(D1:D3) untuk mendapatkan nilai minimumnya.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][3] = { value: '99', isEditable: false };
      grid[1][3] = { value: '49', isEditable: false };
      grid[2][3] = { value: '79', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[3][3].value) === '=MIN(D1:D3)';
    },
    successMessage: 'Hebat! MAX dan MIN sudah dalam genggamanmu.',
  },
  {
    id: 11,
    title: 'Level 11: Formula COUNT',
    instruction: 'Di sel A6, gunakan formula COUNT untuk menghitung jumlah sel yang berisi angka di rentang A1:A5.',
    hint: 'Formula COUNT hanya menghitung angka. Gunakan =COUNT(A1:A5).',
    initialGrid: (() => {
      const grid = createEmptyGrid(6, 5);
      grid[0][0] = { value: '101', isEditable: false };
      grid[1][0] = { value: '202', isEditable: false };
      grid[2][0] = { value: 'Teks', isEditable: false };
      grid[3][0] = { value: '404', isEditable: false };
      grid[4][0] = { value: '', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[5][0].value) === '=COUNT(A1:A5)';
    },
    successMessage: 'Tepat! Kamu bisa lihat ia mengabaikan sel teks dan sel kosong.',
  },
  {
    id: 12,
    title: 'Level 12: Formula COUNTA',
    instruction: 'Berbeda dengan COUNT, COUNTA menghitung semua sel yang tidak kosong. Coba di B6 untuk rentang B1:B5.',
    hint: 'Gunakan =COUNTA(B1:B5). Perhatikan perbedaannya dengan COUNT.',
    initialGrid: (() => {
      const grid = createEmptyGrid(6, 5);
      grid[0][1] = { value: '101', isEditable: false };
      grid[1][1] = { value: '202', isEditable: false };
      grid[2][1] = { value: 'Teks', isEditable: false };
      grid[3][1] = { value: '404', isEditable: false };
      grid[4][1] = { value: '', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[5][1].value) === '=COUNTA(B1:B5)';
    },
    successMessage: 'Bagus! COUNTA berguna untuk menghitung entri data apa pun.',
  },
  {
    id: 13,
    title: 'Level 13: Urutan Operasi',
    instruction: 'Di D1, tulis formula untuk menambahkan A1 dan B1, lalu hasilnya dikalikan dengan C1.',
    hint: 'Gunakan tanda kurung untuk prioritas: =(A1+B1)*C1.',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '5', isEditable: false };
      grid[0][1] = { value: '10', isEditable: false };
      grid[0][2] = { value: '2', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][3].value) === '=(A1+B1)*C1';
    },
    successMessage: 'Penting sekali! Mengerti urutan operasi adalah kunci formula kompleks.',
  },
  {
    id: 14,
    title: 'Level 14: Formula IF',
    instruction: 'Di sel B1, gunakan formula IF. Jika nilai di A1 lebih dari 50, tampilkan "Lulus". Jika tidak, tampilkan "Gagal".',
    hint: 'Struktur IF adalah =IF(kondisi, nilai_jika_benar, nilai_jika_salah). Jadi, =IF(A1>50,"Lulus","Gagal").',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: '75', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][1].value) === '=IF(A1>50,"LULUS","GAGAL")';
    },
    successMessage: 'Logika yang bagus! Formula IF sangat kuat untuk pengambilan keputusan.',
  },
  {
    id: 15,
    title: 'Level 15: Menggabungkan Teks',
    instruction: 'Di sel C1, gabungkan nama depan di A1 dan nama belakang di B1. Gunakan simbol & dan tambahkan spasi di antara keduanya.',
    hint: 'Untuk menambahkan spasi, kamu harus menuliskannya di dalam tanda kutip seperti ini: " ". Formulanya: =A1&" "&B1',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: 'Penyihir', isEditable: false };
      grid[0][1] = { value: 'Excel', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][2].value) === '=A1&" "&B1';
    },
    successMessage: 'Keren! Menggabungkan teks sangat berguna untuk membuat label atau nama lengkap.',
  },
  {
    id: 16,
    title: 'Level 16: Formula LEN',
    instruction: 'Di sel B1, gunakan formula LEN untuk menghitung jumlah karakter dalam teks di sel A1.',
    hint: 'Formula ini sederhana: =LEN(A1). LEN adalah singkatan dari Length (panjang).',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: 'Cellvania', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][1].value) === '=LEN(A1)';
    },
    successMessage: 'Mudah, kan? Sekarang kamu bisa menghitung panjang teks apa pun.',
  },
  {
    id: 17,
    title: 'Level 17: Formula LEFT',
    instruction: 'Di sel B1, gunakan formula LEFT untuk mengambil 4 karakter pertama dari teks di sel A1.',
    hint: 'Strukturnya adalah =LEFT(teks, jumlah_karakter). Jadi, ketik =LEFT(A1,4).',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: 'Spreadsheet', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][1].value) === '=LEFT(A1,4)';
    },
    successMessage: 'Bagus! LEFT berguna untuk mengekstrak data dari awal teks.',
  },
  {
    id: 18,
    title: 'Level 18: Formula RIGHT',
    instruction: 'Sekarang coba RIGHT. Di sel B1, ambil 5 karakter terakhir dari teks di sel A1.',
    hint: 'Sama seperti LEFT, tapi dari kanan: =RIGHT(A1,5).',
    initialGrid: (() => {
      const grid = createEmptyGrid(5, 5);
      grid[0][0] = { value: 'Formula Hebat', isEditable: false };
      return grid;
    })(),
    validate: (grid) => {
      return normalizeFormula(grid[0][1].value) === '=RIGHT(A1,5)';
    },
    successMessage: 'Luar biasa! Kamu sudah bisa memanipulasi teks dari kedua sisi.',
  },
  {
    id: 19,
    title: 'Level 19: Kombinasi Formula',
    instruction: 'Ujian terakhir! Di C1, jumlahkan A1 dan B1, lalu bagi hasilnya dengan 2. Gabungkan apa yang telah kamu pelajari!',
    hint: 'Ingat urutan operasi. Kamu perlu =(A1+B1)/2.',
    initialGrid: (() => {
        const grid = createEmptyGrid(5, 5);
        grid[0][0] = { value: '50', isEditable: false };
        grid[0][1] = { value: '150', isEditable: false };
        return grid;
    })(),
    validate: (grid) => {
        return normalizeFormula(grid[0][2].value) === '=(A1+B1)/2';
    },
    successMessage: 'Selamat! Kamu telah menyelesaikan semua tantangan dan menguasai dasar-dasar formula di Cellvania!',
  }
];
