/* =========================================================
   SITE CONTENT — edit this file to update the website.
   Every text has an English (en) and Bahasa Indonesia (id) version.
   Images: drop files into /images with the file names below.
   If an image is missing, a placeholder is shown automatically.
   ========================================================= */

/* ---- Booking contact ----
   Bookings open WhatsApp with a pre-filled message to this number.
   Use international format, digits only (e.g. "6281234567890").
   If whatsapp is empty, the email below is used instead. */
const CONTACT = {
  whatsapp: "",
  email: ""
};

/* ---- Cooking classes ---- */
const CLASSES = [
  {
    id: "seafood",
    image: "images/classes/seafood.jpg",
    name: { en: "Fisherman's Catch", id: "Hasil Tangkapan Nelayan" },
    dishes: ["otak-otak", "ikan-bakar"],
    duration: { en: "About 3 hours", id: "Sekitar 3 jam" },
    price: { en: "[Price] per person", id: "[Harga] per orang" },
    desc: {
      en: "Start the morning at the shore choosing fish from the day's catch, then pound, wrap and grill your own otak-otak and ikan bakar over charcoal with Ibu.",
      id: "Mulai pagi di pantai memilih ikan dari hasil tangkapan hari itu, lalu tumbuk, bungkus dan bakar otak-otak serta ikan bakar Anda sendiri di atas arang bersama Ibu."
    }
  },
  {
    id: "home",
    image: "images/classes/home-cooking.jpg",
    name: { en: "Village Home Kitchen", id: "Dapur Rumah Kampung" },
    dishes: ["nasi-uduk", "ayam-goreng", "urap"],
    duration: { en: "About 3 hours", id: "Sekitar 3 jam" },
    price: { en: "[Price] per person", id: "[Harga] per orang" },
    desc: {
      en: "Cook a full family lunch the way it's made every day in Pengudang: fragrant coconut rice, spiced fried chicken and urap, then sit down together to eat.",
      id: "Masak makan siang keluarga lengkap seperti yang dibuat setiap hari di Pengudang: nasi uduk yang harum, ayam goreng berbumbu dan urap, lalu duduk makan bersama."
    }
  },
  {
    id: "sweet",
    image: "images/classes/kueh-lapis.jpg",
    name: { en: "Layers of Sweetness", id: "Lapisan Manis" },
    dishes: ["kueh-lapis", "keropok-amplang"],
    duration: { en: "About 2.5 hours", id: "Sekitar 2,5 jam" },
    price: { en: "[Price] per person", id: "[Harga] per orang" },
    desc: {
      en: "Steam kueh lapis one colourful layer at a time and fry crunchy keropok amplang to take home. A slower, chattier class, perfect for families.",
      id: "Kukus kueh lapis selapis demi selapis dan goreng keropok amplang yang renyah untuk dibawa pulang. Kelas yang santai dan penuh cerita, cocok untuk keluarga."
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

/* ---- Ibus (teachers) ---- */
const IBUS = [
  {
    image: "images/ibus/ibu-1.jpg",
    name: "Ibu XXXX",
    bio: {
      en: "Ibu [Name] is known for her [signature dish], a recipe her family has made for generations. She says the secret is patience and a little love, and she’ll gladly tell you the rest if you stay for tea. With a warm laugh and endless stories, she makes every guest feel like one of her own children. She loves teaching, and she’ll gently guide your hands, correct your chopping, and make sure you leave with a full stomach and a few new recipes in your heart.",
      id: "Ibu [Nama] dikenal dengan [hidangan andalan]-nya, resep yang dibuat keluarganya turun-temurun. Katanya rahasianya adalah kesabaran dan sedikit cinta, dan ia dengan senang hati akan menceritakan sisanya jika Anda mampir minum teh. Dengan tawa yang hangat dan cerita yang tak ada habisnya, ia membuat setiap tamu merasa seperti anaknya sendiri. Ia senang mengajar, dengan sabar menuntun tangan Anda, membetulkan cara Anda memotong, dan memastikan Anda pulang dengan perut kenyang dan beberapa resep baru di hati."
    }
  },
  {
    image: "images/ibus/ibu-2.jpg",
    name: "Ibu XXXX",
    bio: {
      en: "Ibu [Name] has lived in the village all her life. She learned to cook at her own mother’s side, standing on a stool by the stove long before she could see over the pot. Her days start early, often at the shore, where she picks out the freshest fish from the morning’s catch and trades news with the fishermen’s wives. Back in her kitchen, everything is done by feel: a pinch of this, a handful of that, tasted and adjusted until it’s just right. She never measures, but nothing ever comes out wrong.",
      id: "Ibu [Nama] telah tinggal di kampung ini sepanjang hidupnya. Ia belajar memasak di samping ibunya sendiri, berdiri di atas bangku kecil di dekat tungku jauh sebelum bisa melihat isi panci. Harinya dimulai pagi-pagi, sering di pantai, memilih ikan paling segar dari hasil tangkapan pagi sambil bertukar kabar dengan para istri nelayan. Di dapurnya, semuanya dilakukan dengan perasaan: sejumput ini, segenggam itu, dicicipi dan disesuaikan sampai pas. Ia tak pernah menakar, tapi hasilnya tak pernah salah."
    }
  }
];

/* ---- Reviews ---- */
const REVIEWS = [
  {
    image: "images/reviews/review-1.jpg",
    name: "Jack, 54",
    stars: 5,
    text: {
      en: "We had a blast learning to cook with Ibu! The whole process was fun and informative, and the food was delicious too. We highly recommend this experience to anyone looking for authentic food or just a hands on learning experience!",
      id: "Kami sangat senang belajar memasak bersama Ibu! Seluruh prosesnya seru dan penuh ilmu, dan makanannya juga lezat. Kami sangat merekomendasikan pengalaman ini bagi siapa saja yang mencari makanan autentik atau sekadar pengalaman belajar langsung!"
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
    id: "landmark-2",
    x: 58, y: 28,
    image: "images/landmarks/landmark-2.jpg",
    name: { en: "[Landmark 2]", id: "[Tempat 2]" },
    text: { en: ["[Add a short description of this place.]"], id: ["[Tambahkan deskripsi singkat tempat ini.]"] }
  },
  {
    id: "landmark-3",
    x: 30, y: 58,
    image: "images/landmarks/landmark-3.jpg",
    name: { en: "[Landmark 3]", id: "[Tempat 3]" },
    text: { en: ["[Add a short description of this place.]"], id: ["[Tambahkan deskripsi singkat tempat ini.]"] }
  },
  {
    id: "landmark-4",
    x: 67, y: 62,
    image: "images/landmarks/landmark-4.jpg",
    name: { en: "[Landmark 4]", id: "[Tempat 4]" },
    text: { en: ["[Add a short description of this place.]"], id: ["[Tambahkan deskripsi singkat tempat ini.]"] }
  }
];

/* ---- Other guests' pictures (map page) ---- */
const GUEST_PHOTOS = [
  "images/guests/guest-1.jpg",
  "images/guests/guest-2.jpg"
];
