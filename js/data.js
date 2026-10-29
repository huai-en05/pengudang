/* =========================================================
   SITE CONTENT — edit this file to update the website.
   Every text has an English (en) and Bahasa Indonesia (id) version.
   Images: drop files into /images with the file names below.
   If an image is missing, a placeholder is shown automatically.
   ========================================================= */

/* ---- Contact ----
   whatsapp / email: where booking requests are sent. Bookings open WhatsApp
   with a pre-filled message (international format, digits only, e.g. "6281234567890").
   If whatsapp is empty, the email is used instead; if both are empty the form
   says booking isn't connected yet.
   The rest is what the footer shows. The phone, email and social accounts below
   are SAMPLE details. Replace them with the real ones before launch. */
const CONTACT = {
  whatsapp: "",
  email: "",
  phoneDisplay: "+62 812 3456 7890",
  phoneLink: "+6281234567890",
  emailDisplay: "hello@frompengudang.com",
  address: { en: "Desa Pengudang, Teluk Sebong, Bintan, Riau Islands, Indonesia", id: "Desa Pengudang, Teluk Sebong, Bintan, Kepulauan Riau, Indonesia" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pengudang%2C%20Bintan%2C%20Indonesia",
  hours: { en: "Classes Saturday to Thursday · Closed on Fridays", id: "Kelas Sabtu sampai Kamis · Tutup hari Jumat" }
};

const SOCIALS = [
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/frompengudang" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/frompengudang" },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@frompengudang" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@frompengudang" },
  { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/6281234567890" }
];

/* ---- Cooking classes ----
   price: per person, in Indonesian Rupiah.
   schedule: which weekdays the class runs (0 = Sunday … 6 = Saturday),
   the start times, and how many guests fit in one session.
   The class page builds its availability calendar from this. */
const CURRENCY = "IDR";

/* Days when no class runs at all (village events, public holidays). YYYY-MM-DD */
const CLOSED_DATES = ["2026-12-25", "2027-01-01", "2027-03-10", "2027-03-11"];

