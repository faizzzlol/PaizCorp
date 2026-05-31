/**
 * ═══════════════════════════════════════════════════════════════
 *  pAIz Engine v5.3
 *  Reusable KB + logic for The Legend of Legiona / Paiz® Corp AI.
 *
 *  CHANGELOG v5.3 (2026.05.13)
 *  — Original changelog preserved, plus improvements:
 *    + New KB entries: paiz_construction, tl_railways, citizenship_process,
 *      tl_wallet, fnsmp_rules, isc_clearance, unemployment_era, sus_name_origin
 *    + Keyword expansions for existing entries
 *    + New BM detection words
 *    + Expanded chip sets
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  /* ── ROOTS ── */
  const GALLERY_ROOT = 'https://thelegendoflegiona.github.io/gallery';
  const ISC_ROOT     = 'https://thelegendoflegiona.github.io/isc';

  /* ── BM DETECTION (expanded) ── */
  const BM_WORDS = [
    'apa','siapa','macam','camne','mana','bila','kenapa','mcm','nk','nak','tak',
    'ada','tiada','boleh','bagus','habis','dah','okay','ok','sapa','la','lah',
    'kan','wei','weh','bro','sis','eh','ai','aiyo','aih','haah','memang','pun',
    'je','tau','tahu','cerita','kisah','sejarah','tentang','bercerita','tolong',
    'tanya','mintak','minta','bagi','buat','pergi','balik','masuk','keluar',
    'pasal','sebab','kerana','sampai','punya','kita','kami','korang','diorang',
    'dia','mereka','saya','aku','ko','awak','hang','den','wak','abang','kakak',
    'adik','tunjuk','gambar','tengok','lihat','cari','nombor','status','semak',
    'permohonan','warganegara','rakyat','cara','masalah','plugin','server',
    'join','laporan','ic','kad','pengenalan','daftar','semak ic',
    'takde','xde','xtau','xtahu','sbb','sebb','bab','pasal2','tlg','tolong','bg',
    'bagi','bgitu','begitu','camtu','mcmtu','nape','knp','knape','knaper','cover',
    'cover story','cerita pasal','info pasal','details pasal','ke','kah','dengan',
    'pula','mana satu','benda'
  ];

  function detectBM(q) {
    const w = q.toLowerCase().split(/\s+/);
    return w.some(x => BM_WORDS.includes(x)) ||
      /[a-z]+(lah|kan|la|wei|weh|ke|pun|je|dah|tak)$/.test(q.toLowerCase());
  }

  /* ── PORTALS (unchanged) ── */
  const PORTALS = [
    { tag:'NATION HOME',   name:'The Legend of Legiona',       url:'https://thelegendoflegiona.github.io/main/',                                  desc:'Main hub — history, network, founders, bento grid' },
    { tag:'GOVERNMENT',    name:'Government Portal',            url:'https://thelegendoflegiona.github.io/gov/',                                   desc:'Proclamation, history, departments, megaprojects' },
    { tag:'BLACK HOUSE',   name:'Office of the President',      url:'https://thelegendoflegiona.github.io/gov/black-house',                        desc:'The Black House — executive office of Faiz4224' },
    { tag:'INTELLIGENCE',  name:'ISC Portal',                   url:'https://thelegendoflegiona.github.io/isc/',                                   desc:'Internal Security Control — intelligence agency' },
    { tag:'ISC ARCHIVE',   name:'ISC National Transparency',    url:'https://thelegendoflegiona.github.io/isc/national/',                          desc:'Public records, TLIO history, operational timeline' },
    { tag:'ISC SEARCH',    name:'ISC Public Archive Search',    url:'https://thelegendoflegiona.github.io/isc/search/',                            desc:'Declassified missions, legal docs, incidents' },
    { tag:'CITIZENSHIP',   name:'Citizenship Portal',           url:'https://thelegendoflegiona.github.io/gov/systems/citizenship/',               desc:'Apply, renew, check eligibility and obligations' },
    { tag:'CITIZEN STATUS',name:'Citizenship Status Checker',   url:'https://thelegendoflegiona.github.io/gov/systems/citizenship/status',         desc:'Check application status by reference number' },
    { tag:'NIS PORTAL',    name:'National ID Portal',           url:'https://thelegendoflegiona.github.io/gov/systems/id/',                        desc:'THELOLGOV-NIS · National Identification System — ID services hub' },
    { tag:'NIS REGISTRY',  name:'Citizen Registry',             url:'https://thelegendoflegiona.github.io/gov/systems/id/registry',                desc:'Publicly verify any The LoL National ID number (THELOL-YYYY-#####)' },
    { tag:'NIS ID CARD',   name:'Digital ID Card Viewer',       url:'https://thelegendoflegiona.github.io/gov/systems/id/id-card',                 desc:'View your official digital NIC — enter your THELOL ID' },
    { tag:'LEGAL DOCS',    name:'Legal Archive',                url:'https://thelegendoflegiona.github.io/gov/systems/archives/',                  desc:'All acts, proclamations, decrees — searchable' },
    { tag:'HISTORY',       name:'About The LoL',                url:'https://thelegendoflegiona.github.io/main/about/',                            desc:'Full interactive national timeline — 7 chapters' },
    { tag:'GALLERY',       name:'Photo Gallery',                url:'https://thelegendoflegiona.github.io/gallery/',                               desc:'Complete photo archive 2020–2024, 8 eras' },
    { tag:'TRANSPORT',     name:'TL Railways',                  url:'https://thelegendoflegiona.github.io/tlrailways/',                            desc:'4 lines, TLSRL, Monorail, LRT, HSB' },
    { tag:'TLSRL',         name:'TLSRL Project Brief',          url:'https://faizzzlol.github.io/paizcorp/paizconstructions/tlsrl/',               desc:'4,800+ blocks rail link, full spec sheet' },
    { tag:'PAIZ CORP',     name:'Paiz® Corp Hub',               url:'https://faizzzlol.github.io/paizcorp/',                                      desc:'All 5 subsidiaries, ecosystem map, portfolio' },
    { tag:'RETAIL',        name:'Paiz Shop',                    url:'https://faizzzlol.github.io/paizcorp/paizshop/',                              desc:'Minecraft item store, diamond prices, order system' },
    { tag:'FOOD',          name:'Paiz Chicken',                 url:'https://faizzzlol.github.io/paizcorp/paizchicken/',                           desc:'Virtual food ordering across Skyxion' },
    { tag:'FILM STUDIO',   name:'PaizProductions',              url:'https://faizzzlol.github.io/paizcorp/paizproductions/',                       desc:'Official film studio, 3 productions' },
    { tag:'FEATURE FILM',  name:'The LoL: The Movie',           url:'https://faizzzlol.github.io/paizcorp/paizproductions/thelolmovie',            desc:'In production — cast, synopsis, production notes' },
    { tag:'CURRENCY',      name:'TL$ Currency Converter',       url:'https://thelegendoflegiona.github.io/gov/finance/',                           desc:'TL Dollar exchange rates, EN/BM bilingual' },
    { tag:'AI ASSISTANT',  name:'pAIz v5.3',                    url:'https://faizzzlol.github.io/paizcorp/pAIz',                                   desc:'Omniscient AI assistant with slash commands' },
    { tag:'FREAKY NIGGAS', name:'Freaky Niggas Community',      url:'https://faizzzlol.github.io/freakyniggas/',                                   desc:'Dark monochrome glitch aesthetic · Minecraft servers · Freaky News' },
    { tag:'FREAKY NEWS',   name:'Freaky News (EN/BM)',          url:'https://faizzzlol.github.io/freakyniggas/news',                               desc:'Bilingual news with localStorage EN/BM toggle' },
    { tag:'FN SERVERS',    name:'Freaky Niggas Servers',        url:'https://faizzzlol.github.io/freakyniggas/servers',                            desc:'Minecraft server listings' },
    { tag:'FN FEEDBACK',   name:'Freaky Niggas Feedback',       url:'https://faizzzlol.github.io/freakyniggas/feedback',                           desc:'Submit feedback form' },
    { tag:'FN SMP',        name:'FN SMP — Freaky Niggas',       url:'https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp',                   desc:'Java & Bedrock crossplay SMP · V1.3.3 · 10 slots · minekeep.net · Singapore' },
    { tag:'FN SMP REPORT', name:'FN SMP Report System',         url:'https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report',            desc:'Submit bug, player, server issue or suggestion reports to admin team' },
  ];

  /* ── IMAGE KNOWLEDGE BASE (unchanged – keep your original entries) ── */
  const IMG_KB = [
    // (Your existing IMG_KB entries go here – unchanged)
  ];

  /* ── TEXT KNOWLEDGE BASE (expanded and with new entries) ── */
  const KB = [

    // ========== EXISTING ENTRIES WITH EXPANDED KEYWORDS ==========
    // (Only the keyword arrays are extended; the rest of each object is unchanged)

    { id:'greeting', cat:'all',
      kw:['hello','hi','hey','hei','hai','hye','hewlo','helo','hola','morning','good morning','good evening','selamat pagi','selamat petang','selamat malam','pagi','petang','malam','salam','assalamualaikum','wslm','wsp','wassup','wasap','sup','yo','oi','aye','howdy','namaste','apa khabar','apa kabo','apa cerita','apahal','camne','macam mana','sihat','ok tak'],
      fup:['Who are the founders?','What is The LoL?','Show me photos','What is FN SMP?'],
      r:(bm)=>bm
        ?`Eh, wassup! Aku <strong>pAIz v5.3 — Omniscient</strong> — AI assistant rasmi The Legend of Legiona! 😄<br><br>Cuba slash commands:<br>→ <kbd>/gov</kbd> · <kbd>/isc</kbd> · <kbd>/fn</kbd> · <kbd>/fnsmp</kbd> — Shortcut jabatan<br>→ <kbd>/search [topik]</kbd> — Cari semua portal<br>→ <kbd>/show [gambar]</kbd> — Preview foto<br>→ <kbd>/help</kbd> — Semua arahan`
        :`Yo! I'm <strong>pAIz v5.3 — Omniscient</strong> — The LoL's official AI! 🟩<br><br>Slash commands:<br>→ <kbd>/gov</kbd> · <kbd>/isc</kbd> · <kbd>/fn</kbd> · <kbd>/fnsmp</kbd> — Department shortcuts<br>→ <kbd>/search [topic]</kbd> — Search all portals<br>→ <kbd>/show [photo]</kbd> — Preview gallery photos<br>→ <kbd>/help</kbd> — All commands`,
    },

    { id:'help', cat:'all',
      kw:['what can you do','help me','boleh buat apa','apa yang kau boleh buat','capabilities','apa ko tahu','what do you know','what are you','who are you','about yourself','about paiz','what is paiz','how do you work','aku boleh tanya apa','nak tanya apa','new features','feature baru','apa baru','commands','slash commands','arahan'],
      fup:['Show me photos','Search history','Search government','What is FN SMP?'],
      r:(bm)=>bm
        ?`Aku <strong>pAIz v5.3 — OMNISCIENT</strong> 🎉<br><br><strong>Slash Commands:</strong><br>→ <kbd>/search [query]</kbd> — Cari semua portal<br>→ <kbd>/show [topic]</kbd> — Preview gambar dari galeri<br>→ <kbd>/gov</kbd> — Struktur kerajaan<br>→ <kbd>/isc</kbd> — Portal ISC<br>→ <kbd>/fn</kbd> — Freaky Niggas<br>→ <kbd>/fnsmp</kbd> — FN SMP server info<br>→ <kbd>/clear</kbd> — Chat baru<br>→ <kbd>/theme</kbd> — Tukar tema<br>→ <kbd>/help</kbd> — Halaman ini<br><br><strong>📚 Tanya je:</strong> Sejarah · Kerajaan · ISC · Paiz Corp · NIS · FN SMP · Gambar galeri`
        :`I'm <strong>pAIz v5.3 — OMNISCIENT</strong> 🎉<br><br><strong>Slash Commands:</strong><br>→ <kbd>/search [query]</kbd> — Search all portals<br>→ <kbd>/show [topic]</kbd> — Preview gallery photos<br>→ <kbd>/gov</kbd> — Government structure<br>→ <kbd>/isc</kbd> — ISC portal<br>→ <kbd>/fn</kbd> — Freaky Niggas<br>→ <kbd>/fnsmp</kbd> — FN SMP server info<br>→ <kbd>/clear</kbd> — New chat<br>→ <kbd>/theme</kbd> — Toggle theme<br>→ <kbd>/help</kbd> — This menu<br><br><strong>📚 Just ask about:</strong> History · Government · ISC · Paiz Corp · NIS · FN SMP · Gallery Photos`,
    },

    { id:'whatlol', cat:'all',
      kw:['what is the lol','apa tu the lol','the lol tu apa','apa itu the lol','what is the legend of legiona','apa tu legend of legiona','about the lol','pasal the lol','tell me about the lol','explain the lol','terangkan the lol','the lol minecraft','minecraft nation','negara minecraft','is the lol a country','what is thelol','thelol','the lol nation','minecraft nation thelol','negara minecraft'],
      fup:['History','Founders','Government','Paiz Corp'],
      r:(bm)=>bm
        ?`<strong>The Legend of Legiona (The LoL)</strong> 🟩<br><br>Negara berdaulat Minecraft di server Skyxion, era Altaër. Diasaskan 2023 oleh Faiz4224, Imii Kun & Dyno. Asalnya "The Sus".<br><br>The LoL ada:<br>— Kerajaan formal (6 jabatan + The Black House)<br>— Agensi perisikan (ISC)<br>— Sistem ID Nasional (NIS) dengan kad digital<br>— Arkib undang-undang dengan dokumen rasmi<br>— Rangkaian rel 4,800+ blok (TLSRL)<br>— Konglomerat nasional (Paiz® Corp) 5 subsidiari<br>— Sistem kewarganegaraan formal<br>— Galeri foto lengkap 2020–2024`
        :`<strong>The Legend of Legiona (The LoL)</strong> 🟩<br><br>A sovereign Minecraft nation on the Skyxion server, Altaër Era. Founded 2023 by Faiz4224, Imii Kun & Dyno. Originally called "The Sus".<br><br>The LoL has:<br>— Formal government (6 departments + The Black House)<br>— Intelligence agency (ISC)<br>— National ID System (NIS) with digital ID cards<br>— Legal archive with official documents<br>— 4,800+ block rail network (TLSRL)<br>— National conglomerate (Paiz® Corp) with 5 subsidiaries<br>— Formal citizenship system<br>— Complete photo archive 2020–2024`,
    },

    { id:'founders', cat:'history',
      kw:['founder','founders','pengasas','siapa pengasas','pengasas thelol','who founded','siapa yang buat','siapa yang cipta','orang yang buat thelol','faiz imii dyno','three founders','tiga pengasas','founding members','who created','who started','who built','siapa buat thelol','who made the lol','creators','siapakah pengasas'],
      fup:['Tell me about Faiz4224','History of The LoL','Show founding photos'],
      r:(bm)=>bm
        ?`The LoL diasaskan oleh <strong>tiga orang</strong>:<br><br><strong>🟩 Faiz4224</strong> — Presiden Pertama & Pemimpin Pengasas. Reka bentuk kerajaan dan infrastruktur. Sekarang memimpin dari The Black House. Pengasas dan pengerusi Paiz® Corp.<br><br><strong>🟩 Imii Kun</strong> — Pengasas Bersama & Visionary. Yang menamakan semula The Sus kepada The Legend of Legiona pada 21 Feb 2023.<br><br><strong>🟩 Dyno</strong> — Pengasas Bersama & Ahli Strategi. Username lama: DinosaurHuman → LonelyDynozz. Beli Minecraft Java+Bedrock pada 5 Mac 2026 (RM50). Muncul dalam The LoL: The Movie.`
        :`The LoL was co-founded by <strong>three individuals</strong>:<br><br><strong>🟩 Faiz4224</strong> — First President & Founding Leader. Architect of governance and infrastructure. Currently serving from The Black House. Founded and chairs Paiz® Corp.<br><br><strong>🟩 Imii Kun</strong> — Co-Founder & Visionary. The one who proposed renaming The Sus to The Legend of Legiona on Feb 21, 2023.<br><br><strong>🟩 Dyno</strong> — Co-Founder & Strategist. Former MC username: DinosaurHuman → LonelyDynozz. Bought Minecraft Java+Bedrock on March 5, 2026 (RM50). Appears in The LoL: The Movie.`,
    },

    { id:'history', cat:'history',
      kw:['history','sejarah','full history','cerita thelol','kisah thelol','macam mana thelol bermula','how did it start','how it started','origin','asal usul','timeline','past','founding story','kisah penubuhan','mula dari mana','camne start','bila start','dulu camne','apa jadi dulu','the story','tell me about the lol history','backstory','asal usul thelol','cerita penuh','timeline thelol'],
      fup:['The Sus Era','UltraX2020 crisis','EhekSquad','Show era photos'],
      r:(bm)=>bm
        ?`<strong>Sejarah Penuh The Legend of Legiona</strong> 📜<br><br><strong>Era Neverland (2020)</strong> — Sebelum The Sus. Server awal Skyxion. Dyno, Faiz4224 main bersama.<br><br><strong>The Sus (2022)</strong> — Penempatan tidak rasmi. Nama "The Sus" diambil dari series roleplay MC Indonesia. EhekSquad ada asosiasi tak formal, kemudian keluar secara bebas. Masih wujud hari ini.<br><br><strong>Penubuhan (21 Feb 2023)</strong> — Imii Kun namakan semula. The Legend of Legiona lahir! Kumpulan WhatsApp pertama dicipta 24 Dis 2021 oleh Faiz — sebelum reboot rasmi.<br><br><strong>27 Feb 2023</strong> — Faiz & Dyno kalahkan Ender Dragon (Imii tidak mengambil bahagian). Ikan (Ajim) join malam yang sama.<br><br><strong>Pilihan Raya Pertama (6 Mei 2023)</strong> — UltraX2020 menang (4 undi), jadi Presiden ke-2.<br><br><strong>Era Krisis (2023)</strong> — Papan tanda dibom, TLCC diserang. UltraX2020 letak jawatan.<br><br><strong>Pemulihan (Nov 8, 2023)</strong> — TLIO ditubuhkan. Faiz4224 kembali memimpin.<br><br><strong>Unemployment Era (Jan 2026)</strong> — Selepas keputusan SPM (20 Jan 2026). Dyno beli Minecraft semula (5 Mac 2026, RM50).<br><br><strong>Era Altaër (2026)</strong> — ISC aktif. NIS dilancarkan. Web ecosystem penuh beroperasi.`
        :`<strong>Full History of The Legend of Legiona</strong> 📜<br><br><strong>Neverland Era (2020)</strong> — Pre-Sus. Early Skyxion server days with Dyno & Faiz.<br><br><strong>The Sus (2022)</strong> — Informal settlement. The name "The Sus" was inspired by an Indonesian Minecraft roleplay series. EhekSquad (PhoenixAiman, PandaPutih, Kagee) had undefined association, later departed independently — still exists today.<br><br><strong>Founding (Feb 21, 2023)</strong> — Imii Kun renamed it. WhatsApp group was originally created Dec 24, 2021 by Faiz before the reboot.<br><br><strong>Feb 27, 2023</strong> — Faiz & Dyno defeated the Ender Dragon together (Imii didn't participate). Ikan (Ajim) joined the same night.<br><br><strong>First Election (May 6, 2023)</strong> — UltraX2020 won (4 votes) under PHRTL. Became 2nd President.<br><br><strong>Crisis Era (2023)</strong> — City sign bombed, TLCC attacked. UltraX2020 resigned. Power returned to Faiz4224.<br><br><strong>Recovery (Nov 8, 2023)</strong> — TLIO established. Faiz4224 resumed leadership.<br><br><strong>Unemployment Era (Jan 2026)</strong> — Post-SPM results (Jan 20, 2026). Dyno re-bought Minecraft (Mar 5, 2026, RM50 Java+Bedrock).<br><br><strong>Altaër Era (2026)</strong> — ISC active. NIS launched. Full web ecosystem live.`,
    },

    { id:'faiz', cat:'history',
      kw:['faiz4224','faiz','about faiz','pasal faiz','siapa faiz','faiz4224 tu siapa','first president','presiden pertama','founder faiz','faiz the lol','president faiz','faiz corp','faiz paiz','faiz pengasas','the black house president','president faiz','faiz the black house','faiz4224 president'],
      fup:['The Black House','Paiz Corp','Show founding photos','History'],
      r:(bm)=>bm
        ?`<strong>Faiz4224</strong> — Presiden Pertama The LoL dan Pengerusi Paiz® Corp. 👑<br><br>Dia la otak di sebalik semuanya: cadang TLSRL, komisen TLCC, tubuh TL Railways & Paiz™ Construction, lancar PaizShop, lulus The LoL Movie, buka Paiz Chicken. Beroperasi dari <em>The Black House</em>.`
        :`<strong>Faiz4224</strong> — First President of The LoL and Chairman of Paiz® Corp. 👑<br><br>The mind behind everything: proposed TLSRL, commissioned TLCC Twin Towers, established TL Railways & Paiz™ Construction, launched PaizShop, greenlit The LoL Movie, opened Paiz Chicken. Operates from <em>The Black House</em>.`,
    },

    { id:'ikan', cat:'history',
      kw:['ikanuwu','ikan','ajim','iman hazim','ikanowo','imanowo','ikan vs ikanowo','siapa ikan','ikan tu siapa','min. kewangan','finance minister','menteri kewangan','imanz'],
      fup:['Founders','History','Government structure'],
      r:(bm)=>bm
        ?`<strong>ikanuwu = Ajim</strong> (nama penuh: Iman Hazim Izdiyad bin Idris) — Menteri Kewangan The LoL. Join 27 Feb 2023, malam yang sama Ender Dragon dikalahkan.<br><br>⚠️ <strong>IkanOwo ≠ ikan</strong> — IkanOwo adalah username Iman Hafizz (companion berbeza yang guna akaun kedua). Dua orang berbeza.`
        :`<strong>ikanuwu = Ajim</strong> (full name: Iman Hazim Izdiyad bin Idris) — Minister of Finance of The LoL. Joined Feb 27, 2023, the same night the Ender Dragon was defeated.<br><br>⚠️ <strong>IkanOwo ≠ ikan</strong> — IkanOwo is the username of Iman Hafizz (a different companion using a second account). They are two separate people.`,
    },

    { id:'government', cat:'gov',
      kw:['government','kerajaan','government structure','struktur kerajaan','black house','the black house','departments','jabatan','ministry','office of the president','six departments','enam jabatan','gov structure','pasal kerajaan','government the lol','thelol gov','gov structure','thelol gov','senarai jabatan'],
      fup:['ISC Agency','Legal archive','Citizenship','National ID System'],
      r:(bm)=>bm
        ?`<strong>Struktur Kerajaan The LoL</strong> 🏛️<br><br><strong>The Black House</strong> — Pejabat Presiden. Presiden: Faiz4224. Kod dokumen: BH-YYYY-###<br><br><strong>Enam Jabatan:</strong><br>— DEPT-01: <strong>ISC</strong> · AKTIF<br>— DEPT-02: Pejabat Keadilan Nasional<br>— DEPT-03: Kementerian Lore & Arkib<br>— DEPT-04: Bahagian Kerja Awam<br>— DEPT-05: Biro Hubungan Luar<br>— DEPT-06: The LoL Communications<br><br><a href="https://thelegendoflegiona.github.io/gov/">Portal Kerajaan →</a>`
        :`<strong>Government Structure of The LoL</strong> 🏛️<br><br><strong>The Black House</strong> — Office of the President. Current: Faiz4224. Documents: BH-YYYY-###<br><br><strong>Six Departments:</strong><br>— DEPT-01: <strong>ISC</strong> · ACTIVE<br>— DEPT-02: Office of National Justice<br>— DEPT-03: Ministry of Lore & Archives<br>— DEPT-04: Public Works Division<br>— DEPT-05: Bureau of External Relations<br>— DEPT-06: The LoL Communications<br><br><a href="https://thelegendoflegiona.github.io/gov/">Government Portal →</a>`,
    },

    { id:'blackhouse', cat:'gov',
      kw:['black house','office of the president','pejabat presiden','bh-','the black house','president office','black house page','ofis presiden'],
      fup:['Faiz4224','Government structure','Legal documents'],
      r:(bm)=>bm
        ?`<strong>The Black House</strong> — Pejabat Rasmi Presiden The LoL. Presiden semasa: Faiz4224.<br><br>Dokumen rasmi menggunakan awalan <span class="tag gold">BH-YYYY-###</span>.<br><br><a href="https://thelegendoflegiona.github.io/gov/black-house">Laman Black House →</a>`
        :`<strong>The Black House</strong> — Official Office of the President of The LoL. Current President: Faiz4224.<br><br>Official documents use prefix <span class="tag gold">BH-YYYY-###</span>.<br><br><a href="https://thelegendoflegiona.github.io/gov/black-house">Black House Page →</a>`,
    },

    { id:'isc', cat:'gov',
      kw:['isc','internal security control','intelligence agency','security agency','classified','tlio','t.l.i.o','clearance','intel portal','national security','agensi perisikan','keselamatan','perisikan','apa tu isc','isc tu apa','isc the lol','about isc','pasal isc','isc agency','spy agency','clearance code','password isc','kata laluan isc','legiona2026','isc password','isc login','isc clearance','intel portal'],
      fup:['Show ISC attack files','Show ISC operations','Government structure','Legal documents'],
      r:(bm)=>bm
        ?`<strong>ISC — Internal Security Control</strong> 🔒<br><br>Agensi perisikan rasmi The LoL — DEPT-01. Pengganti kepada <em>T.L.I.O</em> (Nov 2023), yang menggantikan PPTL (10 Mei 2023).<br><br>Portal: <a href="https://thelegendoflegiona.github.io/isc/">ISC Portal</a> · <a href="https://thelegendoflegiona.github.io/isc/national/">Ketelusan</a> · <a href="https://thelegendoflegiona.github.io/isc/search/">Arkib Carian</a><br><br>Kod akses Intel Portal: <span class="tag">LEGIONA2026</span>`
        :`<strong>ISC — Internal Security Control</strong> 🔒<br><br>The LoL's official intelligence agency — DEPT-01. Successor to <em>T.L.I.O</em> (Nov 2023), which replaced PPTL (May 10, 2023).<br><br>Portals: <a href="https://thelegendoflegiona.github.io/isc/">ISC Main</a> · <a href="https://thelegendoflegiona.github.io/isc/national/">Transparency</a> · <a href="https://thelegendoflegiona.github.io/isc/search/">Public Archive</a><br><br>Intel Portal access code: <span class="tag">LEGIONA2026</span>`,
    },

    { id:'legal', cat:'gov',
      kw:['legal','undang-undang','documents','dokumen','archive','arkib','acts','akta','laws','rights charter','piagam hak','proclamation','proklamasi','legal archive','arkib undang-undang','document list','lolgov','bh-2026','all documents','official documents','law the lol'],
      fup:['Citizenship','Naming policy','Government portal','ISC'],
      r:(bm)=>bm
        ?`<strong>Arkib Undang-undang</strong> 📄<br><br><span class="tag">LOLGOV-2026-0001</span> — Akta Kewarganegaraan<br><span class="tag">LOLGOV-2026-0002</span> — Ordinan Pembatalan<br><span class="tag">LOLGOV-2026-0003</span> — Piagam Hak Warganegara<br><span class="tag">LOLGOV-2026-0004</span> — Rangka Kerja Dasar Kerajaan<br><span class="tag gold">BH-2026-0001</span> — Proklamasi Presiden<br><span class="tag gold">BH-2026-0002</span> — Arahan Penamaan & Gaya (02 Apr 2026)<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">Layari Arkib →</a>`
        :`<strong>Legal Archive</strong> 📄<br><br><span class="tag">LOLGOV-2026-0001</span> — Citizenship Act<br><span class="tag">LOLGOV-2026-0002</span> — Revocation Ordinance<br><span class="tag">LOLGOV-2026-0003</span> — Citizens' Rights Charter<br><span class="tag">LOLGOV-2026-0004</span> — Government Policy Framework<br><span class="tag gold">BH-2026-0001</span> — Presidential Proclamation<br><span class="tag gold">BH-2026-0002</span> — Official Naming & Style Directive<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">Browse Legal Archive →</a>`,
    },

    { id:'citizenship', cat:'gov',
      kw:['citizenship','kewarganegaraan','citizen','warganegara','apply','mohon','permohonan','application','citizen rights','hak warganegara','how to join','macam mana nak join','become a citizen','jadi warganegara','jadi rakyat','how to apply','cara mohon','boleh join','nak join thelol','join the lol','masuk the lol','syarat warganegara','syarat masuk'],
      fup:['National ID System','Legal archive','Government portal','Check citizenship status'],
      r:(bm)=>bm
        ?`<strong>Kewarganegaraan The LoL</strong> 🪪<br><br>Syarat asas: 16 tahun ke atas · Pemain Skyxion aktif · Tiada rekod server buruk<br><br>Dikawal oleh:<br>· LOLGOV-2026-0001 — Akta Kewarganegaraan<br>· LOLGOV-2026-0003 — Piagam Hak Warganegara<br>· LOLGOV-2026-0002 — Ordinan Pembatalan<br><br>Setelah diluluskan, The Black House akan keluarkan <strong>The LoL ID</strong> melalui sistem NIS (format: THELOL-YYYY-#####).<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Mohon Kewarganegaraan →</a> · <a href="https://thelegendoflegiona.github.io/gov/systems/id/">Portal NIS →</a>`
        :`<strong>The LoL Citizenship</strong> 🪪<br><br>Basic requirements: 16+ · Active Skyxion player · Clean server record<br><br>Governed by:<br>· LOLGOV-2026-0001 — Citizenship Act<br>· LOLGOV-2026-0003 — Citizens' Rights Charter<br>· LOLGOV-2026-0002 — Revocation Ordinance<br><br>Upon approval, The Black House issues a <strong>The LoL ID</strong> via the NIS (format: THELOL-YYYY-#####).<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Apply for Citizenship →</a> · <a href="https://thelegendoflegiona.github.io/gov/systems/id/">NIS Portal →</a>`,
    },

    { id:'citizen_status', cat:'gov',
      kw:['check status','semak status','application status','status permohonan','reference number','thelol-ctzn','citizenship status','cek status','status checker','check application','semak permohonan'],
      fup:['Apply citizenship','National ID System','Legal archive'],
      r:(bm)=>bm
        ?`<strong>Penyemak Status Kewarganegaraan</strong> 🔎<br><br>Masukkan nombor rujukan (format <span class="tag">THELOL-CTZN-YYYY-####</span>) untuk semak status permohonan anda.<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/status">Semak Sekarang →</a>`
        :`<strong>Citizenship Status Checker</strong> 🔎<br><br>Enter your reference number (format <span class="tag">THELOL-CTZN-YYYY-####</span>) to check your application status.<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/status">Check Now →</a>`,
    },

    { id:'nis_overview', cat:'gov',
      kw:['national id','national id system','nis','the lol id','thelol id','thelol-','id system','id number','id portal','national identification','pengenalan nasional','sistem id','kad pengenalan digital','digital id','ic thelol','id thelol','ic the lol','what is nis','apa tu nis','nis portal','id card portal','kad id','get my id','how to get id','cara dapat id','the lol id number','my id','id saya','cari id','id number format'],
      fup:['View Digital ID Card','Verify a The LoL ID','Citizenship','Government structure'],
      r:(bm)=>bm
        ?`<strong>National Identification System (NIS)</strong> 🪪<br><br>Sistem pengenalan nasional rasmi The LoL. Dikendalikan oleh The Black House. Setiap warganegara yang diluluskan akan diberikan ID kekal.<br><br><strong>Format ID:</strong> <span class="tag">THELOL-YYYY-#####</span><br>Contoh: <code>THELOL-2026-00001</code><br><br><strong>Portal NIS:</strong><br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/">🏛️ NIS Portal Home</a><br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">🔍 Citizen Registry</a> — semak ID mana-mana warganegara<br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/id-card">🪪 Digital ID Card</a> — lihat kad ID digital kau<br><br><strong>Tier Kewarganegaraan:</strong> Citizen · Senior Citizen · Elder · Founding Citizen<br><strong>Status:</strong> Active · Suspended · Revoked`
        :`<strong>National Identification System (NIS)</strong> 🪪<br><br>The LoL's official national identification system. Administered by The Black House. Every approved citizen receives a permanent unique ID.<br><br><strong>ID Format:</strong> <span class="tag">THELOL-YYYY-#####</span><br>Example: <code>THELOL-2026-00001</code><br><br><strong>NIS Portals:</strong><br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/">🏛️ NIS Portal Home</a><br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">🔍 Citizen Registry</a> — verify any citizen's ID<br>→ <a href="https://thelegendoflegiona.github.io/gov/systems/id/id-card">🪪 Digital ID Card</a> — view your digital ID card<br><br><strong>Citizenship Tiers:</strong> Citizen · Senior Citizen · Elder · Founding Citizen<br><strong>Status types:</strong> Active · Suspended · Revoked`,
    },

    { id:'nis_registry', cat:'gov',
      kw:['citizen registry','registry','verify id','verify citizen','semak id','look up id','cari id','find citizen','public registry','thelol registry','check if citizen','semak warganegara','is this person a citizen','citizen lookup','id lookup','who is thelol','nis registry','open registry'],
      fup:['Digital ID Card','National ID System','Citizenship'],
      r:(bm)=>bm
        ?`<strong>Citizen Registry</strong> 🔍<br><br>Akses awam. Masukkan mana-mana The LoL ID untuk sahkan status kewarganegaraan, tier, dan tarikh pendaftaran.<br><br><strong>Maklumat yang dipaparkan:</strong><br>— Username Minecraft<br>— Status (Active / Suspended / Revoked)<br>— Tier Kewarganegaraan<br>— Tarikh Diterbitkan<br>— Wilayah<br>— Status Wallet TL$<br>— Nota Awam<br><br>Format: <span class="tag">THELOL-YYYY-#####</span> (awalan THELOL- dikira auto)<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">Buka Registry →</a>`
        :`<strong>Citizen Registry</strong> 🔍<br><br>Public access. Enter any The LoL ID to verify citizenship status, tier, and registration date.<br><br><strong>Information displayed:</strong><br>— Minecraft username<br>— Status (Active / Suspended / Revoked)<br>— Citizenship Tier<br>— Issuance Date<br>— Territory<br>— TL$ Wallet status<br>— Public note<br><br>Format: <span class="tag">THELOL-YYYY-#####</span> (THELOL- prefix auto-applied)<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">Open Registry →</a>`,
    },

    { id:'nis_id_card', cat:'gov',
      kw:['digital id card','id card','kad id digital','id card thelol','thelol id card','view id card','lihat kad id','my id card','kad saya','show id card','paparkan kad','digital nic','national id card','how to view id card','cara lihat kad id','get id card','id card viewer'],
      fup:['Citizen Registry','National ID System','Citizenship'],
      r:(bm)=>bm
        ?`<strong>Digital ID Card</strong> 🪪<br><br>Kad pengenalan digital rasmi The LoL yang boleh dipapar dan dicetak.<br><br><strong>Isi kandungan kad:</strong><br>— Nama / Username Minecraft<br>— Nombor ID: <code>THELOL-YYYY-#####</code><br>— Tier & Status kewarganegaraan<br>— Avatar Minecraft (Java: Minotar · Bedrock: Crafthead)<br>— Tarikh diterbitkan · Wilayah · Status Wallet<br>— MRZ bar (machine-readable zone)<br>— Lajur holografi, status warna (hijau/merah/emas)<br><br>Masukkan ID kau di bawah untuk lihat kad kau:<br><a href="https://thelegendoflegiona.github.io/gov/systems/id/id-card">Papar Kad ID →</a>`
        :`<strong>Digital ID Card</strong> 🪪<br><br>The LoL's official digital identification card — viewable and printable.<br><br><strong>Card contents:</strong><br>— Minecraft username<br>— ID number: <code>THELOL-YYYY-#####</code><br>— Citizenship tier & status<br>— Minecraft avatar (Java: Minotar · Bedrock: Crafthead)<br>— Issue date · Territory · Wallet status<br>— MRZ bar (machine-readable zone aesthetic)<br>— Holographic strip, colour-coded status bar (green/red/gold)<br><br>Enter your ID to view your card:<br><a href="https://thelegendoflegiona.github.io/gov/systems/id/id-card">View My ID Card →</a>`,
    },

    { id:'naming', cat:'gov',
      kw:['naming policy','dasar penamaan','style directive','arahan gaya','bh-2026-0002','the lol name','nama the lol','lol abbreviation','standalone lol','how to write the lol','cara tulis the lol','naming directive','arahan penamaan','lol is banned','lol dilarang'],
      fup:['Legal archive','The Black House'],
      r:(bm)=>bm
        ?`<strong>BH-2026-0002 — Arahan Penamaan Rasmi</strong> ✍️<br><br>✅ <strong>"The Legend of Legiona"</strong> — Nama penuh rasmi<br>✅ <strong>"The LoL"</strong> — Singkatan dibenarkan SAHAJA. "The" WAJIB ada.<br>❌ <strong>"LoL"</strong> (bersendirian) — DILARANG KERAS dalam semua bahan.<br><br>Berkuat kuasa 02 April 2026.`
        :`<strong>BH-2026-0002 — Official Naming & Style Directive</strong> ✍️<br><br>✅ <strong>"The Legend of Legiona"</strong> — Full official name<br>✅ <strong>"The LoL"</strong> — Only permitted abbreviation. "The" is mandatory.<br>❌ <strong>"LoL"</strong> (standalone) — STRICTLY PROHIBITED in all materials.<br><br>Effective 02 April 2026.`,
    },

    { id:'ultrax', cat:'history',
      kw:['ultrax2020','ultrax','ultra x','2nd president','presiden ke-2','second president','phrtl','crisis','krisis','resigned','letak jawatan','drone attack','serangan dron','bombed city','election 2023','pilihan raya 2023','ultrax presidency','apa jadi ultrax','pasal ultrax','chaos era'],
      fup:['Show ISC attack files','Show TLCC photos','History','The LoL Movie'],
      r:(bm)=>bm
        ?`<strong>UltraX2020 & Krisis (2023)</strong> ⚡<br><br>Menang pilihan raya 6 Mei 2023 di bawah <em>PHRTL</em> dengan 4 undi — jadi <strong>Presiden ke-2</strong>. Faiz4224 dapat 2 undi, ikanuwu dapat 3 undi. 9 pengundi.<br><br>Semasa pemerintahannya:<br>— Tapak Legiona Presidential Palace hancur (11 Mei 2023)<br>— Papan tanda bandar <strong>dibom</strong><br>— Serangan ke atas <strong>TLCC Twin Towers</strong><br>— Huru-hara politik besar<br><br>UltraX2020 <strong>letak jawatan/dibuang</strong>. Kuasa kembali ke Faiz4224.`
        :`<strong>UltraX2020 Presidency & Crisis (2023)</strong> ⚡<br><br>Won the first democratic election May 6, 2023 under <em>PHRTL</em> with 4 votes — became <strong>2nd President</strong>. Faiz4224 received 2 votes, ikanuwu got 3. 9 total voters.<br><br>During his tenure:<br>— The Legiona Presidential Palace foundations were destroyed (May 11, 2023)<br>— City sign was <strong>bombed</strong><br>— Attacks on <strong>TLCC Twin Towers</strong><br>— Broader political crisis<br><br>UltraX2020 <strong>resigned/was removed</strong>. Power returned to Faiz4224.`,
    },

    { id:'eheksquad', cat:'history',
      kw:['eheksquad','ehek squad','ehek','phoenixaiman','pandaputih','kagee','the sus members','sus era people','siapa eheksquad','pasal eheksquad'],
      fup:['The Sus Era','History of The LoL','Founders'],
      r:(bm)=>bm
        ?`<strong>EhekSquad</strong> — Ahli: PhoenixAiman, PandaPutih, Kagee.<br><br>Ada asosiasi tak ditakrifkan dengan The Sus (2023). Semasa The Sus, tiada tadbir urus formal — status mereka tidak pernah ditetapkan. Diorang keluar dan tubuh semula EhekSquad secara bebas. <strong>Masih wujud hari ini</strong> tanpa hubungan formal dengan The LoL. PandaPutih dilaporkan berpengaruh dalam Skyxion menjelang 2026.`
        :`<strong>EhekSquad</strong> — Members: PhoenixAiman, PandaPutih, Kagee.<br><br>Had an undefined association with The Sus (2023). Since The Sus had no formal governance, their exact status was never defined. They departed and re-established independently. <strong>Still exists today</strong> with no formal affiliation to The LoL. PandaPutih reportedly influential in Skyxion by 2026.`,
    },

    { id:'tlsrl', cat:'corp',
      kw:['tlsrl','spawn railway','railway link','tren','kereta api','train','stations','stesen','railway project','projek rel','tll','llc','llo','mps','sxj','spn','express service','cargo service','4800','berapa blok tlsrl','berapa panjang tlsrl','panjang tlsrl','tlsrl stations','tlsrl route'],
      fup:['TL Railways','Paiz Corp','Show TLSRL photos','Show terminal photos'],
      r:(bm)=>bm
        ?`<strong>TLSRL — The LoL–Spawn Railway Link</strong> 🚂<br><br>Trek: <strong>4,800+ blok</strong> tertutup · Masa: <strong>~10 minit</strong> · 3 kelas · 6 stesen<br>Stesen: <strong>TLL → LLC → LLO → MPS → SXJ → SPN</strong><br><br>Dioperasikan oleh TL Railways. Dibina oleh Paiz™ Construction. Dicadangkan oleh Faiz4224.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">TL Railways →</a>`
        :`<strong>TLSRL — The LoL–Spawn Railway Link</strong> 🚂<br><br>Track: <strong>4,800+ blocks</strong> enclosed · Time: <strong>~10 minutes</strong> · 3 tiers · 6 stations<br>Stations: <strong>TLL → LLC → LLO → MPS → SXJ → SPN</strong><br><br>Operated by TL Railways. Built by Paiz™ Construction. Proposed by Faiz4224.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">TL Railways →</a>`,
    },

    { id:'paiz_corp', cat:'corp',
      kw:['paiz corp','paiz® corp','paiz corporation','all subsidiaries','semua subsidiari','five subsidiaries','lima subsidiari','conglomerate','konglomerat','national company','paiz group','overview paiz','apa tu paiz corp','pasal paiz corp','about paiz corp','all companies','semua syarikat'],
      fup:['Paiz Shop','Paiz Chicken','PaizProductions','TL Railways'],
      r:(bm)=>bm
        ?`<strong>Paiz® Corp — Konglomerat Nasional</strong> 🏢<br><br>Diasaskan dan diketuai oleh Faiz4224. Lima subsidiari:<br><br><strong>SUB-01 · TL Railways</strong> — Rel nasional · <a href="https://thelegendoflegiona.github.io/tlrailways/">→</a><br><strong>SUB-02 · Paiz™ Construction</strong> — Bina TLSRL, TLCC, farms<br><strong>SUB-03 · Paiz Shop</strong> — Kedai item Minecraft · <a href="https://faizzzlol.github.io/paizcorp/paizshop/">→</a><br><strong>SUB-04 · PaizProductions</strong> — Studio filem · <a href="https://faizzzlol.github.io/paizcorp/paizproductions/">→</a><br><strong>SUB-05 · Paiz Chicken</strong> — Pesanan makanan · <a href="https://faizzzlol.github.io/paizcorp/paizchicken/">→</a><br><br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`
        :`<strong>Paiz® Corp — National Conglomerate</strong> 🏢<br><br>Founded and chaired by Faiz4224. Five subsidiaries:<br><br><strong>SUB-01 · TL Railways</strong> — National rail · <a href="https://thelegendoflegiona.github.io/tlrailways/">→</a><br><strong>SUB-02 · Paiz™ Construction</strong> — Built TLSRL, TLCC, farms<br><strong>SUB-03 · Paiz Shop</strong> — Minecraft item store · <a href="https://faizzzlol.github.io/paizcorp/paizshop/">→</a><br><strong>SUB-04 · PaizProductions</strong> — Film studio · <a href="https://faizzzlol.github.io/paizcorp/paizproductions/">→</a><br><strong>SUB-05 · Paiz Chicken</strong> — Food ordering · <a href="https://faizzzlol.github.io/paizcorp/paizchicken/">→</a><br><br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`,
    },

    { id:'paiz_chicken', cat:'corp',
      kw:['paiz chicken','chicken','ayam','food','makanan','restaurant','restoran','order food','pesan makanan','food delivery','penghantaran makanan','virtual food','fast food','makan','nak makan','lapar','hungry','paiz food'],
      fup:['Paiz Shop','Paiz Corp','TL Dollar'],
      r:(bm)=>bm
        ?`<strong>Paiz Chicken</strong> 🍗<br><br>Paiz® Corp SUB-05. Pesanan makanan Minecraft merentasi Skyxion. Penghantaran + kutipan · Dalam Diamonds · Discord webhook.<br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">Order →</a>`
        :`<strong>Paiz Chicken</strong> 🍗<br><br>Paiz® Corp SUB-05. Minecraft food ordering across Skyxion. Delivery + pickup · Diamonds · Discord webhook.<br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">Order Now →</a>`,
    },

    { id:'paiz_shop', cat:'corp',
      kw:['paiz shop','kedai paiz','shop','store','kedai','buy items','beli item','shulker','mending','unbreaking','nether wart','iron ingot','retail','item shop','minecraft store','apa ada kat shop','barang apa ada','harga item','price items'],
      fup:['Paiz Corp','Paiz Chicken','TL Dollar'],
      r:(bm)=>bm
        ?`<strong>Paiz Shop</strong> 🛒<br><br>Paiz® Corp SUB-03. Item dalam Diamond (◆):<br>Shulker Box ◆4 · Mending I ◆3 · Nether Wart ◆3 · Unbreaking III ◆2 · Iron Ingot ◆1<br><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">Lawati Kedai →</a>`
        :`<strong>Paiz Shop</strong> 🛒<br><br>Paiz® Corp SUB-03. Items in Diamonds (◆):<br>Shulker Box ◆4 · Mending I ◆3 · Nether Wart ◆3 · Unbreaking III ◆2 · Iron Ingot ◆1<br><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">Visit Shop →</a>`,
    },

    { id:'lolmovie', cat:'corp',
      kw:['the lol movie','lol movie','thelolmovie','filem thelol','feature film','four phases','empat fasa','movie cast','pelakon filem','in production','movie thelol','bila keluar','when release','movie release','lol movie cast','siapa pelakon','pasal movie'],
      fup:['PaizProductions','Founders','UltraX2020'],
      r:(bm)=>bm
        ?`<strong>The LoL: The Movie</strong> 🎬<br><br>Status: <strong>DALAM PENGELUARAN</strong><br><br>Pelakon: Faiz4224 · Imii Kun · Dyno · UltraX2020<br>4 fasa · Epik politik Minecraft · Studio: PaizProductions<br><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/thelolmovie">Laman Filem →</a>`
        :`<strong>The LoL: The Movie</strong> 🎬<br><br>Status: <strong>IN PRODUCTION</strong><br><br>Cast: Faiz4224 · Imii Kun · Dyno · UltraX2020<br>4 phases · Political Minecraft epic · Studio: PaizProductions<br><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/thelolmovie">Film Page →</a>`,
    },

    { id:'currency', cat:'all',
      kw:['tl dollar','tl$','currency','wang','duit','mata wang','exchange rate','kadar pertukaran','iron worth','diamond worth','netherite worth','national currency','mata wang nasional','tldollar','tl dolar','how much','berapa','nilai duit'],
      fup:['Paiz Shop','Paiz Chicken'],
      r:(bm)=>bm
        ?`<strong>TL Dollar (TL$)</strong> 💰<br><br>Iron Ingot → TL$1 · Gold Ingot → TL$5 · Emerald → TL$10 · Diamond → TL$30 · Netherite → TL$150<br><br><a href="https://thelegendoflegiona.github.io/gov/finance/">Penukar Mata Wang →</a>`
        :`<strong>TL Dollar (TL$)</strong> 💰<br><br>Iron → TL$1 · Gold → TL$5 · Emerald → TL$10 · Diamond → TL$30 · Netherite → TL$150<br><br><a href="https://thelegendoflegiona.github.io/gov/finance/">Currency Converter →</a>`,
    },

    { id:'skyxion', cat:'all',
      kw:['skyxion','altaer era','era altaer','altaer','minecraft server','server minecraft','kawaiisho','current era','era semasa','server admin','which server','server mana','skyxion server','what server','apa server','server the lol'],
      fup:['History','Government'],
      r:(bm)=>bm
        ?`<strong>Skyxion & Altaër Era</strong> 🌐<br><br>Skyxion ialah server Minecraft di mana The LoL berada, ditadbir oleh <strong>Kawaiisho</strong>. <strong>Skyxion: Altaër Era</strong> ialah era semasa — dunia baru dipersiapkan, The LoL comeback dibincangkan sejak April 2026.`
        :`<strong>Skyxion & Altaër Era</strong> 🌐<br><br>Skyxion is the Minecraft server where The LoL operates, administered by <strong>Kawaiisho</strong>. <strong>Skyxion: Altaër Era</strong> is the current era — a new world is being prepared, with The LoL comeback discussed since April 2026.`,
    },

    { id:'nav', cat:'all',
      kw:['link','links','url','website','portal link','where can i find','mana nak cari','all pages','semua halaman','all portals','semua portal','all links','semua link','official links','link rasmi','website the lol','all websites','senarai laman','portals list'],
      fup:['Government portal','ISC portal','National ID System','Paiz Corp','Gallery','FN SMP'],
      r:(bm)=>bm
        ?`<strong>Semua Portal Rasmi</strong> 🔗<br><br><a href="https://thelegendoflegiona.github.io/main/">🏠 The Legend of Legiona</a><br><a href="https://faizzzlol.github.io/paizcorp/">🏢 Paiz® Corp</a><br><a href="https://thelegendoflegiona.github.io/gov/">🏛️ Kerajaan</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">🪪 Kewarganegaraan</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/">🪪 National ID Portal (NIS)</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">🔍 Citizen Registry</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">📄 Arkib Undang-undang</a><br><a href="https://thelegendoflegiona.github.io/isc/">🔒 ISC</a><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">🛒 Paiz Shop</a><br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">🍗 Paiz Chicken</a><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/">🎬 PaizProductions</a><br><a href="https://thelegendoflegiona.github.io/tlrailways/">🚂 TL Railways</a><br><a href="https://thelegendoflegiona.github.io/gallery/">📷 Gallery</a><br><a href="https://faizzzlol.github.io/freakyniggas/">🖤 Freaky Niggas</a><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">⛏ FN SMP</a>`
        :`<strong>All Official Portals</strong> 🔗<br><br><a href="https://thelegendoflegiona.github.io/main/">🏠 The Legend of Legiona</a><br><a href="https://faizzzlol.github.io/paizcorp/">🏢 Paiz® Corp</a><br><a href="https://thelegendoflegiona.github.io/gov/">🏛️ Government</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">🪪 Citizenship</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/">🪪 National ID Portal (NIS)</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">🔍 Citizen Registry</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">📄 Legal Archive</a><br><a href="https://thelegendoflegiona.github.io/isc/">🔒 ISC</a><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">🛒 Paiz Shop</a><br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">🍗 Paiz Chicken</a><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/">🎬 PaizProductions</a><br><a href="https://thelegendoflegiona.github.io/tlrailways/">🚂 TL Railways</a><br><a href="https://thelegendoflegiona.github.io/gallery/">📷 Gallery</a><br><a href="https://faizzzlol.github.io/freakyniggas/">🖤 Freaky Niggas</a><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">⛏ FN SMP</a>`,
    },

    { id:'gallery', cat:'images',
      kw:['gallery','galeri','photo gallery','galeri foto','all photos','semua gambar','browse photos','browse gallery','thelol gallery','8 eras','photo archive','arkib foto','how many photos','berapa gambar','gallery page'],
      fup:['Show Neverland photos','Show The Sus','Show The LoL City','Show TLSRL'],
      r:(bm)=>bm
        ?`<strong>Galeri Foto Rasmi The LoL</strong> 📷<br><br>Arkib visual lengkap dari 2020–2024 merentasi 8 era. Gambar oleh Faiz4224, Dyno, Ikan dan lain-lain.<br><br>Taip <em>"tunjuk [topik]"</em> atau <em>"/show [topik]"</em> untuk preview gambar di sini, atau lawati galeri penuh:<br><a href="https://thelegendoflegiona.github.io/gallery/">Galeri Penuh →</a>`
        :`<strong>The LoL Official Photo Gallery</strong> 📷<br><br>Complete visual archive from 2020–2024 across 8 eras. Captured by Faiz4224, Dyno, Ikan and others.<br><br>Type <em>"show me [topic]"</em> or <em>"/show [topic]"</em> to preview any photos here, or visit the full gallery:<br><a href="https://thelegendoflegiona.github.io/gallery/">Full Gallery →</a>`,
    },

    { id:'fn_about', cat:'fn',
      kw:['freaky niggas','what is freaky niggas','fn community','freaky niggas site','pasal freaky niggas','apa tu fn','freaky','fn minecraft','freaky niggas community','fn page','fn website','laman fn'],
      fup:['Freaky News','FN Servers','What is FN SMP?','Search Freaky Niggas'],
      r:(bm)=>bm
        ?`<strong>Freaky Niggas (FN)</strong> 🖤<br><br>Komuniti Minecraft dengan estetik dark monochrome glitch. Laman penuh:<br><br>→ <a href="https://faizzzlol.github.io/freakyniggas/">Home</a> — Halaman utama<br>→ <a href="https://faizzzlol.github.io/freakyniggas/servers">Servers</a> — Senarai server Minecraft<br>→ <a href="https://faizzzlol.github.io/freakyniggas/news">Freaky News</a> — Berita EN/BM toggle<br>→ <a href="https://faizzzlol.github.io/freakyniggas/feedback">Feedback</a> — Borang maklum balas<br>→ <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP</a> — Server Minecraft FN crossplay`
        :`<strong>Freaky Niggas (FN)</strong> 🖤<br><br>A Minecraft community with dark monochrome glitch aesthetic. Full pages:<br><br>→ <a href="https://faizzzlol.github.io/freakyniggas/">Home</a> — Main landing page<br>→ <a href="https://faizzzlol.github.io/freakyniggas/servers">Servers</a> — Minecraft server listings<br>→ <a href="https://faizzzlol.github.io/freakyniggas/news">Freaky News</a> — Bilingual news EN/BM toggle<br>→ <a href="https://faizzzlol.github.io/freakyniggas/feedback">Feedback</a> — Feedback form<br>→ <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP</a> — FN crossplay Minecraft server`,
    },

    { id:'fnsmp_about', cat:'fnsmp',
      kw:['fn smp','fnsmp','freaky nsmp','freakynsmp','what is fn smp','apa tu fn smp','fn smp tu apa','about fn smp','pasal fn smp','server fn smp','fn server info','crossplay server fn','semi vanilla server','minecraft server fn','fn smp info','server info fn','fn smp overview','joint server','crossplay smp','paper server fn','10 slots','10 slot server','minekeep server','sg server minecraft','singapore server minecraft','fn x thelol','fn thelol server','fn smp version','v1.3.3'],
      fup:['How to join FN SMP','FN SMP plugins','FN SMP changelog','FN SMP known issues'],
      r:(bm)=>bm
        ?`<strong>FN SMP</strong> ⛏️<br><br>Server Minecraft bersama antara <strong>Freaky Niggas × The Legend of Legiona</strong> — dua komuniti, satu dunia.<br><br><span class="tag new">V1.3.3</span> <span class="tag blue">AKTIF</span><br><br>— <strong>Mod:</strong> Java & Bedrock Crossplay<br>— <strong>Jenis:</strong> Semi-Vanilla Survival<br>— <strong>Engine:</strong> Paper<br>— <strong>Slot:</strong> 10 pemain<br>— <strong>Hosting:</strong> MineKeep (Singapore) — free tier<br>— <strong>Versi:</strong> 1.7.2 – latest (Java) · Bedrock support via Geyser<br>— <strong>Crossplay:</strong> Geyser + Floodgate (Java ↔ Bedrock)<br><br><strong>⚠️ Nota:</strong> Java cracked/TLauncher tidak disokong — guna Bedrock edition sebagai alternatif.<br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP Page →</a>`
        :`<strong>FN SMP</strong> ⛏️<br><br>A joint Minecraft server between <strong>Freaky Niggas × The Legend of Legiona</strong> — two communities, one world.<br><br><span class="tag new">V1.3.3</span> <span class="tag blue">ACTIVE</span><br><br>— <strong>Mode:</strong> Java & Bedrock Crossplay<br>— <strong>Type:</strong> Semi-Vanilla Survival<br>— <strong>Engine:</strong> Paper<br>— <strong>Slots:</strong> 10 players<br>— <strong>Hosting:</strong> MineKeep (Singapore) — free tier<br>— <strong>Version:</strong> 1.7.2 – latest (Java) · Bedrock via Geyser<br>— <strong>Crossplay:</strong> Geyser + Floodgate (Java ↔ Bedrock)<br><br><strong>⚠️ Note:</strong> Cracked Java / TLauncher not supported — use Bedrock edition instead.<br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP Page →</a>`,
    },

    { id:'fnsmp_join', cat:'fnsmp',
      kw:['how to join fn smp','cara join fn smp','java ip fn smp','bedrock ip fn smp','server address fn','ip fn smp','fn smp ip','connect fn smp','join fn smp','freakynsmp.minekeep.gg','bedrock port fn','19132','join server fn','minecraft server ip fn','copy ip fn','add fn smp','fn smp address','fn smp port','bedrock join','java join fn','cara masuk fn smp','nak join fn smp','masuk fn smp','ip server fn','connect fn smp','how to connect bedrock','java edition fn smp','how to add server fn'],
      fup:['FN SMP info','FN SMP plugins','Submit FN SMP report'],
      r:(bm)=>bm
        ?`<strong>Cara Join FN SMP</strong> 🔌<br><br><strong>🟠 Java Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.minekeep.gg</code><br>Port: Default · Versi 1.7.2 – Latest · Premium sahaja<br><br><strong>🟢 Bedrock Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.bedrock.minekeep.gg</code><br>Port: <strong>19132</strong> · Win10/11 · Mobile · Console<br><br><strong>⚡ Launch terus:</strong> <a href="minecraft://?addExternalServer=FN SMP|freakynsmp.bedrock.minekeep.gg:19132">Add to Bedrock automatically →</a><br><br><strong>💬 WhatsApp Group:</strong> <a href="https://chat.whatsapp.com/E0Z4puJdXR8HhRcjoce3h6">Join untuk updates →</a><br><br><em>Cracked Java tak disokong — pakai Bedrock edition (mobile/PC/emulator).</em>`
        :`<strong>How to Join FN SMP</strong> 🔌<br><br><strong>🟠 Java Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.minekeep.gg</code><br>Port: Default · Version 1.7.2 – Latest · Premium only<br><br><strong>🟢 Bedrock Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.bedrock.minekeep.gg</code><br>Port: <strong>19132</strong> · Win10/11 · Mobile · Console<br><br><strong>⚡ Quick launch:</strong> <a href="minecraft://?addExternalServer=FN SMP|freakynsmp.bedrock.minekeep.gg:19132">Auto-add to Bedrock →</a><br><br><strong>💬 WhatsApp Group:</strong> <a href="https://chat.whatsapp.com/E0Z4puJdXR8HhRcjoce3h6">Join for updates →</a><br><br><em>Cracked Java not supported — use Bedrock edition (mobile/PC/emulator) instead.</em>`,
    },

    { id:'fnsmp_plugins', cat:'fnsmp',
      kw:['fn smp plugins','plugin fn smp','senarai plugin fn','plugin list fn','auraskills fn','chestsort fn','chunky fn','discordsrv fn','essentialsx fn','floodgate fn','geyser fn','gsit fn','imageframe fn','interactivechat fn','jobsreborn fn','luckperms fn','packetevents fn','placeholderapi fn','protocollib fn','realscoreboard fn','skinsrestorer fn','vault fn','viabackwards fn','viaversion fn','20 plugins fn','active plugins fn','what plugins fn smp','plugin apa ada fn','jobs fn smp','rpg fn smp','economy fn smp','skill fn smp','auraskills smp','jobs reborn smp','what plugins','plugin list','senarai plugin'],
      fup:['FN SMP changelog','FN SMP info','FN SMP roadmap'],
      r:(bm)=>bm
        ?`<strong>Plugin Aktif FN SMP</strong> 🔌 — <span class="tag new">20 Plugin</span><br><br><strong>🎮 RPG & Ekonomi</strong><br>→ <strong>AuraSkills</strong> — Sistem leveling RPG penuh (rebalanced V1.3.3)<br>→ <strong>JobsReborn</strong> <span class="tag new">Baru</span> — Cari wang dengan mine/farm/hunt/fish/build<br>→ <strong>Vault</strong> — API ekonomi asas<br><br><strong>🔗 Crossplay Core</strong><br>→ <strong>Geyser</strong> — Jambatan Java ↔ Bedrock<br>→ <strong>Floodgate</strong> — Auth Bedrock tanpa akaun Java<br>→ <strong>SkinsRestorer</strong> — Skin untuk Bedrock & offline players<br><br><strong>🛠️ Utility & QoL</strong><br>→ <strong>EssentialsX</strong> <span class="tag new">Baru</span> — /afk, /msg, /reply (teleport/homes dimatikan)<br>→ <strong>ChestSort</strong> — Auto-sort inventory & chest<br>→ <strong>GSit</strong> — Duduk, baring, merangkak<br>→ <strong>Chunky</strong> — Pre-gen chunks<br><br><strong>💬 Chat & Display</strong><br>→ <strong>InteractiveChat</strong> — Rich chat dengan item preview<br>→ <strong>DiscordSRV</strong> — Bridge Discord ↔ in-game<br>→ <strong>RealScoreboard</strong> — Sidebar stats live<br>→ <strong>ImageFrame</strong> — Render gambar dalam item frame<br><br><strong>⚙️ Compatibility & Libs</strong><br>→ ViaVersion · ViaBackwards · LuckPerms · PlaceholderAPI · ProtocolLib · packetevents`
        :`<strong>FN SMP Active Plugins</strong> 🔌 — <span class="tag new">20 Plugins</span><br><br><strong>🎮 RPG & Economy</strong><br>→ <strong>AuraSkills</strong> — Full RPG leveling system (rebalanced in V1.3.3)<br>→ <strong>JobsReborn</strong> <span class="tag new">New</span> — Earn currency by mining/farming/hunting/fishing/building<br>→ <strong>Vault</strong> — Economy API foundation<br><br><strong>🔗 Crossplay Core</strong><br>→ <strong>Geyser</strong> — Java ↔ Bedrock translation layer<br>→ <strong>Floodgate</strong> — Bedrock auth without a Java account<br>→ <strong>SkinsRestorer</strong> — Skins for Bedrock & offline players<br><br><strong>🛠️ Utility & QoL</strong><br>→ <strong>EssentialsX</strong> <span class="tag new">New</span> — /afk, /msg, /reply (teleports/homes disabled)<br>→ <strong>ChestSort</strong> — Auto-sort inventory & chests<br>→ <strong>GSit</strong> — Sit, lay, crawl on any block<br>→ <strong>Chunky</strong> — Background chunk pre-generation<br><br><strong>💬 Chat & Display</strong><br>→ <strong>InteractiveChat</strong> — Rich chat with clickable item previews<br>→ <strong>DiscordSRV</strong> — Discord ↔ in-game bridge<br>→ <strong>RealScoreboard</strong> — Animated live stats sidebar<br>→ <strong>ImageFrame</strong> — Render custom images on item frames<br><br><strong>⚙️ Compatibility & Libs</strong><br>→ ViaVersion · ViaBackwards · LuckPerms · PlaceholderAPI · ProtocolLib · packetevents`,
    },

    { id:'fnsmp_changelog', cat:'fnsmp',
      kw:['fn smp changelog','update fn smp','fn smp update history','v1.3','v1.3.1','v1.3.2','v1.3.3','version history fn','update fn smp latest','economy update fn','soft launch fn','semua update fn','versi terbaru fn','fn smp version','fn smp latest update','fn smp release','changelog fn','update log fn','fn smp patch','april 2026 fn'],
      fup:['FN SMP plugins','FN SMP known issues','FN SMP roadmap'],
      r:(bm)=>bm
        ?`<strong>Changelog FN SMP</strong> 📋<br><br><span class="tag new">V1.3.3</span> <em>22 Apr 2026 — Economy Update</em><br>→ ✅ Tambah <strong>EssentialsX</strong> (/afk, /msg, /reply sahaja)<br>→ ✅ Tambah <strong>JobsReborn</strong> (economy layer atas Vault)<br>→ ❌ Buang IC DiscordSRV Addon (gagal load)<br>→ ⚡ Rebalance <strong>AuraSkills</strong> (XP sources, loot tables, mana costs)<br><br><span class="tag">V1.3.2</span> <em>18 Apr 2026</em><br>→ ✅ Tambah: RealScoreboard · InteractiveChat · IC DiscordSRV Addon · ImageFrame · ProtocolLib · PlaceholderAPI<br><br><span class="tag">V1.3.1</span> <em>17 Apr 2026</em><br>→ ⚡ Buang LagFixer (redundant dengan Paper)<br>→ ⚡ Simulation distance 10 → 5<br>→ ⚡ Tuned entity activation range<br>→ ↑ LuckPerms expanded permissions<br>→ ✅ Tambah Vault<br><br><span class="tag">V1.3</span> <em>16 Apr 2026 — Soft Launch</em><br>→ ✅ Tambah: AuraSkills · LagFixer · ChestSort · LuckPerms<br>→ ❌ Buang Simple Voice Chat (performance)`
        :`<strong>FN SMP Changelog</strong> 📋<br><br><span class="tag new">V1.3.3</span> <em>22 Apr 2026 — Economy Update</em><br>→ ✅ Added <strong>EssentialsX</strong> (/afk, /msg, /reply only)<br>→ ✅ Added <strong>JobsReborn</strong> (economy on top of Vault)<br>→ ❌ Removed IC DiscordSRV Addon (load failure)<br>→ ⚡ Rebalanced <strong>AuraSkills</strong> (XP sources, loot tables, mana costs)<br><br><span class="tag">V1.3.2</span> <em>18 Apr 2026</em><br>→ ✅ Added: RealScoreboard · InteractiveChat · IC DiscordSRV Addon · ImageFrame · ProtocolLib · PlaceholderAPI<br><br><span class="tag">V1.3.1</span> <em>17 Apr 2026</em><br>→ ⚡ Removed LagFixer (redundant with Paper)<br>→ ⚡ Simulation distance 10 → 5<br>→ ⚡ Tuned entity activation range<br>→ ↑ LuckPerms expanded permissions<br>→ ✅ Added Vault<br><br><span class="tag">V1.3</span> <em>16 Apr 2026 — Soft Launch</em><br>→ ✅ Added: AuraSkills · LagFixer · ChestSort · LuckPerms<br>→ ❌ Removed Simple Voice Chat (performance concerns)`,
    },

    { id:'fnsmp_issues', cat:'fnsmp',
      kw:['fn smp issues','known issues fn','cracked java fn smp','tlauncher fn smp','cracked client fn','tlauncher tak boleh join','java cracked fn','bedrock player list fn','low ram fn','lag fn smp','server lag fn','masalah fn smp','problem fn smp','isu fn smp','performance fn smp','workaround fn smp','fn smp bug','fn smp fix','kenapa tak boleh join','kenapa lag','server issue fn','bedrock invisible fn'],
      fup:['How to join FN SMP','FN SMP info','Submit FN SMP report'],
      r:(bm)=>bm
        ?`<strong>Isu Diketahui — FN SMP</strong> ⚠️<br><br><span class="tag red">HIGH</span> <strong>Cracked Java / TLauncher</strong><br>Tak boleh dibaiki — Proxy MineKeep (free tier) tak bagi akses config. <em>Workaround: Guna Bedrock edition (mobile/Win10/emulator).</em><br><br><span class="tag" style="border-color:rgba(251,146,60,.3);color:#fb923c">MED</span> <strong>RAM Rendah / Lag</strong><br>Free tier ada had RAM. TNT explosions atau farm besar boleh cause TPS drops. <em>Workaround: Upgrade ke paid plan.</em><br><br><span class="tag" style="border-color:rgba(251,191,36,.3);color:#fbbf24">LOW</span> <strong>Bedrock Player List Tak Nampak</strong><br>Pemain Bedrock mungkin tak keluar dalam player list walaupun online. Count dikira, tapi nama & skin tak boleh diambil. <em>Status: Dalam penyiasatan.</em>`
        :`<strong>Known Issues — FN SMP</strong> ⚠️<br><br><span class="tag red">HIGH</span> <strong>Cracked Java / TLauncher Access</strong><br>Cannot be fixed — MineKeep's Proxy config is not exposed on the free plan. <em>Workaround: Use Bedrock edition (mobile/Win10/emulator).</em><br><br><span class="tag" style="border-color:rgba(251,146,60,.3);color:#fb923c">MED</span> <strong>Low RAM / Performance Lag</strong><br>Free tier RAM limit. Heavy activities like TNT or large mob farms cause TPS drops. <em>Workaround: Migrate to paid plan.</em><br><br><span class="tag" style="border-color:rgba(251,191,36,.3);color:#fbbf24">LOW</span> <strong>Bedrock Player List Visibility</strong><br>Bedrock players connected via Geyser may not appear in player lists even when online. Count is included but names/skins can't be retrieved. <em>Status: Investigating.</em>`,
    },

    { id:'fnsmp_roadmap', cat:'fnsmp',
      kw:['fn smp roadmap','planned features fn','fn smp future','upcoming fn smp','what is coming fn smp','voice chat fn smp','proximity voice fn','custom weapons fn','chat config fn','scoreboard fn smp','fn smp plans','coming soon fn smp','roadmap fn','feature baru fn smp','bila voice chat fn','akan datang fn smp'],
      fup:['FN SMP changelog','FN SMP plugins','FN SMP info'],
      r:(bm)=>bm
        ?`<strong>Roadmap FN SMP</strong> 🗺️<br><br><span class="tag blue">IN DEV</span> <strong>Chat & Scoreboard</strong><br>Configure InteractiveChat untuk rich chat dengan item preview & player mentions. RealScoreboard customisation dengan live AuraSkills stats & JobsReborn balance.<br><br><span class="tag">PLANNED</span> <strong>Proximity Voice Chat</strong><br>Voice chat berasaskan proximity untuk Java & Bedrock. Dengar pemain hanya bila dekat. Perlukan resources server yang lebih baik.<br><br><span class="tag">PLANNED</span> <strong>Custom Weapons</strong><br>Senjata khas dan gameplay enhancements luar had vanilla. Special items, unique abilities, dan lore-tied content untuk integrasi The LoL × FN.`
        :`<strong>FN SMP Roadmap</strong> 🗺️<br><br><span class="tag blue">IN DEV</span> <strong>Chat & Scoreboard</strong><br>Configuring InteractiveChat for rich chat with item previews & player mentions. RealScoreboard customisation with live AuraSkills stats & JobsReborn balances.<br><br><span class="tag">PLANNED</span> <strong>Proximity Voice Chat</strong><br>Proximity-based voice chat for Java & Bedrock — hear players only when nearby. Requires better server resources to run smoothly.<br><br><span class="tag">PLANNED</span> <strong>Custom Weapons</strong><br>Custom weapons & gameplay enhancements beyond vanilla limits. Special items, unique abilities, and lore-tied content integrating The LoL × FN worlds.`,
    },

    { id:'fnsmp_report', cat:'fnsmp',
      kw:['report fn smp','submit report fn','bug report fn smp','player report fn smp','server issue fn smp','suggestion fn smp','report player fn','report bug fn smp','report griefing fn','how to report fn smp','cara report fn smp','laporan fn smp','report system fn smp','laporkan pemain fn','griefing fn smp','cheat fn smp','report cheat fn smp','report form fn smp','fn smp transparency','submit laporan fn','admin fn smp','how to contact admin fn','discord admin fn'],
      fup:['FN SMP known issues','FN SMP info','How to join FN SMP'],
      r:(bm)=>bm
        ?`<strong>Sistem Laporan FN SMP</strong> 📋<br><br>Laporan dihantar terus ke Discord admin team dalam masa nyata. 4 jenis laporan:<br><br><span class="tag red">🐛 Bug Report</span> — Sesuatu yang rosak atau tak berfungsi<br><span class="tag" style="border-color:rgba(251,146,60,.3);color:#fb923c">⚠️ Server Issue</span> — Lag, crash, downtime, prestasi<br><span class="tag gold">🚨 Player Report</span> — Griefing, cheat, harassment, melanggar rules<br><span class="tag blue">💡 Suggestion</span> — Idea, plugin request, cadangan<br><br><em>Laporan palsu boleh lead to tindakan balik. Submit genuine reports sahaja.</em><br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report">Submit Report →</a>`
        :`<strong>FN SMP Report System</strong> 📋<br><br>Reports go directly to the Discord admin team in real time. 4 report types:<br><br><span class="tag red">🐛 Bug Report</span> — Something broken or not working as expected<br><span class="tag" style="border-color:rgba(251,146,60,.3);color:#fb923c">⚠️ Server Issue</span> — Lag, crashes, downtime, performance<br><span class="tag gold">🚨 Player Report</span> — Griefing, cheating, harassment, rule violations<br><span class="tag blue">💡 Suggestion</span> — Ideas, plugin requests, improvements<br><br><em>False reports may result in action taken against the reporter. Genuine reports only.</em><br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report">Submit Report →</a>`,
    },

    // ========== NEW KB ENTRIES ==========

    { id:'paiz_construction', cat:'corp',
      kw:['paiz construction','paiz™ construction','paiz construction company','bina tlsrl','kontraktor thelol','paiz builders','sub-02','paiz construction sub-02'],
      fup:['TLSRL','Paiz Corp','TL Railways'],
      r:(bm)=>bm
        ?`<strong>Paiz™ Construction</strong> 🏗️ — Paiz® Corp SUB-02<br><br>Syarikat pembinaan nasional The LoL. Bertanggungjawab untuk:<br>— Pembinaan <strong>TLSRL</strong> (4,800+ blok rel)<br>— Pembinaan <strong>TLCC Twin Towers</strong><br>— Pembinaan <strong>Terminal Bersepadu Spawn</strong><br>— Pelbagai farm dan infrastruktur awam<br><br>Diketuai oleh Faiz4224. Semua projek megabinaan The LoL.<br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`
        :`<strong>Paiz™ Construction</strong> 🏗️ — Paiz® Corp SUB-02<br><br>The LoL's national construction company. Responsible for:<br>— <strong>TLSRL</strong> construction (4,800+ blocks of rail)<br>— <strong>TLCC Twin Towers</strong> construction<br>— <strong>Terminal Bersepadu Spawn</strong> construction<br>— Various farms and public infrastructure<br><br>Headed by Faiz4224. All major The LoL megaprojects.<br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`,
    },

    { id:'tl_railways', cat:'corp',
      kw:['tl railways','tl railways sub-01','kereta api thelol','national rail thelol','tl rail','sub-01','rail subsidiary'],
      fup:['TLSRL','Paiz Corp','Show TLSRL photos'],
      r:(bm)=>bm
        ?`<strong>TL Railways</strong> 🚆 — Paiz® Corp SUB-01<br><br>Pengendali sistem rel nasional The LoL. Mengendalikan 4 laluan:<br>— <strong>TLSRL</strong> (The LoL–Spawn Railway Link) — 6 stesen<br>— <strong>Monorail</strong> — Laluan bandar<br>— <strong>LRT</strong> — Laluan ringan<br>— <strong>HSB</strong> (High-Speed Bullet) — Laluan ekspres<br><br>Kereta api, stesen, dan tiket dikendalikan sepenuhnya oleh TL Railways.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">Portal TL Railways →</a>`
        :`<strong>TL Railways</strong> 🚆 — Paiz® Corp SUB-01<br><br>Operator of The LoL's national rail system. Operates 4 lines:<br>— <strong>TLSRL</strong> (The LoL–Spawn Railway Link) — 6 stations<br>— <strong>Monorail</strong> — City loop<br>— <strong>LRT</strong> — Light rail<br>— <strong>HSB</strong> (High-Speed Bullet) — Express service<br><br>Trains, stations, and ticketing fully operated by TL Railways.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">TL Railways Portal →</a>`,
    },

    { id:'citizenship_process', cat:'gov',
      kw:['citizenship steps','cara mohon kewarganegaraan','process citizenship','application steps','how to apply step by step','syarat dan langkah'],
      fup:['Citizenship','National ID System','Legal archive'],
      r:(bm)=>bm
        ?`<strong>Langkah Permohonan Kewarganegaraan</strong> 📝<br><br>1️⃣ <strong>Semak syarat</strong> — 16 tahun+, pemain Skyxion aktif, tiada rekod buruk.<br>2️⃣ <strong>Isi borang</strong> — <a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Portal Kewarganegaraan</a><br>3️⃣ <strong>Serahkan</strong> — Black House akan semak dalam masa 7–14 hari.<br>4️⃣ <strong>Terima ID</strong> — Jika diluluskan, The Black House terbitkan <strong>The LoL ID</strong> (format THELOL-YYYY-#####).<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Mohon Sekarang →</a>`
        :`<strong>Citizenship Application Steps</strong> 📝<br><br>1️⃣ <strong>Check requirements</strong> — 16+, active Skyxion player, clean record.<br>2️⃣ <strong>Fill out form</strong> — <a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Citizenship Portal</a><br>3️⃣ <strong>Submit</strong> — Black House reviews within 7–14 days.<br>4️⃣ <strong>Receive ID</strong> — If approved, The Black House issues a <strong>The LoL ID</strong> (format THELOL-YYYY-#####).<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Apply Now →</a>`,
    },

    { id:'tl_wallet', cat:'all',
      kw:['tl wallet','tl$ wallet','simpanan tl$','balance tl$','finance system','wallet thelol'],
      fup:['TL Dollar','Paiz Shop','Paiz Chicken'],
      r:(bm)=>bm
        ?`<strong>TL$ Wallet</strong> 💳<br><br>Setiap warganegara The LoL dengan NIS ID aktif mempunyai dompet TL$ digital. Dompet dipautkan ke ID anda.<br><br>Guna TL$ di:<br>— <strong>Paiz Shop</strong> — beli item Minecraft<br>— <strong>Paiz Chicken</strong> — pesan makanan<br>— (lebih banyak kedai akan datang)<br><br>Semak baki melalui <a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">Citizen Registry</a> (masukkan ID anda).<br><br>Penukaran: Iron → TL$1, Diamond → TL$30, dll.`
        :`<strong>TL$ Wallet</strong> 💳<br><br>Every The LoL citizen with an active NIS ID has a digital TL$ wallet. The wallet is linked to your ID.<br><br>Use TL$ at:<br>— <strong>Paiz Shop</strong> — buy Minecraft items<br>— <strong>Paiz Chicken</strong> — order food<br>— (more stores coming)<br><br>Check your balance via the <a href="https://thelegendoflegiona.github.io/gov/systems/id/registry">Citizen Registry</a> (enter your ID).<br><br>Exchange rates: Iron → TL$1, Diamond → TL$30, etc.`,
    },

    { id:'fnsmp_rules', cat:'fnsmp',
      kw:['fn smp rules','peraturan fn smp','server rules fn','no griefing','no cheating','fn smp guidelines'],
      fup:['FN SMP info','FN SMP report','How to join FN SMP'],
      r:(bm)=>bm
        ?`<strong>Peraturan FN SMP</strong> ⚖️<br><br>📌 <strong>Hormati pemain lain</strong> — Tiada buli, tiada ucapan kebencian.<br>📌 <strong>Tiada griefing</strong> — Jangan musnahkan binaan orang lain.<br>📌 <strong>Tiada cheat / hacked client</strong> — X-ray, fly, speed, etc. dilarang.<br>📌 <strong>Gunakan sistem laporan</strong> — Laporkan sebarang isu melalui <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report">FN SMP Report</a>.<br><br>Melanggar peraturan boleh menyebabkan amaran, suspension sementara, atau larangan kekal.`
        :`<strong>FN SMP Rules</strong> ⚖️<br><br>📌 <strong>Respect other players</strong> — No bullying, no hate speech.<br>📌 <strong>No griefing</strong> — Do not destroy other players' builds.<br>📌 <strong>No cheats / hacked clients</strong> — X-ray, fly, speed, etc. prohibited.<br>📌 <strong>Use the report system</strong> — Report any issues via <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report">FN SMP Report</a>.<br><br>Violating rules may result in warnings, temporary suspension, or permanent ban.`,
    },

    { id:'isc_clearance', cat:'gov',
      kw:['isc clearance','clearance levels','tahap keselamatan isc','public confidential top secret','isc security tiers'],
      fup:['ISC','ISC portal','Government structure'],
      r:(bm)=>bm
        ?`<strong>Tahap Kelulusan ISC</strong> 🔐<br><br><span class="tag">PUBLIC</span> — Maklumat tersedia kepada semua (arkib awam, portal ketelusan).<br><span class="tag">CONFIDENTIAL</span> — Akses dengan kata laluan. Portal Intel menggunakan <code>LEGIONA2026</code>.<br><span class="tag red">TOP SECRET</span> — Hanya kakitangan ISC yang diberi kuasa. Rekod operasi lapangan, identiti ejen, misi aktif.<br><br><a href="https://thelegendoflegiona.github.io/isc/">ISC Portal →</a>`
        :`<strong>ISC Clearance Levels</strong> 🔐<br><br><span class="tag">PUBLIC</span> — Information available to everyone (public archives, transparency portal).<br><span class="tag">CONFIDENTIAL</span> — Password‑protected access. Intel Portal uses <code>LEGIONA2026</code>.<br><span class="tag red">TOP SECRET</span> — Authorized ISC personnel only. Field operation records, agent identities, active missions.<br><br><a href="https://thelegendoflegiona.github.io/isc/">ISC Portal →</a>`,
    },

    { id:'unemployment_era', cat:'history',
      kw:['unemployment era','era pengangguran','post spm','jan 20 2026','spm results 2026','dyno buy minecraft mar 5'],
      fup:['History','Founders','Skyxion'],
      r:(bm)=>bm
        ?`<strong>Unemployment Era (Era Pengangguran)</strong> 📆<br><br>Bermula <strong>20 Januari 2026</strong> — sehari selepas keputusan SPM diumumkan. Ramai pemain The LoL, termasuk Faiz4224 dan Dyno, mengambil cuti panjang selepas SPM.<br><br><strong>5 Mac 2026</strong> — Dyno membeli semula Minecraft Java + Bedrock (RM50) selepas lama tidak bermain.<br><br>Era ini berakhir apabila perbincangan tentang <strong>Altaër Era</strong> bermula pada April 2026. Kembalinya The LoL ke Skyxion sedang dirancang.`
        :`<strong>Unemployment Era</strong> 📆<br><br>Began <strong>January 20, 2026</strong> — the day after SPM results were released. Many The LoL players, including Faiz4224 and Dyno, took an extended break after SPM.<br><br><strong>March 5, 2026</strong> — Dyno re-purchased Minecraft Java + Bedrock (RM50) after not playing for a long time.<br><br>This era ended when discussions about the <strong>Altaër Era</strong> began in April 2026. The LoL's return to Skyxion is now being planned.`,
    },

    { id:'sus_name_origin', cat:'history',
      kw:['sus name origin','asal usul nama sus','the sus indonesian','why called the sus','inspirasi nama sus'],
      fup:['History','The Sus Era','Founders'],
      r:(bm)=>bm
        ?`<strong>Asal Usul Nama "The Sus"</strong> 🎭<br><br>Nama <strong>"The Sus"</strong> diilhamkan daripada siri roleplay Minecraft Indonesia yang popular. Bukan singkatan kepada "suspicious" atau perkataan negatif.<br><br>Pada 21 Februari 2023, Imii Kun mencadangkan nama baru: <strong>"The Legend of Legiona"</strong> — dan nama itu kekal sehingga kini.<br><br>Warisan The Sus masih dikenang sebagai permulaan segala-galanya.`
        :`<strong>Origin of the Name "The Sus"</strong> 🎭<br><br>The name <strong>"The Sus"</strong> was inspired by a popular Indonesian Minecraft roleplay series. It is not an abbreviation for "suspicious" or any negative term.<br><br>On February 21, 2023, Imii Kun proposed a new name: <strong>"The Legend of Legiona"</strong> — and that name has remained ever since.<br><br>The legacy of The Sus is still remembered as the beginning of everything.`,
    },

  ]; // end KB

  /* ── CHIPS (expanded) ── */
  const ALL_CHIPS = {
    all:['Who are The LoL founders?','What is The LoL?','Show me The LoL City 📷','Show me TLSRL 📷','/search government','What is FN SMP?'],
    history:['History of The LoL','Show founding photos 📷','UltraX2020 crisis','Show neverland 📷','EhekSquad','Show ender dragon 📷','When was The LoL founded?','Who defeated the Ender Dragon?','What happened on 20 Jan 2026?'],
    gov:['Government structure','ISC agency','National ID System','/search citizenship','All legal documents','The Black House','Naming policy','How to check my citizenship status?','What is the NIS ID format?'],
    corp:['All 5 Paiz Corp subsidiaries','Show TLSRL railway 📷','The LoL Movie','show terminal 📷','Paiz Chicken','TL Dollar exchange'],
    fn:['What is Freaky Niggas?','Freaky News page','FN Servers','What is FN SMP?','/search fn smp'],
    fnsmp:['What is FN SMP?','How to join FN SMP','FN SMP plugins','FN SMP changelog','FN SMP known issues','FN SMP roadmap','Submit FN SMP report','FN SMP server rules','FN SMP lag fix'],
    nis:['What is the National ID System?','How to view my ID Card','Verify a The LoL ID','Citizen Registry','Citizenship tiers explained','National ID Portal','How to get my THELOL ID?','What does suspended status mean?'],
    images:['Show me The LoL City 📷','Show me TLSRL 📷','Show me the last day 📷','Show me ender dragon 📷','Show me the sus base 📷','Show me neverland 📷','Show golden era photos 📷','Show TLCC Twin Towers 📷','Show bye thelol photo 📷','Show terminal photos 📷'],
    isc_img:['Show ISC TLCC attack files 📷','Show ISC operations 📷','Show ISC legacy records 📷','Show ISC city attacks 📷','ISC clearance code','What is ISC?'],
  };

  /* ── SCORING ENGINE (unchanged) ── */
  function scoreEntry(kw, q) {
    let s = 0;
    for (const k of kw) {
      const kt = k.trim().toLowerCase();
      if (q === kt)                        { s += kt.split(/\s+/).length * 20 + 40; continue; }
      if (q.includes(kt))                  { s += kt.split(/\s+/).length * 12 + 4; continue; }
      if (kt.includes(q) && q.length > 3) { s += 5; continue; }
      const kw2 = kt.split(/\s+/), qw = q.split(/\s+/);
      const shared = kw2.filter(w => w.length > 3 && qw.some(qword => qword.includes(w) || w.includes(qword)));
      if (shared.length) s += shared.length * 4;
    }
    return s;
  }

  function bestMatch(txt) {
    const q = txt.toLowerCase().trim().replace(/[?!.,;:'"]/g, '');
    let bestTxt = null, bestImg = null, bsTxt = 0, bsImg = 0;
    for (const e of KB)     { const s = scoreEntry(e.kw, q); if (s > bsTxt) { bsTxt = s; bestTxt = e; } }
    for (const e of IMG_KB) { const s = scoreEntry(e.kw, q); if (s > bsImg) { bsImg = s; bestImg = e; } }
    if (bsImg > 2 && bsImg >= bsTxt) return { type:'image', entry:bestImg };
    if (bsTxt > 2) return { type:'text',  entry:bestTxt  };
    return null;
  }

  function searchPortals(query) {
    const q = query.toLowerCase();
    return PORTALS.map(p => {
      let s = 0;
      if (p.name.toLowerCase().includes(q)) s += 20;
      if (p.desc.toLowerCase().includes(q)) s += 10;
      if (p.tag.toLowerCase().includes(q))  s += 15;
      return { ...p, s };
    }).filter(p => p.s > 0).sort((a,b) => b.s - a.s).slice(0, 6);
  }

  function searchAllKB(query) {
    const q = query.toLowerCase().trim();
    const tr = KB.map(e    => ({ type:'text',  entry:e, score:scoreEntry(e.kw, q) })).filter(r => r.score > 0);
    const ir = IMG_KB.map(e => ({ type:'image', entry:e, score:scoreEntry(e.kw, q) })).filter(r => r.score > 0);
    return [...tr, ...ir].sort((a,b) => b.score - a.score).slice(0, 5);
  }

  function isShowIntent(q) {
    return /^(show me|show|tunjuk|gambar|tengok|preview|lihat gambar|foto|photos? of|images? of|pic|pics)/i.test(q.trim());
  }

  function isSearchIntent(q) {
    return /^(search|cari|find|look for|lookup|look up|apa ada pasal|ada tak|seach)/i.test(q.trim());
  }

  function fallback(bm) {
    return bm
      ? `Hmm, tak faham betul-betul. 🤔 Cuba <kbd>/search [topik]</kbd> atau <kbd>/show [gambar]</kbd> atau <kbd>/fnsmp</kbd> untuk info server, atau <kbd>/help</kbd> untuk senarai arahan.`
      : `Didn't catch that one. 🤔 Try <kbd>/search [topic]</kbd>, <kbd>/show [photo]</kbd>, <kbd>/fnsmp</kbd> for server info, or <kbd>/help</kbd> for all commands.`;
  }

  function imgGrid(paths, caption = '') {
    if (!paths || !paths.length) return '';
    const cls = paths.length === 1 ? 'single' : paths.length === 2 ? 'duo' : paths.length === 3 ? 'trio' : '';
    const imgs = paths.map((p, i) =>
      `<img src="${p}" class="paiz-img" loading="lazy"
        onclick="(window.lbOpen||function(){})(${JSON.stringify(paths).replace(/"/g,"'")},${i})"
        onerror="this.style.display='none'" alt="Photo ${i+1}">`
    ).join('');
    const cap = caption ? `<div class="img-caption">${caption}</div>` : '';
    return `<div class="img-grid ${cls}">${imgs}</div>${cap}`;
  }

  /* ── EXPOSE ── */
  window.PaizEngine = {
    VERSION:       '5.3',
    BUILD:         '2026.05.13',
    GALLERY_ROOT,
    ISC_ROOT,
    KB,
    IMG_KB,
    PORTALS,
    ALL_CHIPS,
    detectBM,
    scoreEntry,
    bestMatch,
    searchPortals,
    searchAllKB,
    isShowIntent,
    isSearchIntent,
    fallback,
    imgGrid,
  };

})();
