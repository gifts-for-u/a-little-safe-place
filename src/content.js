/**
 * The Safe Place — Content & Indonesian Copy Module
 * Centralized messages and object metadata.
 */

export const WELCOME_COPY = Object.freeze({
  title: 'The Safe Place',
  subtitle: 'a little room just for you',
  greeting: 'hai sayanggg, sini dulu bentar.\ndi sini ngga ada deadline, ngga ada yang harus kamu selesaikan.\nkamu boleh istirahat sebentar, ya.',
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
    title: 'Istirahat dan capek itu wajar tau',
    subtitle: 'Kamu ga harus selalu kuat setiap saat',
    body: `hai sayang,

kamu engga harus menyelesaikan semuanya hari ini. kamu udah berusaha sejauh ini, dan itu bener2 suda sangat hebatt. istirahat bukan berarti kamu menyerah. kamu juga berhak berhenti sebentar.

pelan-pelan yaa sayangg, kamu hebat dan aku bangga.
aku sayang kamuu`
  },
  letter: {
    title: 'Surat kecil dari aku',
    subtitle: 'Mungkin ini bisa jadi pengingat buat kamu',
    body: `buat kamu, sayangnya aku,

aku tahu belakanga ini kerjaan kamu lagi banyak banget. sampe di titik yang kamu sibuk banget dan pas sampe rumah juga keliatan capek bangett. lalu juga kamu sempet gaenak badan kemarinn. jangan terlalu maksain yaa sayangg.. aku takut kalo kamu udah terlalu maksain diri sendirii... 

aku cuma mau kamu tau kalo kamu engga harus menghadapi semuanya sendirian. kamu engga harus selalu kelihatan kuat di depan aku, kamu boleh manja, kamu boleh clingy, kamu boleh menjadi anak kicik, kamu bolehh sayangg

aku mungkin engga bisa langsung menghilangkan semua beban kamu, tapi aku mau terus ada, dengerin kamu, dan nemenin kamu sebisa aku. dan karena kamu udah bisa ngelewatin hari ini kamu udah termasuk hebatt, mwaaa

istirahat kalo capek, cerita kalo mau, atau diam bareng aku juga bolehh, (soalnya kalo kelon dan pukpuk belum boleh hehe), nanti usap-usap jugaaa

aku sayang kamu, bukan cuma saat kamu hebat atau produktif, tapi juga saat kamu lelah dan lagi ngga punya tenaga buat apa-apaa

peyuk jauh dulu, yaaa
— aku, yang selalu berusaha ada buat kamu`
  },
  plush: {
    title: 'A Hug From Me',
    subtitle: 'Stitch gemas',
    body: `sini, peluk dulu, sayanggg.

ngga perlu cerita kalo belum mau. 
hari ini pasti cape banget, yaa?

anggap aja boneka ini lagi aku pinjemin buat peluk kamu. aku di sini, kok. kamu ngga sendirian.`
  },
  laptop: {
    title: 'Kerja boleh tapi harus inget istirahat juga',
    subtitle: 'Kalo kamu istirahat nanti laptopnya juga istirahatt',
    body: `kerjaannya selesaiin yang kudu diselesaiin malem ini aja sayangg

kamu bukan mesin yang harus selalu produktif. nilai diri kamu ngga ditentukan dari berapa banyak yang bisa kamu selesaikan dalam sehari.

semua usaha kamu ada artinya koo dan aku yakin kamu pasti mengusahakan semuanya dengan maksimall. makanya sekarang, kamu boleh istirahat dan jadiin diri kamu prioritas sayangg`
  },
  lamp: {
    title: 'A Dimmed Light',
    subtitle: 'Cahaya kecil peneman malam yang sunyi',
    body: `ngga semua hari harus terasa indah. ada hari yang tugasnya cuma dilewati, dan itu gapapaa

kalo semuanya terasa berat, kita lewati pelan-pelan yaaa. kamu ngga harus melihat dan memikirkan seluruh jalan sekarang untuk mengambil satu langkah.

aku tetap dukung kamu sayangg.`
  }
});

export const REST_CARD_COPY = Object.freeze({
  title: 'Selamat Istirahat, Sayang',
  subtitle: 'Pintu kamar ini selalu terbuka kapan pun kamu butuh',
  body: `makasih ya udah mampir sebentar, sayang.
kamu ngga harus menyelesaikan semuanya malam ini.
istirahat dulu, ya. aku di sini.
ngga perlu bales apa-apa kok.

i love you<3.`
});