const CLASSES = [
  {
    id: "seafood",
    image: "images/classes/seafood.jpg",
    ibu: 1,
    name: { en: "Fisherman's Catch: Shore-to-Grill Seafood Class", id: "Hasil Tangkapan Nelayan: Kelas Seafood dari Pantai ke Panggangan" },
    short: { en: "Fisherman's Catch", id: "Hasil Tangkapan Nelayan" },
    dishes: ["otak-otak", "ikan-bakar"],
    price: 450000,
    rating: 4.9, reviewCount: 38,
    durationHours: 3.5,
    duration: { en: "3.5 hours", id: "3,5 jam" },
    schedule: { days: [0, 2, 4, 6], times: ["07:30"], capacity: 8 },
    summary: {
      en: "Meet the boats at the river mouth, pick your fish with Ibu Rohani, then pound, wrap and grill otak-otak and ikan bakar over coconut-husk charcoal.",
      id: "Sambut perahu di muara, pilih ikan bersama Ibu Rohani, lalu tumbuk, bungkus dan bakar otak-otak serta ikan bakar di atas arang batok kelapa."
    },
    highlights: {
      en: [
        "Choose fresh fish straight from the morning's boats at Muara Pengudang",
        "Make otak-otak from scratch: scrape, pound, season and wrap in banana leaf",
        "Grill a whole ikan bakar over coconut-husk charcoal",
        "Grind your own sambal on a stone cobek",
        "Eat everything you cooked together at Ibu's table"
      ],
      id: [
        "Pilih ikan segar langsung dari perahu pagi di Muara Pengudang",
        "Buat otak-otak dari awal: kerok, tumbuk, bumbui dan bungkus dengan daun pisang",
        "Bakar ikan utuh di atas arang batok kelapa",
        "Ulek sambal sendiri di cobek batu",
        "Santap semua masakan bersama di meja Ibu"
      ]
    },
    description: {
      en: [
        "Start your morning the way Pengudang does: at the river mouth, as the fishing boats come in. Ibu Rohani has bought fish here for more than thirty years, and she'll show you how to tell a fish caught that morning from one that's been waiting on ice.",
        "Back in her open-air kitchen, you'll scrape mackerel from the bone and pound it into a smooth paste for otak-otak, season it with coconut milk, shallots and garlic, and fold it into banana leaf parcels. While they grill, you'll marinate a whole fish for ikan bakar and learn to read the charcoal so the skin chars but the flesh stays juicy.",
        "The class ends the way every good meal in the village does: everyone sits down together to eat what they made, with rice, sambal and plenty of stories. You'll leave with the recipes and a stamp in your Pengudang Passport."
      ],
      id: [
        "Mulailah pagi seperti warga Pengudang: di muara, saat perahu nelayan pulang. Ibu Rohani sudah membeli ikan di sini lebih dari tiga puluh tahun, dan ia akan menunjukkan cara membedakan ikan tangkapan pagi itu dari ikan yang sudah lama di es.",
        "Di dapur terbukanya, Anda akan mengerok ikan tenggiri dari tulangnya dan menumbuknya hingga halus untuk otak-otak, membumbuinya dengan santan, bawang merah dan bawang putih, lalu membungkusnya dengan daun pisang. Sambil dibakar, Anda akan membumbui ikan utuh untuk ikan bakar dan belajar membaca bara agar kulitnya kecokelatan tapi dagingnya tetap juicy.",
        "Kelas ditutup seperti setiap makan enak di kampung: semua duduk bersama menyantap hasil masakan, dengan nasi, sambal dan banyak cerita. Anda pulang membawa resep dan sebuah cap di Paspor Pengudang."
      ]
    },
    includes: {
      en: ["Hands-on cooking class with a local Ibu", "Visit to the fish landing at the river mouth", "All ingredients and equipment", "Full meal of everything you cook, with rice and sambal", "Iced tea, coffee and drinking water", "Printed recipe cards", "Pengudang Passport stamp"],
      id: ["Kelas memasak langsung bersama Ibu", "Kunjungan ke tempat pendaratan ikan di muara", "Semua bahan dan peralatan", "Makan lengkap dari semua masakan Anda, dengan nasi dan sambal", "Es teh, kopi dan air minum", "Kartu resep cetak", "Cap Paspor Pengudang"]
    },
    notIncluded: {
      en: ["Hotel transfers (we can help you arrange a driver)", "Tips (optional)"],
      id: ["Antar-jemput hotel (kami bisa bantu mengatur sopir)", "Tip (opsional)"]
    },
    itinerary: [
      { time: "07:30", title: { en: "Meet at Muara Pengudang", id: "Bertemu di Muara Pengudang" }, text: { en: "Welcome coffee and introductions by the water as the boats come in.", id: "Kopi sambutan dan perkenalan di tepi air saat perahu datang." } },
      { time: "08:00", title: { en: "Choose the catch", id: "Memilih ikan" }, text: { en: "Pick your fish with Ibu Rohani and learn what makes a good one.", id: "Pilih ikan bersama Ibu Rohani dan pelajari ciri ikan yang bagus." } },
      { time: "08:30", title: { en: "Otak-otak from scratch", id: "Otak-otak dari awal" }, text: { en: "Scrape, pound, season and wrap your fish paste in banana leaf.", id: "Kerok, tumbuk, bumbui dan bungkus adonan ikan dengan daun pisang." } },
      { time: "09:45", title: { en: "Fire up the grill", id: "Menyalakan panggangan" }, text: { en: "Marinate and grill ikan bakar, and grind sambal on the cobek.", id: "Bumbui dan bakar ikan, lalu ulek sambal di cobek." } },
      { time: "10:30", title: { en: "Eat together", id: "Makan bersama" }, text: { en: "Sit down at Ibu's table and share everything you made.", id: "Duduk di meja Ibu dan nikmati semua masakan bersama." } }
    ],
    meetingPoint: {
      en: "Fish landing jetty at Muara Pengudang (the river mouth). Ibu Rohani will be waiting by the blue boat shed. The kitchen is a 5-minute walk away.",
      id: "Dermaga pendaratan ikan di Muara Pengudang. Ibu Rohani akan menunggu di dekat gudang perahu biru. Dapur berjarak 5 menit jalan kaki."
    },
    bring: { en: ["Comfortable shoes that can get a little wet", "Sun hat and sunscreen", "An appetite"], id: ["Sepatu nyaman yang boleh sedikit basah", "Topi dan tabir surya", "Perut yang lapar"] },
    notAllowed: { en: ["Alcohol", "Pets"], id: ["Minuman beralkohol", "Hewan peliharaan"] },
    know: {
      en: ["The fish depends on what the boats bring in; if the sea is rough, Ibu uses fish bought the evening before", "Not suitable for people with fish or shellfish allergies", "Children aged 6 and up are welcome with an adult", "Please dress modestly (shoulders and knees covered) in the village"],
      id: ["Jenis ikan tergantung hasil tangkapan; jika laut berombak, Ibu memakai ikan yang dibeli malam sebelumnya", "Tidak cocok untuk yang alergi ikan atau kerang", "Anak usia 6 tahun ke atas boleh ikut bersama orang dewasa", "Mohon berpakaian sopan (bahu dan lutut tertutup) di kampung"]
    }
  },
  {
    id: "home",
    image: "images/classes/home-cooking.jpg",
    ibu: 0,
    name: { en: "Village Home Kitchen: Family Lunch Cooking Class", id: "Dapur Rumah Kampung: Kelas Memasak Makan Siang Keluarga" },
    short: { en: "Village Home Kitchen", id: "Dapur Rumah Kampung" },
    dishes: ["nasi-uduk", "ayam-goreng", "urap"],
    price: 400000,
    rating: 4.8, reviewCount: 52,
    durationHours: 3,
    duration: { en: "3 hours", id: "3 jam" },
    schedule: { days: [0, 1, 3, 4, 6], times: ["10:00", "15:00"], capacity: 10 },
    summary: {
      en: "Cook a complete Pengudang family lunch with Ibu Siti Aminah: coconut rice, twice-cooked spiced chicken and urap, then eat together in her home.",
      id: "Masak makan siang keluarga khas Pengudang bersama Ibu Siti Aminah: nasi uduk, ayam goreng bumbu kuning dan urap, lalu makan bersama di rumahnya."
    },
    highlights: {
      en: [
        "Cook in a real village home, not a restaurant kitchen",
        "Grind bumbu kuning, the yellow spice paste behind Indonesian fried chicken",
        "Steam fragrant nasi uduk with coconut milk, pandan and lemongrass",
        "Toss a fresh urap of village vegetables and spiced coconut",
        "Share a family-style lunch at Ibu's table"
      ],
      id: [
        "Memasak di rumah warga sungguhan, bukan dapur restoran",
        "Ulek bumbu kuning, rahasia ayam goreng Indonesia",
        "Kukus nasi uduk harum dengan santan, pandan dan serai",
        "Aduk urap segar dari sayuran kampung dan kelapa berbumbu",
        "Makan siang bersama ala keluarga di meja Ibu"
      ]
    },
    description: {
      en: [
        "This is the meal Ibu Siti Aminah has cooked for her family almost every day for forty years, and the one her grandchildren ask for when they come home. Step into her kitchen, tie on an apron, and cook it with her from start to finish.",
        "You'll grind turmeric, galangal and candlenut into bumbu kuning and simmer chicken in it until the spices reach the bone, then fry it until crisp. While the rice steams in coconut milk with pandan and lemongrass, you'll blanch long beans and greens from the village and toss them with spiced grated coconut to make urap.",
        "Ibu's kitchen is chatty and relaxed, and there's no such thing as a wrong question. When everything's ready, the dishes go out on the mat and everyone eats together, family style."
      ],
      id: [
        "Inilah hidangan yang dimasak Ibu Siti Aminah untuk keluarganya hampir setiap hari selama empat puluh tahun, dan yang selalu diminta cucu-cucunya saat pulang. Masuklah ke dapurnya, pakai celemek, dan masak bersamanya dari awal sampai akhir.",
        "Anda akan mengulek kunyit, lengkuas dan kemiri menjadi bumbu kuning lalu merebus ayam di dalamnya sampai bumbu meresap ke tulang, kemudian menggorengnya hingga renyah. Sambil nasi dikukus dengan santan, pandan dan serai, Anda akan merebus kacang panjang dan sayuran kampung lalu mengaduknya dengan kelapa parut berbumbu menjadi urap.",
        "Dapur Ibu santai dan penuh obrolan, dan tidak ada pertanyaan yang salah. Setelah semua siap, hidangan disajikan di tikar dan semua makan bersama ala keluarga."
      ]
    },
    includes: {
      en: ["Hands-on cooking class in a village home", "All ingredients and equipment", "Family-style lunch or early dinner of everything you cook", "Iced tea, coffee and drinking water", "Printed recipe cards", "Pengudang Passport stamp"],
      id: ["Kelas memasak langsung di rumah warga", "Semua bahan dan peralatan", "Makan siang atau makan malam awal ala keluarga dari semua masakan Anda", "Es teh, kopi dan air minum", "Kartu resep cetak", "Cap Paspor Pengudang"]
    },
    notIncluded: {
      en: ["Hotel transfers (we can help you arrange a driver)", "Tips (optional)"],
      id: ["Antar-jemput hotel (kami bisa bantu mengatur sopir)", "Tip (opsional)"]
    },
    itinerary: [
      { time: { en: "Start", id: "Mulai" }, title: { en: "Welcome to Ibu's home", id: "Selamat datang di rumah Ibu" }, text: { en: "Iced tea, introductions and a look at the day's ingredients.", id: "Es teh, perkenalan dan melihat bahan-bahan hari itu." } },
      { time: { en: "+20 min", id: "+20 mnt" }, title: { en: "Bumbu kuning", id: "Bumbu kuning" }, text: { en: "Grind the spice paste and set the chicken simmering.", id: "Ulek bumbu dan rebus ayam." } },
      { time: { en: "+1 hr", id: "+1 jam" }, title: { en: "Nasi uduk and urap", id: "Nasi uduk dan urap" }, text: { en: "Steam the coconut rice and prepare the vegetables and spiced coconut.", id: "Kukus nasi uduk dan siapkan sayuran serta kelapa berbumbu." } },
      { time: { en: "+1 hr 45", id: "+1 jam 45" }, title: { en: "Fry and plate", id: "Goreng dan sajikan" }, text: { en: "Fry the chicken until crisp and set the table.", id: "Goreng ayam hingga renyah dan tata hidangan." } },
      { time: { en: "+2 hr 15", id: "+2 jam 15" }, title: { en: "Eat together", id: "Makan bersama" }, text: { en: "Family-style meal with Ibu and her family.", id: "Makan bersama Ibu dan keluarganya." } }
    ],
    meetingPoint: {
      en: "Ibu Siti Aminah's house, the yellow stilt house beside the village mosque in Pengudang. Drivers know it as Rumah Ibu Siti, Masjid Pengudang.",
      id: "Rumah Ibu Siti Aminah, rumah panggung kuning di samping masjid Pengudang. Sopir mengenalnya sebagai Rumah Ibu Siti, Masjid Pengudang."
    },
    bring: { en: ["Comfortable clothes", "Insect repellent for the afternoon session"], id: ["Pakaian yang nyaman", "Lotion anti nyamuk untuk sesi sore"] },
    notAllowed: { en: ["Alcohol", "Shoes inside the house"], id: ["Minuman beralkohol", "Alas kaki di dalam rumah"] },
    know: {
      en: ["Vegetarian version available (tofu and tempeh instead of chicken). Tell us when you book", "Halal kitchen", "Children of all ages welcome", "Please dress modestly (shoulders and knees covered) in the village"],
      id: ["Tersedia versi vegetarian (tahu dan tempe sebagai pengganti ayam), beri tahu kami saat memesan", "Dapur halal", "Anak-anak segala usia dipersilakan", "Mohon berpakaian sopan (bahu dan lutut tertutup) di kampung"]
    }
  },
  {
    id: "sweet",
    image: "images/classes/kueh-lapis.jpg",
    ibu: 0,
    name: { en: "Layers of Sweetness: Kueh Lapis & Amplang Workshop", id: "Lapisan Manis: Lokakarya Kueh Lapis & Amplang" },
    short: { en: "Layers of Sweetness", id: "Lapisan Manis" },
    dishes: ["kueh-lapis", "keropok-amplang"],
    price: 300000,
    rating: 5.0, reviewCount: 24,
    durationHours: 2.5,
    duration: { en: "2.5 hours", id: "2,5 jam" },
    schedule: { days: [0, 2, 4, 6], times: ["14:30"], capacity: 10 },
    summary: {
      en: "Steam rainbow kueh lapis one layer at a time and fry crunchy fish amplang to take home. A slow, chatty afternoon class that's great for families.",
      id: "Kukus kueh lapis pelangi selapis demi selapis dan goreng amplang ikan yang renyah untuk dibawa pulang. Kelas sore yang santai, cocok untuk keluarga."
    },
    highlights: {
      en: [
        "Steam a nine-layer kueh lapis in pandan green and rose pink",
        "Shape and fry keropok amplang, the village's favourite tea-time snack",
        "Afternoon tea with Ibu while your kueh cools",
        "Take home a box of everything you made",
        "Relaxed pace, perfect for kids and grandparents"
      ],
      id: [
        "Kukus kueh lapis sembilan lapis berwarna hijau pandan dan merah muda",
        "Bentuk dan goreng keropok amplang, camilan teh favorit kampung",
        "Minum teh sore bersama Ibu sambil menunggu kueh dingin",
        "Bawa pulang sekotak hasil buatan Anda",
        "Santai, cocok untuk anak-anak dan kakek-nenek"
      ]
    },
    description: {
      en: [
        "Kueh lapis takes patience: each layer of coconut-milk batter has to steam before the next one is poured on top. That makes it the perfect afternoon project, with plenty of time between layers to talk, sip tea and fry a batch of amplang.",
        "Ibu Siti Aminah will show you how to get the batter just right with rice flour, tapioca, coconut milk and pandan, how to colour the layers, and how to keep them perfectly even. In between, you'll mix and shape mackerel dough into little amplang crackers and fry them slowly until they puff up and turn golden.",
        "Once the kueh has cooled, you'll slice it, peel off a layer or two (everyone does), and pack the rest to take home."
      ],
      id: [
        "Kueh lapis butuh kesabaran: setiap lapisan adonan santan harus dikukus sebelum lapisan berikutnya dituang. Karena itu kueh ini cocok untuk kegiatan sore, dengan banyak waktu di antara lapisan untuk mengobrol, minum teh dan menggoreng amplang.",
        "Ibu Siti Aminah akan menunjukkan cara membuat adonan yang pas dari tepung beras, tapioka, santan dan pandan, cara mewarnai lapisan, dan cara menjaganya tetap rata. Di sela-selanya, Anda akan mencampur dan membentuk adonan ikan tenggiri menjadi amplang kecil lalu menggorengnya perlahan hingga mengembang dan keemasan.",
        "Setelah kueh dingin, Anda akan memotongnya, mengupas satu atau dua lapis (semua orang melakukannya), dan mengemas sisanya untuk dibawa pulang."
      ]
    },
    includes: {
      en: ["Hands-on baking class with a local Ibu", "All ingredients and equipment", "Afternoon tea and snacks", "A take-home box of kueh lapis and amplang", "Printed recipe cards", "Pengudang Passport stamp"],
      id: ["Kelas membuat kue langsung bersama Ibu", "Semua bahan dan peralatan", "Teh sore dan camilan", "Sekotak kueh lapis dan amplang untuk dibawa pulang", "Kartu resep cetak", "Cap Paspor Pengudang"]
    },
    notIncluded: {
      en: ["Hotel transfers (we can help you arrange a driver)", "A full meal (this is a snack and dessert class)"],
      id: ["Antar-jemput hotel (kami bisa bantu mengatur sopir)", "Makan besar (ini kelas camilan dan kue)"]
    },
    itinerary: [
      { time: "14:30", title: { en: "Tea and batter", id: "Teh dan adonan" }, text: { en: "Mix and colour the kueh lapis batter.", id: "Campur dan beri warna adonan kueh lapis." } },
      { time: "14:50", title: { en: "Layer by layer", id: "Selapis demi selapis" }, text: { en: "Start steaming; a new layer goes on every few minutes.", id: "Mulai mengukus; lapisan baru dituang setiap beberapa menit." } },
      { time: "15:30", title: { en: "Amplang", id: "Amplang" }, text: { en: "Shape and slow-fry fish crackers between layers.", id: "Bentuk dan goreng perlahan amplang di sela lapisan." } },
      { time: "16:30", title: { en: "Slice, taste, pack", id: "Potong, cicipi, kemas" }, text: { en: "Cut the cooled kueh, taste everything and box it up.", id: "Potong kueh yang sudah dingin, cicipi dan kemas." } }
    ],
    meetingPoint: {
      en: "Ibu Siti Aminah's house, the yellow stilt house beside the village mosque in Pengudang.",
      id: "Rumah Ibu Siti Aminah, rumah panggung kuning di samping masjid Pengudang."
    },
    bring: { en: ["A bag to carry your treats home", "Comfortable clothes"], id: ["Tas untuk membawa pulang kue", "Pakaian yang nyaman"] },
    notAllowed: { en: ["Alcohol", "Shoes inside the house"], id: ["Minuman beralkohol", "Alas kaki di dalam rumah"] },
    know: {
      en: ["Amplang contains fish and egg; kueh lapis is vegan and gluten-free", "Halal kitchen", "Children of all ages welcome; under-12s must cook with an adult", "Please dress modestly (shoulders and knees covered) in the village"],
      id: ["Amplang mengandung ikan dan telur; kueh lapis vegan dan bebas gluten", "Dapur halal", "Anak-anak segala usia dipersilakan; di bawah 12 tahun harus bersama orang dewasa", "Mohon berpakaian sopan (bahu dan lutut tertutup) di kampung"]
    }
  }
];

