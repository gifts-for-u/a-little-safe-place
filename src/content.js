/**
 * The Safe Place — Content & Indonesian Copy Module
 * Centralized messages and object metadata.
 */

export const WELCOME_COPY = Object.freeze({
  title: 'The Safe Place',
  subtitle: 'a little room just for you',
  greeting: 'hai sayanggg, sini dulu bentar.\ndi sini nggak ada deadline, nggak ada yang harus kamu selesaikan.\nkamu boleh istirahat sebentar, ya.',
  instruction: 'klik apa pun yang bikin kamu penasaran.',
  cta: 'Masuk ke kamar'
});

export const HOTSPOTS = Object.freeze([
  {
    id: 'bed',
    title: 'Kasur Empuk',
    label: 'Kasur',
    hint: 'istirahat sebentar',
    actionLabel: 'kita istirahat yu',
    actionId: 'action-bed-rest',
    // Exact percentage of the 1376x768 artwork
    coords: { x: 74.1, y: 71.6 }
  },
  {
    id: 'letter',
    title: 'Surat di Meja Samping',
    label: 'Surat',
    hint: 'sebuah surat untukmu',
    actionLabel: null,
    coords: { x: 41.8, y: 69.7 }
  },
  {
    id: 'plush',
    title: 'Boneka Stitch Kesayangan',
    label: 'Boneka Plush',
    hint: 'butuh pelukan?',
    actionLabel: 'Peluk bonekanya',
    actionId: 'action-hug-plush',
    coords: { x: 56.0, y: 55.3 }
  },
  {
    id: 'laptop',
    title: 'Laptop Kerja',
    label: 'Laptop',
    hint: 'pekerjaan bisa menunggu',
    actionLabel: 'Tutup kerjaan hari ini',
    actionId: 'action-close-work',
    coords: { x: 87.9, y: 51.4 }
  },
  {
    id: 'lamp',
    title: 'Lampu Meja Hangat',
    label: 'Lampu Meja',
    hint: 'secercah cahaya hangat',
    actionLabel: 'Ubah suasana cahaya',
    actionId: 'action-toggle-lamp',
    coords: { x: 42.2, y: 57.3 }
  }
]);

export const MESSAGES = Object.freeze({
  bed: {
    title: 'Rest Without Guilt',
    subtitle: 'Kasur yang selalu menyambutmu apa adanya',
    body: `hai sayang,

kamu nggak harus menyelesaikan semuanya hari ini. kamu udah berusaha sejauh ini, dan itu berarti. istirahat bukan berarti kamu menyerah. kamu juga berhak berhenti sebentar.

pelan-pelan aja, ya. satu hal dalam satu waktu.
aku bangga sama kamu.`
  },
  letter: {
    title: 'A Letter From Me',
    subtitle: 'Catatan kecil di dekat tempat tidurmu',
    body: `buat sayangku,

aku tahu akhir-akhir ini kerjaan kamu lagi banyak banget. mungkin ada hari ketika semuanya datang barengan, sampai kamu nggak sempat berhenti buat nanya kabar diri sendiri.

aku cuma mau kamu tahu kalau kamu nggak harus menghadapi semuanya sendirian. kamu nggak harus selalu kelihatan kuat di depan aku, dan kamu nggak perlu punya jawaban buat semuanya sekarang.

aku mungkin nggak bisa langsung menghilangkan semua beban kamu, tapi aku mau terus ada, dengerin kamu, dan nemenin kamu sebisaku. kalau hari ini kamu cuma sanggup melewati hari, itu juga sudah berarti.

istirahat kalau capek, cerita kalau mau, atau diam bareng aku juga boleh.

aku sayang kamu, bukan cuma saat kamu hebat atau produktif, tapi juga saat kamu lelah dan lagi nggak punya tenaga buat apa-apa.

peluk jauh dulu, ya.
— aku, yang selalu dukung kamu.`
  },
  plush: {
    title: 'A Hug From Me',
    subtitle: 'Teman kecil setia di atas kasur',
    body: `sini, peluk dulu, sayanggg.

nggak perlu cerita kalau belum siap. nggak perlu cari kata-kata juga.
hari ini pasti berat banget, ya?

anggap aja boneka ini lagi aku pinjemin buat peluk kamu. aku di sini, kok. kamu nggak sendirian.`
  },
  laptop: {
    title: 'Work Can Wait',
    subtitle: 'Layar laptop yang akhirnya boleh diistirahatkan',
    body: `kerjaannya belum selesai semua? nggak apa-apa, sayang.

kamu bukan mesin yang harus selalu produktif. nilai diri kamu nggak ditentukan dari berapa banyak yang bisa kamu selesaikan dalam sehari.

progress kecil kamu tetap berarti. sekarang, kamu juga boleh jadi prioritas.`
  },
  lamp: {
    title: 'A Little Light',
    subtitle: 'Cahaya kecil peneman malam yang sunyi',
    body: `nggak semua hari harus terasa indah. ada hari yang tugasnya cuma dilewati, dan itu nggak apa-apa.

kalau semuanya terasa berat, kita lewati pelan-pelan aja, ya. kamu nggak harus melihat seluruh jalan sekarang untuk mengambil satu langkah kecil.

aku tetap dukung kamu.`
  }
});

export const REST_CARD_COPY = Object.freeze({
  title: 'Selamat Istirahat, Sayang',
  subtitle: 'Pintu kamar ini selalu terbuka kapan pun kamu butuh',
  body: `makasih ya udah mampir sebentar, sayang.
kamu nggak harus menyelesaikan semuanya malam ini.
istirahat dulu, ya. aku di sini.
nggak perlu bales apa-apa kok.

i love you.`
});