/* ---- Menu ---- */
const MENU_CATEGORIES = [
  { id: "starters", name: { en: "Starters", id: "Hidangan Pembuka" }, dishes: ["otak-otak", "keropok-amplang"] },
  { id: "mains", name: { en: "Mains", id: "Hidangan Utama" }, dishes: ["ikan-bakar", "ayam-goreng", "nasi-uduk", "urap"] },
  { id: "dessert", name: { en: "Dessert", id: "Hidangan Penutup" }, dishes: ["kueh-lapis"] }
];

const DISHES = {
  "otak-otak": {
    name: "Otak-Otak",
    image: "images/dishes/otak-otak.jpg",
    story: {
      en: "Otak-otak is a grilled fish cake from Indonesian coastal cooking. Fish paste is seasoned, wrapped in banana leaf and cooked over charcoal. The name means “brains” in Indonesian, which is usually explained as a reference to the paste’s soft, springy texture. Versions are found across Indonesia, and each region seasons it a little differently.",
      id: "Otak-otak adalah kue ikan bakar dari masakan pesisir Indonesia. Adonan ikan dibumbui, dibungkus daun pisang lalu dibakar di atas arang. Namanya berarti “otak” dalam bahasa Indonesia, yang biasanya dikaitkan dengan teksturnya yang lembut dan kenyal. Otak-otak ada di banyak daerah di Indonesia, dan setiap daerah membumbuinya sedikit berbeda."
    },
    ingredients: {
      en: "Fresh mackerel, scraped from the bone and pounded into a smooth paste. It is mixed with coconut milk, garlic, shallots and pepper, and tapioca starch is often added to hold it together. Banana leaf holds the mixture in shape and gives the finished parcel a light smoky aroma.",
      id: "Ikan tenggiri segar, dikerok dari tulangnya dan ditumbuk hingga halus. Adonan dicampur santan, bawang putih, bawang merah dan merica, dan sering ditambah tepung tapioka agar menyatu. Daun pisang menjaga bentuk adonan dan memberi aroma asap yang ringan."
    }
  },
  "keropok-amplang": {
    name: "Keropok Amplang",
    image: "images/dishes/keropok-amplang.jpg",
    story: {
      en: "Amplang are small, curly fish crackers that puff up and turn golden when fried. They are thought to come from East Kalimantan, but they are now a favourite snack all along Indonesia’s coasts, sold in jars and plastic tubs in almost every seaside shop. They are what you reach for with a cup of tea in the afternoon.",
      id: "Amplang adalah kerupuk ikan kecil berbentuk melengkung yang mengembang dan menjadi keemasan saat digoreng. Amplang diyakini berasal dari Kalimantan Timur, tetapi kini menjadi camilan favorit di sepanjang pesisir Indonesia dan dijual di hampir setiap warung tepi laut. Teman yang pas untuk secangkir teh di sore hari."
    },
    ingredients: {
      en: "White fish such as mackerel, mixed with tapioca flour, garlic, egg and a little sugar and salt. The dough is rolled into small pieces and fried slowly, so the crackers puff up from the inside and stay crunchy.",
      id: "Ikan berdaging putih seperti tenggiri, dicampur tepung tapioka, bawang putih, telur serta sedikit gula dan garam. Adonan dibentuk kecil-kecil lalu digoreng perlahan agar mengembang dari dalam dan tetap renyah."
    }
  },
  "ikan-bakar": {
    name: "Ikan Bakar",
    image: "images/dishes/ikan-bakar.jpg",
    story: {
      en: "Ikan bakar simply means “grilled fish”, and in a fishing village it is the most natural meal there is. Whole fish from the morning’s boats are rubbed with spice paste and cooked over coconut-husk charcoal until the skin chars and the flesh stays moist. It is always eaten with sambal, rice and plenty of company.",
      id: "Ikan bakar adalah hidangan paling alami di kampung nelayan. Ikan utuh dari perahu pagi dilumuri bumbu lalu dibakar di atas arang batok kelapa hingga kulitnya kecokelatan dan dagingnya tetap lembut. Selalu disantap bersama sambal, nasi dan banyak teman."
    },
    ingredients: {
      en: "A whole fresh fish, marinated in a paste of shallots, garlic, chilli, turmeric and lime, then brushed with sweet soy sauce (kecap manis) as it grills.",
      id: "Ikan segar utuh, dibumbui dengan bawang merah, bawang putih, cabai, kunyit dan jeruk nipis, lalu diolesi kecap manis selama dibakar."
    }
  },
  "ayam-goreng": {
    name: "Ayam Goreng",
    image: "images/dishes/ayam-goreng.jpg",
    story: {
      en: "Indonesian fried chicken is cooked twice. The chicken is first simmered in a yellow spice broth until the flavour soaks right to the bone, and only then fried until crisp. It is a dish for family gatherings, and every household has its own version of the spice paste.",
      id: "Ayam goreng Indonesia dimasak dua kali. Ayam direbus dulu dalam bumbu kuning hingga meresap sampai ke tulang, baru kemudian digoreng hingga renyah. Hidangan ini selalu ada saat keluarga berkumpul, dan setiap rumah punya racikan bumbunya sendiri."
    },
    ingredients: {
      en: "Chicken simmered in bumbu kuning: turmeric, coriander, galangal, lemongrass, candlenut, garlic and shallots, with bay leaves (daun salam). The spice crumbs left in the pot are often fried too and sprinkled on top.",
      id: "Ayam yang direbus dalam bumbu kuning: kunyit, ketumbar, lengkuas, serai, kemiri, bawang putih dan bawang merah, dengan daun salam. Remah bumbu yang tersisa sering ikut digoreng dan ditaburkan di atasnya."
    }
  },
  "nasi-uduk": {
    name: "Nasi Uduk",
    image: "images/dishes/nasi-uduk.jpg",
    story: {
      en: "Nasi uduk is rice cooked in coconut milk with fragrant leaves, so every grain comes out rich and gently perfumed. It comes from the Betawi people of Jakarta and is now eaten across Indonesia, usually for breakfast, with fried chicken, egg, sambal and crackers on the side.",
      id: "Nasi uduk adalah nasi yang dimasak dengan santan dan daun-daun harum, sehingga setiap butirnya gurih dan wangi. Nasi uduk berasal dari masyarakat Betawi di Jakarta dan kini disantap di seluruh Indonesia, biasanya untuk sarapan, bersama ayam goreng, telur, sambal dan kerupuk."
    },
    ingredients: {
      en: "Rice steamed in coconut milk with lemongrass, pandan leaf, bay leaves (daun salam) and a pinch of salt. Fried shallots are scattered on top before serving.",
      id: "Beras yang dikukus dengan santan, serai, daun pandan, daun salam dan sejumput garam. Bawang goreng ditaburkan di atasnya sebelum disajikan."
    }
  },
  "urap": {
    name: "Urap",
    image: "images/dishes/urap.jpg",
    story: {
      en: "Urap is a salad of blanched vegetables tossed with spiced grated coconut. It is light, fresh and a little smoky, and it balances out the richer dishes on the table. In Java it is also one of the dishes placed around the tumpeng, the cone of rice served at celebrations.",
      id: "Urap adalah sayuran rebus yang diaduk dengan kelapa parut berbumbu. Rasanya ringan, segar dan sedikit berasap, menyeimbangkan hidangan lain yang lebih gurih. Di Jawa, urap juga menjadi salah satu lauk yang mengelilingi tumpeng pada acara syukuran."
    },
    ingredients: {
      en: "Long beans, spinach, bean sprouts and cabbage, mixed with grated coconut that has been steamed with chilli, garlic, shallots, kaffir lime leaf and a little palm sugar.",
      id: "Kacang panjang, bayam, tauge dan kol, dicampur kelapa parut yang dikukus bersama cabai, bawang putih, bawang merah, daun jeruk dan sedikit gula merah."
    }
  },
  "kueh-lapis": {
    name: "Kueh Lapis",
    image: "images/dishes/kueh-lapis.jpg",
    story: {
      en: "Kueh lapis is a soft, layered steamed cake. Each layer is poured and steamed before the next one goes on, so making it takes patience. Children love peeling it apart one thin layer at a time, and almost everyone you meet will admit to having done the same.",
      id: "Kueh lapis adalah kue kukus berlapis yang lembut. Setiap lapisan dituang dan dikukus sebelum lapisan berikutnya ditambahkan, jadi membuatnya butuh kesabaran. Anak-anak suka mengupasnya selapis demi selapis, dan hampir semua orang akan mengaku pernah melakukan hal yang sama."
    },
    ingredients: {
      en: "Rice flour and tapioca flour, coconut milk, sugar and pandan. Part of the batter is coloured, usually red and green, and the colours are steamed in alternating layers.",
      id: "Tepung beras dan tepung tapioka, santan, gula dan pandan. Sebagian adonan diberi warna, biasanya merah dan hijau, lalu dikukus berlapis-lapis bergantian."
    }
  }
};

/* ---- Ibus (teachers) ----
   Portraits are illustrations for now. Swap in a photo (e.g. images/ibus/ibu-1.jpg) when you have one. */
const IBUS = [
  {
    image: "images/graphics/ibu-1.svg",
    name: "Ibu Siti Aminah",
    bio: {
      en: "Ibu Siti Aminah is known across the village for her ayam goreng, a recipe her family has made for generations. She says the secret is patience and a little love, and she’ll gladly tell you the rest if you stay for tea. With a warm laugh and endless stories, she makes every guest feel like one of her own children. She loves teaching, and she’ll gently guide your hands, correct your chopping, and make sure you leave with a full stomach and a few new recipes in your heart.",
      id: "Ibu Siti Aminah dikenal di seluruh kampung dengan ayam gorengnya, resep yang dibuat keluarganya turun-temurun. Katanya rahasianya adalah kesabaran dan sedikit cinta, dan ia dengan senang hati akan menceritakan sisanya jika Anda mampir minum teh. Dengan tawa yang hangat dan cerita yang tak ada habisnya, ia membuat setiap tamu merasa seperti anaknya sendiri. Ia senang mengajar, dengan sabar menuntun tangan Anda, membetulkan cara Anda memotong, dan memastikan Anda pulang dengan perut kenyang dan beberapa resep baru di hati."
    }
  },
  {
    image: "images/graphics/ibu-2.svg",
    name: "Ibu Rohani",
    bio: {
      en: "Ibu Rohani has lived in the village all her life. She learned to cook at her own mother’s side, standing on a stool by the stove long before she could see over the pot. Her days start early, often at the shore, where she picks out the freshest fish from the morning’s catch and trades news with the fishermen’s wives. Back in her kitchen, everything is done by feel: a pinch of this, a handful of that, tasted and adjusted until it’s just right. She never measures, but nothing ever comes out wrong.",
      id: "Ibu Rohani telah tinggal di kampung ini sepanjang hidupnya. Ia belajar memasak di samping ibunya sendiri, berdiri di atas bangku kecil di dekat tungku jauh sebelum bisa melihat isi panci. Harinya dimulai pagi-pagi, sering di pantai, memilih ikan paling segar dari hasil tangkapan pagi sambil bertukar kabar dengan para istri nelayan. Di dapurnya, semuanya dilakukan dengan perasaan: sejumput ini, segenggam itu, dicicipi dan disesuaikan sampai pas. Ia tak pernah menakar, tapi hasilnya tak pernah salah."
    }
  }
];

/* ---- Reviews ---- (class = which class the review is about) */
const REVIEWS = [
  {
    image: "images/reviews/review-1.jpg",
    name: "Jack, 54 · Australia",
    class: "seafood",
    stars: 5,
    text: {
      en: "We had a blast learning to cook with Ibu! The whole process was fun and informative, and the food was delicious too. We highly recommend this experience to anyone looking for authentic food or just a hands on learning experience!",
      id: "Kami sangat senang belajar memasak bersama Ibu! Seluruh prosesnya seru dan penuh ilmu, dan makanannya juga lezat. Kami sangat merekomendasikan pengalaman ini bagi siapa saja yang mencari makanan autentik atau sekadar pengalaman belajar langsung!"
    }
  },
  {
    image: "images/reviews/review-2.jpg",
    name: "Mei Ling, 31 · Singapore",
    class: "home",
    stars: 5,
    text: {
      en: "The best thing we did on Bintan. Ibu Siti's kitchen felt like visiting family. I finally understand why my ayam goreng never tasted right, and I've made her urap three times since we got home.",
      id: "Hal terbaik yang kami lakukan di Bintan. Dapur Ibu Siti terasa seperti mengunjungi keluarga. Akhirnya saya mengerti kenapa ayam goreng saya tidak pernah pas, dan saya sudah membuat urapnya tiga kali sejak pulang."
    }
  },
  {
    image: "images/reviews/review-3.jpg",
    name: "Dewi & Arif · Batam",
    class: "sweet",
    stars: 5,
    text: {
      en: "We brought our two kids and their grandmother, and all three generations had a great time. The kids were so proud of their kueh lapis, and Ibu was endlessly patient with them.",
      id: "Kami membawa dua anak dan nenek mereka, dan ketiga generasi sangat senang. Anak-anak bangga sekali dengan kueh lapis buatan mereka, dan Ibu sangat sabar menghadapi mereka."
    }
  }
];

/* ---- Landmarks (map + passport stamps) ----
   x / y = marker position on the map illustration, in % */
const LANDMARKS = [
  {
    id: "birds-nest",
    x: 32, y: 34,
    image: "images/landmarks/birds-nest-farm.jpg",
    name: { en: "Birds’ Nest Farm", id: "Rumah Walet" },
    text: {
      en: [
        "Our swiftlet house is a tall, windowless building at the edge of the village, made to feel like the dark, cool caves where swiftlets nest in the wild. Inside, the air is kept warm, humid and still, and the walls and wooden beams give the birds plenty of places to build.",
        "Swiftlets cannot be kept or fed. They are wild birds that choose where to live. To invite them in, speakers on the roof play recordings of swiftlet calls, mostly in the early morning and at dusk when the birds are in flight. A swiftlet that hears these calls may circle the building, come inside to look around and, if it finds the right conditions, settle and begin to nest. It can take months or even years before the first pair arrives, which is why the work is patient and quiet."
      ],
      id: [
        "Rumah walet kami adalah bangunan tinggi tanpa jendela di tepi kampung, dibuat menyerupai gua gelap dan sejuk tempat walet bersarang di alam liar. Di dalamnya, udara dijaga tetap hangat, lembap dan tenang, dan dinding serta balok kayunya memberi banyak tempat bagi burung untuk bersarang.",
        "Walet tidak bisa dipelihara atau diberi makan. Mereka burung liar yang memilih sendiri tempat tinggalnya. Untuk mengundang mereka, pengeras suara di atap memutar rekaman suara walet, terutama pagi-pagi dan menjelang senja saat burung-burung terbang. Walet yang mendengar suara itu mungkin akan berputar di sekitar bangunan, masuk untuk melihat-lihat dan, jika kondisinya cocok, menetap dan mulai bersarang. Bisa butuh berbulan-bulan bahkan bertahun-tahun sampai pasangan pertama datang, karena itulah pekerjaan ini dilakukan dengan sabar dan tenang."
      ]
    }
  },
  {
    id: "mangroves",
    x: 70, y: 30,
    image: "images/landmarks/mangroves.jpg",
    name: { en: "Mangrove Forest", id: "Hutan Bakau" },
    text: {
      en: [
        "Along the river, the land gives way to a thick forest of mangroves standing on their tangled stilt roots. At high tide the water slips in between them; at low tide you can see crabs and mudskippers darting across the mud.",
        "The mangroves protect the village from storms and waves, and they are a nursery for the young fish and crabs that the fishermen depend on. Villagers take turns planting new seedlings each year, and guests are welcome to join in."
      ],
      id: [
        "Di sepanjang sungai, daratan berganti menjadi hutan bakau yang lebat dengan akar-akar tunjang yang saling berkait. Saat pasang, air menyelinap di antaranya; saat surut, Anda bisa melihat kepiting dan ikan glodok berlarian di lumpur.",
        "Hutan bakau melindungi kampung dari badai dan ombak, dan menjadi tempat tumbuh ikan dan kepiting muda yang menjadi tumpuan para nelayan. Warga bergiliran menanam bibit baru setiap tahun, dan tamu dipersilakan ikut menanam."
      ]
    }
  },
  {
    id: "river-mouth",
    x: 52, y: 80,
    image: "images/landmarks/river-mouth.jpg",
    name: { en: "Muara Pengudang", id: "Muara Pengudang" },
    text: {
      en: [
        "Muara Pengudang is where the river meets the sea, and where the village's day begins. Before sunrise the boats head out; by mid-morning they are back at the wooden jetty, and the catch is sorted, weighed and sold right there.",
        "It's also the village's favourite fishing spot. In the late afternoon you'll find kids and grandfathers alike sitting along the jetty with hand lines, waiting for a bite as the light turns gold."
      ],
      id: [
        "Muara Pengudang adalah tempat sungai bertemu laut, dan tempat hari di kampung dimulai. Sebelum matahari terbit perahu-perahu berangkat; menjelang siang mereka kembali ke dermaga kayu, dan hasil tangkapan dipilah, ditimbang dan dijual di sana.",
        "Muara juga tempat memancing favorit warga. Di sore hari, anak-anak hingga kakek-kakek duduk berjajar di dermaga dengan pancing tangan, menunggu umpan dimakan saat langit berubah keemasan."
      ]
    }
  },
  {
    id: "beach",
    x: 78, y: 64,
    image: "images/landmarks/beach.jpg",
    name: { en: "Seagrass Beach", id: "Pantai Padang Lamun" },
    text: {
      en: [
        "Just past the village, a quiet stretch of white sand and granite boulders looks out over shallow, clear water. Under the surface are wide seagrass meadows, which shelter fish, sea cucumbers and the occasional sea turtle.",
        "The village helps look after the seagrass by keeping boats and nets away from the meadows. Come at low tide to walk out across the sandbars, or at sunset to watch the fishing boats come home."
      ],
      id: [
        "Tak jauh dari kampung, hamparan pasir putih dan batu granit menghadap ke air dangkal yang jernih. Di bawah permukaannya ada padang lamun yang luas, tempat berlindung ikan, teripang dan sesekali penyu.",
        "Warga ikut menjaga padang lamun dengan menjauhkan perahu dan jaring dari area tersebut. Datanglah saat surut untuk berjalan di atas gosong pasir, atau saat senja untuk melihat perahu nelayan pulang."
      ]
    }
  }
];

/* ---- Other guests' pictures (map page) ---- */
const GUEST_PHOTOS = [
  "images/guests/guest-1.jpg",
  "images/guests/guest-2.jpg"
];

/* ---- Photo credits (shown on credits.html) ----
   Placeholder photos from Wikimedia Commons. Replace with your own photos and
   remove the matching line here. */
const PHOTO_CREDITS = [
  { file: "images/dishes/otak-otak.jpg", title: "Otak-Otak-Makassar.JPG", author: "Lofor", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Otak-Otak-Makassar.JPG" },
  { file: "images/dishes/keropok-amplang.jpg", title: "Amplang 001.jpg", author: "Tim WikiPuluran - WikiBanua", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Amplang_001.jpg" },
  { file: "images/dishes/ikan-bakar.jpg", title: "Gurame bakar kecap 2.JPG", author: "Gunawan Kartapranata", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gurame_bakar_kecap_2.JPG" },
  { file: "images/dishes/ayam-goreng.jpg", title: "Ayam goreng kalasan.JPG", author: "Midori", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Ayam_goreng_kalasan.JPG" },
  { file: "images/dishes/nasi-uduk.jpg, images/classes/home-cooking.jpg", title: "Nasi Uduk Box.jpg", author: "Gunawan Kartapranata", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Nasi_Uduk_Box.jpg" },
  { file: "images/dishes/urap.jpg", title: "Urap.JPG", author: "Gunawan Kartapranata", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Urap.JPG" },
  { file: "images/dishes/kueh-lapis.jpg, images/classes/kueh-lapis.jpg", title: "Kue Lapis.jpg", author: "Shitadevi", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Kue_Lapis.jpg" },
  { file: "images/classes/seafood.jpg", title: "Fishing boats on Bintan.jpg", author: "Nicolas Lannuzel", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Fishing_boats_on_Bintan.jpg" },
  { file: "images/landmarks/birds-nest-farm.jpg", title: "Kinarut Sabah Swiftlet-farm-01.jpg", author: "CEphoto, Uwe Aranas", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Kinarut_Sabah_Swiftlet-farm-01.jpg" },
  { file: "images/landmarks/mangroves.jpg", title: "Mangrove roots, Bintan Island, Indonesia.jpg", author: "Kento Ikeda", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Mangrove_roots,_Bintan_Island,_Indonesia.jpg" },
  { file: "images/landmarks/river-mouth.jpg", title: "Area Pemancingan Di Muara Pengudang", author: "Dj Onces Saputra", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Area_Pemancingan_Di_Muara_Pengudang_-_panoramio.jpg" },
  { file: "images/landmarks/beach.jpg", title: "Trikora Beach.jpg", author: "Adamina", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Trikora_Beach.jpg" },
  { file: "images/guests/guest-1.jpg", title: "Kelong 4.jpg", author: "Adamina", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Kelong_4.jpg" },
  { file: "images/guests/guest-2.jpg", title: "Bintan north beach.jpg", author: "Seader", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Bintan_north_beach.jpg" },
  { file: "images/reviews/review-1.jpg", title: "Ikan Bakar 3.jpg", author: "S Kartika", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ikan_Bakar_3.jpg" },
  { file: "images/reviews/review-2.jpg", title: "Otak-otak.JPG", author: "Unknown author", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Otak-otak.JPG" },
  { file: "images/reviews/review-3.jpg", title: "Bintan Village.jpg", author: "butterbeeee", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Bintan_Village.jpg" }
];
