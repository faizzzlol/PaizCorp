/**
 * ═══════════════════════════════════════════════════════════════
 *  pAIz Engine v5.2
 *  Reusable KB + logic for The Legend of Legiona / Paiz® Corp AI.
 *
 *  Usage on any page:
 *    <script src="https://faizzzlol.github.io/paizcorp/assets/js/pAIz-engine.js"></script>
 *
 *  Access via: window.PaizEngine
 *    PaizEngine.KB          — text knowledge entries
 *    PaizEngine.IMG_KB      — image knowledge entries
 *    PaizEngine.PORTALS     — portal/link directory
 *    PaizEngine.ALL_CHIPS   — category chip sets
 *    PaizEngine.detectBM(q) — returns true if query is Bahasa Malaysia
 *    PaizEngine.bestMatch(q)— returns {type,entry} or null
 *    PaizEngine.searchPortals(q)  — returns filtered PORTALS array
 *    PaizEngine.searchAllKB(q)    — returns scored KB+IMG_KB results
 *    PaizEngine.imgGrid(paths, caption) — returns HTML string
 *    PaizEngine.fallback(bm) — fallback response string
 *    PaizEngine.isShowIntent(q)   — true if user wants photos
 *    PaizEngine.isSearchIntent(q) — true if user wants search
 * ═══════════════════════════════════════════════════════════════
 */
(function () {
  'use strict';

  /* ── ROOTS ── */
  // IMPORTANT: verify these paths match your actual repo structure
  const GALLERY_ROOT = 'https://thelegendoflegiona.github.io/gallery';
  const ISC_ROOT     = 'https://thelegendoflegiona.github.io/isc';

  /* ── BM DETECTION ── */
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
    'join','laporan',
  ];

  function detectBM(q) {
    const w = q.toLowerCase().split(/\s+/);
    return w.some(x => BM_WORDS.includes(x)) ||
      /[a-z]+(lah|kan|la|wei|weh|ke|pun|je|dah|tak)$/.test(q.toLowerCase());
  }

  /* ── PORTALS (26 entries) ── */
  const PORTALS = [
    { tag:'NATION HOME',   name:'The Legend of Legiona',       url:'https://thelegendoflegiona.github.io/main/',                                  desc:'Main hub — history, network, founders, bento grid' },
    { tag:'GOVERNMENT',    name:'Government Portal',            url:'https://thelegendoflegiona.github.io/gov/',                                   desc:'Proclamation, history, departments, megaprojects' },
    { tag:'BLACK HOUSE',   name:'Office of the President',      url:'https://thelegendoflegiona.github.io/gov/black-house',                        desc:'The Black House — executive office of Faiz4224' },
    { tag:'INTELLIGENCE',  name:'ISC Portal',                   url:'https://thelegendoflegiona.github.io/isc/',                                   desc:'Internal Security Control — intelligence agency' },
    { tag:'ISC ARCHIVE',   name:'ISC National Transparency',    url:'https://thelegendoflegiona.github.io/isc/national/',                          desc:'Public records, TLIO history, operational timeline' },
    { tag:'ISC SEARCH',    name:'ISC Public Archive Search',    url:'https://thelegendoflegiona.github.io/isc/search/',                            desc:'Declassified missions, legal docs, incidents' },
    { tag:'CITIZENSHIP',   name:'Citizenship Portal',           url:'https://thelegendoflegiona.github.io/gov/systems/citizenship/',               desc:'Apply, renew, check eligibility and obligations' },
    { tag:'CITIZEN STATUS',name:'Citizenship Status Checker',   url:'https://thelegendoflegiona.github.io/gov/systems/citizenship/status',         desc:'Check application status by reference number' },
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
    { tag:'AI ASSISTANT',  name:'pAIz v5.2',                    url:'https://faizzzlol.github.io/paizcorp/pAIz',                                   desc:'Omniscient AI assistant with slash commands' },
    { tag:'FREAKY NIGGAS', name:'Freaky Niggas Community',      url:'https://faizzzlol.github.io/freakyniggas/',                                   desc:'Dark monochrome glitch aesthetic · Minecraft servers · Freaky News' },
    { tag:'FREAKY NEWS',   name:'Freaky News (EN/BM)',          url:'https://faizzzlol.github.io/freakyniggas/news',                               desc:'Bilingual news with localStorage EN/BM toggle' },
    { tag:'FN SERVERS',    name:'Freaky Niggas Servers',        url:'https://faizzzlol.github.io/freakyniggas/servers',                            desc:'Minecraft server listings' },
    { tag:'FN FEEDBACK',   name:'Freaky Niggas Feedback',       url:'https://faizzzlol.github.io/freakyniggas/feedback',                           desc:'Submit feedback form' },
    { tag:'FN SMP',        name:'FN SMP — Freaky Niggas',       url:'https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp',                   desc:'Java & Bedrock crossplay SMP · V1.3.3 · 10 slots · minekeep.net · Singapore' },
    { tag:'FN SMP REPORT', name:'FN SMP Report System',         url:'https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp-report',            desc:'Submit bug, player, server issue or suggestion reports to admin team' },
  ];

  /* ── IMAGE KNOWLEDGE BASE ── */
  const IMG_KB = [
    {
      id:'img_neverland', cat:'images',
      kw:['neverland','show neverland','neverland 2020','gambar neverland','tunjuk neverland','era 0','pre era','before the sus','sebelum the sus','neverland photos','era neverland','show era 0'],
      era:'ERA 0 // PRE-THE-SUS // 2020',
      images:[
        `${GALLERY_ROOT}/[1]_NEVERLAND_2020/byDYNO_a_selfie_with_syaz_dyno_and_unidentified_player.jpg`,
        `${GALLERY_ROOT}/[1]_NEVERLAND_2020/byDYNO_maybe_BEFORE_THE_FLOWEY_BLOODMOON_EVENT.jpg`,
        `${GALLERY_ROOT}/[1]_NEVERLAND_2020/IDK.jpg`,
        `${GALLERY_ROOT}/[1]_NEVERLAND_2020/sendbyDYNO.jpg`,
      ],
      r:(bm)=>bm
        ?`Ini gambar dari <strong>Era Neverland (2020)</strong> — zaman sebelum The Sus, sebelum The LoL. Server Skyxion awal. Gambar oleh Dyno.`
        :`Photos from the <strong>Neverland Era (2020)</strong> — before The Sus, before The LoL. The earliest surviving images from Skyxion's first days. Shot by Dyno.`,
    },
    {
      id:'img_sus', cat:'images',
      kw:['the sus','show the sus','sus base','first base','artificial island','asal the sus','gambar the sus','tunjuk the sus','sus island','sus era','era 1','show era 1','tunjuk era 1'],
      era:'ERA 1 // THE SUS // 2022',
      images:[`${GALLERY_ROOT}/[2]_THE_SUS/byDYNO_FIRST_THE_SUS_BASE.jpg`],
      r:(bm)=>bm
        ?`<strong>Pangkalan Sus Pertama</strong> — pulau buatan di mana semuanya bermula. Faiz4224, ItzDynozz, dan Imii Kun bina di sini — farm, chest, furnace.`
        :`<strong>The First Sus Base</strong> — the artificial island where it all began. Faiz4224, ItzDynozz and Imii Kun built everything here — farms, chests, furnaces. This is the moment that started it all.`,
    },
    {
      id:'img_founded', cat:'images',
      kw:['the lol founded','penubuhan','founded','first day','hari pertama','gambar penubuhan','tunjuk penubuhan','founding day','1st day thelol','show founding','era 2','first the lol','2023 february','feb 2023'],
      era:'ERA 2 // GOLDEN ERA // FEB 2023',
      images:[
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023_02_21_‏‎7_12_04_ PM_byFaiz4224_THE_LOL_WAS_FOUNDED.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-02-20_BY_Faiz4224_FIRST_SPAWN_INTO_THE_SERVER_IN_WORLD_SPAWNPOINT.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-02-21_OTW_TO_THE_LOL_WITH_IMII.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-02-22_BY_Faiz4224_EARLY.png`,
      ],
      r:(bm)=>bm
        ?`<strong>The Legend of Legiona diasaskan</strong> pada 21 Februari 2023, pukul 7:12 PM. Imii Kun menamakan semula The Sus. Sejarah bermula.`
        :`<strong>The Legend of Legiona was founded</strong> on February 21, 2023 at 7:12 PM. The moment Imii Kun renamed The Sus and history began. First spawn, the journey across the ocean, the earliest settlement.`,
    },
    {
      id:'img_city', cat:'images',
      kw:['the lol city','bandar thelol','city view','pandangan bandar','gambar bandar','tunjuk bandar','show city','main road','jalan utama','golden era','city photos','lol city','show lol city','city thelol'],
      era:'ERA 2 // GOLDEN ERA // 2023',
      images:[
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-29 (4).png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-05-12 (5).png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-15 (6).png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-05-01 (2).png`,
      ],
      r:(bm)=>bm
        ?`<strong>The LoL City</strong> semasa era keemasannya — jalan utama, TLCC Twin Towers, dan pokok cherry blossom. Indah gila! 🌸`
        :`<strong>The LoL City</strong> during the Golden Era — the main road with TLCC Twin Towers dominating the skyline, cherry blossom trees, and the THE LOL globe structure. The city at its most beautiful.`,
    },
    {
      id:'img_tlcc', cat:'images',
      kw:['tlcc','twin towers','menara kembar','tlcc view','top of tlcc','tlcc construction','tlcc photos','gambar tlcc','tunjuk tlcc','show tlcc','convention centre','menara'],
      era:'ERA 2 // GOLDEN ERA // 2023',
      images:[
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-03-03_BY_Faiz4224_THE_LOL_CITY_VIEW_FROM_TLCC.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-03-03_BY_Faiz4224_HIGHEST_STRUCTURED_IN_THE_LOL_AND_SKYXION.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-15_BY_Faiz4224_FIRST_ELEVATOR_INSIDE_TLCC_IN_THE_LOL.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-29 (2).png`,
      ],
      r:(bm)=>bm
        ?`<strong>TLCC Twin Towers</strong> — mercu tanda paling ikonik The LoL. Dari puncak menara (Y=320 — had ketinggian Minecraft!), lif pertama dalam TLCC, dan tapak pembinaan Menara 2.`
        :`<strong>TLCC Twin Towers</strong> — The LoL's most iconic landmark. The view from the absolute height limit (Y=320!), the first elevator inside TLCC, and Tower 2 groundbreaking. The tallest structure in all of Skyxion.`,
    },
    {
      id:'img_map', cat:'images',
      kw:['territory','map','peta','tunjuk peta','show map','gambar peta','thelol map','peta thelol','seed map','chunkbase','territory map'],
      era:'ERA 2 // GOLDEN ERA // 2023',
      images:[
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/byFAIZ_THE_LOL_MAP_INGAME.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/THE_LOL_MAP.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-14 (3).png`,
      ],
      r:(bm)=>bm
        ?`<strong>Peta Wilayah The LoL</strong> — peta dalam game dan peta ChunkBase rasmi (Seed 1371621129). Lokasi: The LoL City, Highlands, Hi-Tech, Outpost, Flutopia, Bandar The LoL.`
        :`<strong>The LoL Territory Maps</strong> — the in-game map and the official ChunkBase seed map (Seed 1371621129, Bedrock 1.19). Locations: The LoL City, Highlands, Hi-Tech, Outpost, Flutopia, Bandar The LoL.`,
    },
    {
      id:'img_farm', cat:'images',
      kw:['farm','iron farm','ladang','national farm','gambar farm','show farm','tunjuk farm','first farm','ikan farm'],
      era:'ERA 2 // GOLDEN ERA // APR 2023',
      images:[`${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-20_BY_Faiz4224_FIRST_IRON_FARM_BY_IKAN.png`],
      r:(bm)=>bm
        ?`<strong>Iron Farm Pertama</strong> — dibina oleh Ikan (ikanuwu). Pandangan dari atas platform air yang dikelilingi ladang buluh. Mula penggerak ekonomi The LoL!`
        :`<strong>The First Iron Farm</strong> — built by Ikan (ikanuwu). Aerial view of the water platform surrounded by bamboo farms. The beginning of The LoL's economic engine.`,
    },
    {
      id:'img_tlsrl', cat:'images',
      kw:['tlsrl','show tlsrl','railway photos','gambar kereta api','tunjuk tlsrl','railway','train','tren','rail','kereta api','track','landasan','tlsrl photos','railway images'],
      era:'ERA 5 // RESTORATION // 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-01-13-1.png`,
        `${GALLERY_ROOT}/assets/2024-01-24.png`,
        `${GALLERY_ROOT}/assets/2024-02-04-1.png`,
        `${GALLERY_ROOT}/assets/2024-01-27-1.png`,
      ],
      r:(bm)=>bm
        ?`<strong>TLSRL — The LoL–Spawn Railway Link</strong>: Binaan rel merentasi hutan autumn, stesen platform waktu malam, jambatan viadukt, dan landasan yang dibina blok demi blok. Lebih 4,800 blok! 🚂`
        :`<strong>TLSRL Railway</strong> in construction — riding through an autumn forest valley, the platform station at night lit by lanterns, viaduct bridges crossing gorges, and track laying in the rain. This is how 4,800+ blocks gets built — one block at a time.`,
    },
    {
      id:'img_terminal', cat:'images',
      kw:['terminal','terminal bersepadu spawn','spawn terminal','gambar terminal','tunjuk terminal','show terminal','station','stesen spawn','integrated terminal'],
      era:'ERA 5 // RESTORATION // APR 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-04-05.png`,
        `${GALLERY_ROOT}/assets/2024-04-05-1.png`,
        `${GALLERY_ROOT}/assets/2024-04-05-2.png`,
        `${GALLERY_ROOT}/assets/2024-04-05-3.png`,
      ],
      r:(bm)=>bm
        ?`<strong>Terminal Bersepadu Spawn</strong> — pusat TLSRL. Dewan agung dengan arah ke Platform 1&2, HSB, Kafeteria, Info, E-Chest. Bangunan dalaman paling gah dalam sejarah The LoL!`
        :`<strong>Terminal Bersepadu Spawn</strong> — TLSRL's centrepiece. The grand hall with directional signs to Platforms 1&2, HSB, Food Court, Info, E-Chest. Portrait artwork on walls. Multi-level with Level G. The most ambitious interior build in The LoL's history.`,
    },
    {
      id:'img_dragon', cat:'images',
      kw:['ender dragon','dragon','end','naga','gambar dragon','show dragon','tunjuk dragon','fight dragon','lawan dragon','the end','end poem','end poem faiz','faiz4224 end poem'],
      era:'ERA 7 // FINAL ACTIVE ERA // JUNE 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-06-22-3.png`,
        `${GALLERY_ROOT}/assets/2024-06-22-4.png`,
        `${GALLERY_ROOT}/assets/2024-06-22-5.png`,
        `${GALLERY_ROOT}/assets/2024-06-22-6.png`,
      ],
      r:(bm)=>bm
        ?`<strong>Pertarungan Ender Dragon</strong> — Faiz4224 dan Dyno (LonelyDynozz) bersama lawan dragon. Chat: "3...2...1..." Epic gila. Dan End Poem sendiri address <strong>Faiz4224?</strong> — "Yes. Take care." Day 936. 👑`
        :`<strong>The Ender Dragon fight</strong> — Faiz4224 and LonelyDynozz (Dyno) counting down together. The dragon's HP bar. And then… the End Poem itself addresses <strong>Faiz4224?</strong> — "Yes. Take care. It has reached a higher level now." Day 936.`,
    },
    {
      id:'img_end_city', cat:'images',
      kw:['end city','elytra','purpur','gambar end city','show end city','tunjuk end city','flying elytra','end city photos'],
      era:'ERA 7 // FINAL ACTIVE ERA // JUNE 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-06-22-7.png`,
        `${GALLERY_ROOT}/assets/2024-06-22-8.png`,
      ],
      r:(bm)=>bm
        ?`<strong>End City</strong> — gambar <em>Diamond Sword Faiz4224</em> dengan full enchants, dan Faiz4224 terbang dengan Elytra. Day 958!`
        :`<strong>End City exploration</strong> — the legendary "Diamond Sword Faiz4224" in a chest room (Fire Aspect II, Unbreaking III, Sharpness IV, Looting III, Knockback II, Mending I), and Elytra flight between End City islands. Day 958.`,
    },
    {
      id:'img_bye', cat:'images',
      kw:['bye thelol','goodbye','selamat tinggal','emotional photo','gambar sedih','most emotional','gambar thelol terakhir','goodbye photo','bye','farewell'],
      era:'ERA 7 // FINAL ACTIVE ERA // JUNE 20, 2024',
      images:[`${GALLERY_ROOT}/assets/2024-06-20.png`],
      r:(bm)=>bm
        ?`Gambar paling sedih dalam arkib. Chat: <em>"bye thelol"</em>. Faiz4224 terbang di atas bukit cherry blossom atas strider di atas lava, melihat ke bawah pada tanah yang dibina. June 20, 2024. 💔`
        :`The most poignant image in the entire archive. Chat simply reads: <em>"bye thelol."</em> Faiz4224 flying above The LoL's cherry blossom hills on a strider over lava, looking down at the land he built. June 20, 2024.`,
    },
    {
      id:'img_lastday', cat:'images',
      kw:['last day','hari terakhir','aug 24','august 24 2024','last screenshot','gambar terakhir','final day','wyvern','dragon wyvern','show last day','tunjuk hari terakhir'],
      era:'ERA 7 // FINAL ACTIVE ERA // AUG 24, 2024',
      images:[`${GALLERY_ROOT}/[5]_THE_LOL_LATEST_2024/2024-08-24.png`],
      r:(bm)=>bm
        ?`<strong>Hari Terakhir</strong> — 24 Ogos 2024. Hari ke-2729. Wyvern naga terbang di langit biru cerah di atas daerah. Screenshot terakhir yang pernah diambil di server ni.`
        :`<strong>The Last Day</strong> — August 24, 2024. Day 2729. A custom wyvern dragon soars through a clear blue sky above the district. The last screenshot ever taken on this server.`,
    },
    {
      id:'img_tlcc_attack', cat:'isc_img',
      kw:['tlcc attack','menara diserang','drone attack','serangan dron','tlcc bombed','tlcc attacked','show attack','gambar serangan','tunjuk serangan','ultrax attack','isc attack files','show tlcc attack'],
      era:'ERA 4 // CHAOS // ISC CLASSIFIED',
      images:[
        `${ISC_ROOT}/SAFETY-OPS/IMG-20230530-WA0004.jpg`,
        `${ISC_ROOT}/SAFETY-OPS/IMG-20230530-WA0005.jpg`,
      ],
      r:(bm)=>bm
        ?`<span class="tag red">ISC CLASSIFIED</span><br><strong>Serangan ke atas TLCC Twin Towers</strong> — dokumentasi pasca-insiden dari hub komersial dan tingkat kediaman TLCC selepas serangan pada 2023-05-30.`
        :`<span class="tag red">ISC CLASSIFIED</span><br><strong>Attack on TLCC Twin Towers</strong> — post-incident documentation of the commercial hub and residential levels following the 2023-05-30 event. Structural tampering and unauthorized access documented under ISC jurisdiction.`,
    },
    {
      id:'img_tlc_attacks', cat:'isc_img',
      kw:['city bombing','bandar dibom','city attacked','sign bombed','tanda dibom','ultrax crisis','chaos era attack','isc incident report','tlc attacks','show city attack','gambar insiden'],
      era:'ERA 4 // CHAOS // ISC INCIDENT REPORT',
      images:[
        `${ISC_ROOT}/TLC_ATTACKS/2023-05-11 (3).png`,
        `${ISC_ROOT}/TLC_ATTACKS/2023-05-12 (2).png`,
      ],
      r:(bm)=>bm
        ?`<span class="tag red">ISC INCIDENT REPORT</span><br><strong>Serangan di The LoL City</strong> — letupan pertama dilaporkan oleh rakyat The LoL, diikuti dengan papan tanda bandar yang <strong>dibom</strong>. Didokumen semasa era pemerintahan UltraX2020.`
        :`<span class="tag red">ISC INCIDENT REPORT</span><br><strong>The LoL City Attacks</strong> — the initial explosion reported by The LoL people, followed by the <strong>city sign bombing</strong>. Documented during the UltraX2020 presidency. The darkest chapter in The LoL's history.`,
    },
    {
      id:'img_safety_ops', cat:'isc_img',
      kw:['safety ops','operation','ops','isc operation','safety operation','isc ops','show ops','gambar ops','classified ops','operasi','field operation'],
      era:'ISC CLASSIFIED // SAFETY-OPS RECORDS',
      images:[
        `${ISC_ROOT}/SAFETY-OPS/2023-03-03 (6).png`,
        `${ISC_ROOT}/SAFETY-OPS/2023-05-11 (1).png`,
        `${ISC_ROOT}/SAFETY-OPS/2023-05-11 (2).png`,
      ],
      r:(bm)=>bm
        ?`<span class="tag red">ISC CLASSIFIED</span><br><strong>Rekod Operasi Keselamatan</strong> — rekod lapangan dari operasi kawalan keselamatan. Details operasi disekat daripada rekod awam.`
        :`<span class="tag red">ISC CLASSIFIED</span><br><strong>Safety Operations Records</strong> — field imagery from clandestine operations within Skyxion. Operative identities and mission specifics have been expunged from the public record.`,
    },
    {
      id:'img_legacy', cat:'isc_img',
      kw:['legacy records','neverland isc','isc neverland','legacy isc','isc legacy','old records','rekod lama','show legacy','gambar legacy','flowey isc','isc 2020'],
      era:'PRE-ERA // ISC LEGACY ARCHIVE // 2020',
      images:[
        `${ISC_ROOT}/LEGACY_RECORDS/WhatsApp Image 2026-03-04 at 2.12.54 AM (1).jpeg`,
        `${ISC_ROOT}/LEGACY_RECORDS/WhatsApp Image 2026-03-04 at 2.12.54 AM.jpg`,
      ],
      r:(bm)=>bm
        ?`<span class="tag gold">ISC LEGACY ARCHIVE</span><br><strong>Rekod Warisan: Era Neverland</strong> — gambar arkib dari zaman pra-Skyxion (2020). Mendokumen operasi awal dan beban taktik Unit-█████.`
        :`<span class="tag gold">ISC LEGACY ARCHIVE</span><br><strong>Legacy Records: Neverland Era (2020)</strong> — archived footage from pre-Skyxion operations. Documents early experimental procedures and Unit-█████ tactical loadout. One of the few surviving records from this era.`,
    },
    {
      id:'img_horror', cat:'images',
      kw:['horror survival','event server','random effects','gambar event','show event','server event','horror event','chaos event game'],
      era:'ERA 7 // FINAL ACTIVE ERA // JUNE 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-06-23-6.png`,
        `${GALLERY_ROOT}/assets/2024-06-23-7.png`,
        `${GALLERY_ROOT}/assets/2024-06-23-8.png`,
      ],
      r:(bm)=>bm
        ?`<strong>Horror Survival Event</strong> — screen kemerah-merahan, semua kesan random dapat, hampir mati dengan 2 nyawa. Dyno: "bottle o enchanting ada x". Faiz: "pergh semua effect dpt". Chaos gila! 😂`
        :`<strong>Horror Survival Server Event</strong> — the screen tinted red from random status effects, barely alive with 2 hearts. LonelyDynozz: "bottle o enchanting ada x". Faiz4224: "pergh semua effect dpt". The most chaotic server event in the final era.`,
    },
    {
      id:'img_gear', cat:'images',
      kw:['pedang faiz','diamond sword faiz','netherite boots','gear faiz','weapon','senjata','show gear','gambar senjata','equipment','enchanted sword'],
      era:'ERA 7 // FINAL ACTIVE ERA // 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-06-22.png`,
        `${GALLERY_ROOT}/assets/2024-06-29-2.png`,
        `${GALLERY_ROOT}/assets/2024-06-23-3.png`,
      ],
      r:(bm)=>bm
        ?`<strong>Senjata Lagenda Faiz4224</strong>: "Diamond Sword Faiz4224" (Fire Aspect II, Unbreaking III, Sharpness IV, Looting III, Knockback II, Mending I) → upgrade ke "Pedang Faiz4224" Netherite dengan Sharpness V. Plus Netherite Boots dengan Depth Strider III, Soul Speed III, Thorns II!`
        :`<strong>The Legendary Gear</strong>: The "Diamond Sword Faiz4224" (Fire Aspect II, Unbreaking III, Sharpness IV, Looting III, Knockback II, Mending I) later upgraded to the Netherite "Pedang Faiz4224" with Sharpness V. Paired with Netherite Boots featuring Depth Strider III, Soul Speed III, Thorns II, Protection IV and more.`,
    },
    {
      id:'img_era2_all', cat:'images',
      kw:['show era 2','tunjuk era 2','golden era photos','gambar golden era','era emas','era golden','all golden era','golden era images'],
      era:'ERA 2 // GOLDEN ERA // 2023',
      images:[
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-02-24_BY_Faiz4224_FIRST_FUNICULAR_RAILWAY_TO_THE_LOL_HILL.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-03-07_BY_Faiz4224_PROGRAM_PENANAMAN_SEMULA_POKOK.png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-04-22 (1).png`,
        `${GALLERY_ROOT}/[3]_FIRST_THE_LOL/2023-05-01 (3).png`,
      ],
      r:(bm)=>bm
        ?`<strong>Koleksi Era Emas (2023)</strong> — funicular railway pertama ke bukit The LoL, program penanaman semula pokok, Faiz4224 meninjau dari tiang tinggi (11 hari, 16 jam masa bermain!), dan pembinaan TLCC Tower 2.`
        :`<strong>Golden Era Collection (2023)</strong> — the first funicular railway up The LoL Hill, the national tree replanting programme, Faiz4224 surveying from a pillar (11 days 16 hours playtime!), and TLCC Tower 2 under construction.`,
    },
    {
      id:'img_final', cat:'images',
      kw:['show era 7','tunjuk era 7','final era photos','gambar akhir','2024 photos','june 2024','latest photos','last server photos','show 2024'],
      era:'ERA 7 // FINAL ACTIVE ERA // 2024',
      images:[
        `${GALLERY_ROOT}/assets/2024-06-15.png`,
        `${GALLERY_ROOT}/assets/2024-07-01.png`,
        `${GALLERY_ROOT}/assets/2024-07-06.png`,
        `${GALLERY_ROOT}/[5]_THE_LOL_LATEST_2024/2024-07-14__1_.png`,
      ],
      r:(bm)=>bm
        ?`<strong>Era Aktif Terakhir (2024)</strong> — LonelyDynozz (Dyno) dalam padang, bangunan sky platform purpur, lantai Trial Chamber yang penuh dengan gold nugget dari vault, dan pandangan aerial malam dari puncak menara.`
        :`<strong>Final Active Era (2024)</strong> — LonelyDynozz (Dyno) spotted in a field, a sky platform build with purpur blocks, a Trial Chamber floor carpeted in gold nuggets from vault rewards, and a night aerial shot from atop a tall tower overlooking the new district.`,
    },
  ];

  /* ── TEXT KNOWLEDGE BASE ── */
  const KB = [

    /* GREETINGS */
    { id:'greeting', cat:'all',
      kw:['hello','hi','hey','hei','hai','hye','hewlo','helo','hola','morning','good morning','good evening','selamat pagi','selamat petang','selamat malam','pagi','petang','malam','salam','assalamualaikum','wslm','wsp','wassup','wasap','sup','yo','oi','aye','howdy','namaste','apa khabar','apa kabo','apa cerita','apahal','camne','macam mana','sihat','ok tak'],
      fup:['Who are the founders?','What is The LoL?','Show me photos','What is FN SMP?'],
      r:(bm)=>bm
        ?`Eh, wassup! Aku <strong>pAIz v5.2 — Omniscient</strong> — AI assistant rasmi The Legend of Legiona! 😄<br><br>Cuba slash commands:<br>→ <kbd>/gov</kbd> · <kbd>/isc</kbd> · <kbd>/fn</kbd> · <kbd>/fnsmp</kbd> — Shortcut jabatan<br>→ <kbd>/search [topik]</kbd> — Cari semua portal<br>→ <kbd>/show [gambar]</kbd> — Preview foto<br>→ <kbd>/help</kbd> — Semua arahan`
        :`Yo! I'm <strong>pAIz v5.2 — Omniscient</strong> — The LoL's official AI! 🟩<br><br>Slash commands:<br>→ <kbd>/gov</kbd> · <kbd>/isc</kbd> · <kbd>/fn</kbd> · <kbd>/fnsmp</kbd> — Department shortcuts<br>→ <kbd>/search [topic]</kbd> — Search all portals<br>→ <kbd>/show [photo]</kbd> — Preview gallery photos<br>→ <kbd>/help</kbd> — All commands`,
    },

    /* HELP */
    { id:'help', cat:'all',
      kw:['what can you do','help me','boleh buat apa','apa yang kau boleh buat','capabilities','apa ko tahu','what do you know','what are you','who are you','about yourself','about paiz','what is paiz','how do you work','aku boleh tanya apa','nak tanya apa','new features','feature baru','apa baru','commands','slash commands','arahan'],
      fup:['Show me photos','Search history','Search government','What is FN SMP?'],
      r:(bm)=>bm
        ?`Aku <strong>pAIz v5.2 — OMNISCIENT</strong> 🎉<br><br><strong>Slash Commands:</strong><br>→ <kbd>/search [query]</kbd> — Cari semua portal<br>→ <kbd>/show [topic]</kbd> — Preview gambar dari galeri<br>→ <kbd>/gov</kbd> — Struktur kerajaan<br>→ <kbd>/isc</kbd> — Portal ISC<br>→ <kbd>/fn</kbd> — Freaky Niggas<br>→ <kbd>/fnsmp</kbd> — FN SMP server info<br>→ <kbd>/clear</kbd> — Chat baru<br>→ <kbd>/theme</kbd> — Tukar tema<br>→ <kbd>/help</kbd> — Halaman ini<br><br><strong>📚 Tanya je:</strong> Sejarah · Kerajaan · ISC · Paiz Corp · FN SMP · Gambar galeri`
        :`I'm <strong>pAIz v5.2 — OMNISCIENT</strong> 🎉<br><br><strong>Slash Commands:</strong><br>→ <kbd>/search [query]</kbd> — Search all portals<br>→ <kbd>/show [topic]</kbd> — Preview gallery photos<br>→ <kbd>/gov</kbd> — Government structure<br>→ <kbd>/isc</kbd> — ISC portal<br>→ <kbd>/fn</kbd> — Freaky Niggas<br>→ <kbd>/fnsmp</kbd> — FN SMP server info<br>→ <kbd>/clear</kbd> — New chat<br>→ <kbd>/theme</kbd> — Toggle theme<br>→ <kbd>/help</kbd> — This menu<br><br><strong>📚 Just ask about:</strong> History · Government · ISC · Paiz Corp · FN SMP · Gallery Photos`,
    },

    /* WHAT IS THE LOL */
    { id:'whatlol', cat:'all',
      kw:['what is the lol','apa tu the lol','the lol tu apa','apa itu the lol','what is the legend of legiona','apa tu legend of legiona','about the lol','pasal the lol','tell me about the lol','explain the lol','terangkan the lol','the lol minecraft','minecraft nation','negara minecraft','is the lol a country','what is thelol'],
      fup:['History','Founders','Government','Paiz Corp'],
      r:(bm)=>bm
        ?`<strong>The Legend of Legiona (The LoL)</strong> 🟩<br><br>Negara berdaulat Minecraft di server Skyxion, era Altaër. Diasaskan 2023 oleh Faiz4224, Imii Kun & Dyno. Asalnya "The Sus".<br><br>The LoL ada:<br>— Kerajaan formal (6 jabatan + The Black House)<br>— Agensi perisikan (ISC)<br>— Arkib undang-undang dengan dokumen rasmi<br>— Rangkaian rel 4,800+ blok (TLSRL)<br>— Konglomerat nasional (Paiz® Corp) 5 subsidiari<br>— Sistem kewarganegaraan formal<br>— Galeri foto lengkap 2020–2024`
        :`<strong>The Legend of Legiona (The LoL)</strong> 🟩<br><br>A sovereign Minecraft nation on the Skyxion server, Altaër Era. Founded 2023 by Faiz4224, Imii Kun & Dyno. Originally called "The Sus".<br><br>The LoL has:<br>— Formal government (6 departments + The Black House)<br>— Intelligence agency (ISC)<br>— Legal archive with official documents<br>— 4,800+ block rail network (TLSRL)<br>— National conglomerate (Paiz® Corp) with 5 subsidiaries<br>— Formal citizenship system<br>— Complete photo archive 2020–2024`,
    },

    /* FOUNDERS */
    { id:'founders', cat:'history',
      kw:['founder','founders','pengasas','siapa pengasas','pengasas thelol','who founded','siapa yang buat','siapa yang cipta','orang yang buat thelol','faiz imii dyno','three founders','tiga pengasas','founding members','who created','who started','who built','siapa buat thelol'],
      fup:['Tell me about Faiz4224','History of The LoL','Show founding photos'],
      r:(bm)=>bm
        ?`The LoL diasaskan oleh <strong>tiga orang</strong>:<br><br><strong>🟩 Faiz4224</strong> — Presiden Pertama & Pemimpin Pengasas. Reka bentuk kerajaan dan infrastruktur. Sekarang memimpin dari The Black House. Pengasas dan pengerusi Paiz® Corp.<br><br><strong>🟩 Imii Kun</strong> — Pengasas Bersama & Visionary. Yang menamakan semula The Sus kepada The Legend of Legiona.<br><br><strong>🟩 Dyno</strong> — Pengasas Bersama & Ahli Strategi. Sekarang dikenali sebagai LonelyDynozz. Muncul dalam The LoL: The Movie.`
        :`The LoL was co-founded by <strong>three individuals</strong>:<br><br><strong>🟩 Faiz4224</strong> — First President & Founding Leader. Architect of governance and infrastructure. Currently serving from The Black House. Founded and chairs Paiz® Corp.<br><br><strong>🟩 Imii Kun</strong> — Co-Founder & Visionary. The one who proposed renaming The Sus to The Legend of Legiona.<br><br><strong>🟩 Dyno</strong> — Co-Founder & Strategist. Also known as LonelyDynozz. Appears in The LoL: The Movie.`,
    },

    /* HISTORY */
    { id:'history', cat:'history',
      kw:['history','sejarah','full history','cerita thelol','kisah thelol','macam mana thelol bermula','how did it start','how it started','origin','asal usul','timeline','past','founding story','kisah penubuhan','mula dari mana','camne start','bila start','dulu camne','apa jadi dulu','the story','tell me about the lol history'],
      fup:['The Sus Era','UltraX2020 crisis','EhekSquad','Show era photos'],
      r:(bm)=>bm
        ?`<strong>Sejarah Penuh The Legend of Legiona</strong> 📜<br><br><strong>Era Neverland (2020)</strong> — Sebelum The Sus. Server awal Skyxion. Dyno, Faiz4224 main bersama.<br><br><strong>The Sus (2022)</strong> — Penempatan tidak rasmi. EhekSquad ada asosiasi tak formal, kemudian keluar. EhekSquad masih wujud.<br><br><strong>Penubuhan (Feb 21, 2023)</strong> — Imii Kun namakan semula. The Legend of Legiona lahir!<br><br><strong>Pilihan Raya Pertama (6 Mei 2023)</strong> — UltraX2020 menang, jadi Presiden ke-2.<br><br><strong>Era Krisis (2023)</strong> — Papan tanda dibom, TLCC diserang dron. UltraX2020 letak jawatan.<br><br><strong>Pemulihan (Nov 8, 2023)</strong> — TLIO ditubuhkan. Faiz4224 kembali memimpin.<br><br><strong>Era Altaër (2025–2026)</strong> — ISC aktif. Web ecosystem penuh beroperasi.`
        :`<strong>Full History of The Legend of Legiona</strong> 📜<br><br><strong>Neverland Era (2020)</strong> — Pre-Sus. Early Skyxion server days.<br><br><strong>The Sus (2022)</strong> — Informal settlement. EhekSquad (PhoenixAiman, PandaPutih, Kagee) had undefined association, later departed independently — still exists today.<br><br><strong>Founding (Feb 21, 2023)</strong> — Imii Kun renamed it. The Legend of Legiona born!<br><br><strong>First Election (May 6, 2023)</strong> — UltraX2020 won under PHRTL. Became 2nd President.<br><br><strong>Crisis Era (2023)</strong> — City sign bombed, TLCC drone attacked. UltraX2020 resigned.<br><br><strong>Recovery (Nov 8, 2023)</strong> — TLIO established. Faiz4224 resumed leadership.<br><br><strong>Altaër Era (2025–2026)</strong> — ISC active. Full web ecosystem live.`,
    },

    /* FAIZ4224 */
    { id:'faiz', cat:'history',
      kw:['faiz4224','faiz','about faiz','pasal faiz','siapa faiz','faiz4224 tu siapa','first president','presiden pertama','founder faiz','faiz the lol','president faiz','faiz corp','faiz paiz','faiz pengasas','the black house president'],
      fup:['The Black House','Paiz Corp','Show founding photos','History'],
      r:(bm)=>bm
        ?`<strong>Faiz4224</strong> — Presiden Pertama The LoL dan Pengerusi Paiz® Corp. 👑<br><br>Dia la otak di sebalik semuanya: cadang TLSRL, komisen TLCC, tubuh TL Railways & Paiz™ Construction, lancar PaizShop, lulus The LoL Movie, buka Paiz Chicken. Beroperasi dari <em>The Black House</em>.`
        :`<strong>Faiz4224</strong> — First President of The LoL and Chairman of Paiz® Corp. 👑<br><br>The mind behind everything: proposed TLSRL, commissioned TLCC Twin Towers, established TL Railways & Paiz™ Construction, launched PaizShop, greenlit The LoL Movie, opened Paiz Chicken. Operates from <em>The Black House</em>.`,
    },

    /* GOVERNMENT */
    { id:'government', cat:'gov',
      kw:['government','kerajaan','government structure','struktur kerajaan','black house','the black house','departments','jabatan','ministry','office of the president','six departments','enam jabatan','gov structure','pasal kerajaan','government the lol','thelol gov'],
      fup:['ISC Agency','Legal archive','Citizenship','Faiz4224'],
      r:(bm)=>bm
        ?`<strong>Struktur Kerajaan The LoL</strong> 🏛️<br><br><strong>The Black House</strong> — Pejabat Presiden. Presiden: Faiz4224. Kod dokumen: BH-YYYY-###<br><br><strong>Enam Jabatan:</strong><br>— DEPT-01: <strong>ISC</strong> · AKTIF<br>— DEPT-02: Pejabat Keadilan Nasional<br>— DEPT-03: Kementerian Lore & Arkib<br>— DEPT-04: Bahagian Kerja Awam<br>— DEPT-05: Biro Hubungan Luar<br>— DEPT-06: The LoL Communications<br><br><a href="https://thelegendoflegiona.github.io/gov/">Portal Kerajaan →</a>`
        :`<strong>Government Structure of The LoL</strong> 🏛️<br><br><strong>The Black House</strong> — Office of the President. Current: Faiz4224. Documents: BH-YYYY-###<br><br><strong>Six Departments:</strong><br>— DEPT-01: <strong>ISC</strong> · ACTIVE<br>— DEPT-02: Office of National Justice<br>— DEPT-03: Ministry of Lore & Archives<br>— DEPT-04: Public Works Division<br>— DEPT-05: Bureau of External Relations<br>— DEPT-06: The LoL Communications<br><br><a href="https://thelegendoflegiona.github.io/gov/">Government Portal →</a>`,
    },

    /* BLACK HOUSE */
    { id:'blackhouse', cat:'gov',
      kw:['black house','office of the president','pejabat presiden','bh-','the black house','president office','black house page','ofis presiden'],
      fup:['Faiz4224','Government structure','Legal documents'],
      r:(bm)=>bm
        ?`<strong>The Black House</strong> — Pejabat Rasmi Presiden The LoL. Presiden semasa: Faiz4224.<br><br>Dokumen rasmi menggunakan awalan <span class="tag gold">BH-YYYY-###</span>.<br><br><a href="https://thelegendoflegiona.github.io/gov/black-house">Laman Black House →</a>`
        :`<strong>The Black House</strong> — Official Office of the President of The LoL. Current President: Faiz4224.<br><br>Official documents use prefix <span class="tag gold">BH-YYYY-###</span>.<br><br><a href="https://thelegendoflegiona.github.io/gov/black-house">Black House Page →</a>`,
    },

    /* ISC */
    { id:'isc', cat:'gov',
      kw:['isc','internal security control','intelligence agency','security agency','classified','tlio','t.l.i.o','clearance','intel portal','national security','agensi perisikan','keselamatan','perisikan','apa tu isc','isc tu apa','isc the lol','about isc','pasal isc','isc agency','spy agency','clearance code','password isc','kata laluan isc','legiona2026','isc password'],
      fup:['Show ISC attack files','Show ISC operations','Government structure','Legal documents'],
      r:(bm)=>bm
        ?`<strong>ISC — Internal Security Control</strong> 🔒<br><br>Agensi perisikan rasmi The LoL — DEPT-01. Pengganti kepada <em>T.L.I.O</em> lama.<br><br>Portal: <a href="https://thelegendoflegiona.github.io/isc/">ISC Portal</a> · <a href="https://thelegendoflegiona.github.io/isc/national/">Ketelusan</a> · <a href="https://thelegendoflegiona.github.io/isc/search/">Arkib Carian</a><br><br>Kod akses Intel Portal: <span class="tag">LEGIONA2026</span>`
        :`<strong>ISC — Internal Security Control</strong> 🔒<br><br>The LoL's official intelligence agency — DEPT-01. Successor to the former <em>T.L.I.O</em>.<br><br>Portals: <a href="https://thelegendoflegiona.github.io/isc/">ISC Main</a> · <a href="https://thelegendoflegiona.github.io/isc/national/">Transparency</a> · <a href="https://thelegendoflegiona.github.io/isc/search/">Public Archive</a><br><br>Intel Portal access code: <span class="tag">LEGIONA2026</span>`,
    },

    /* LEGAL */
    { id:'legal', cat:'gov',
      kw:['legal','undang-undang','documents','dokumen','archive','arkib','acts','akta','laws','rights charter','piagam hak','proclamation','proklamasi','legal archive','arkib undang-undang','document list','lolgov','bh-2026','all documents','official documents','law the lol'],
      fup:['Citizenship','Naming policy','Government portal','ISC'],
      r:(bm)=>bm
        ?`<strong>Arkib Undang-undang</strong> 📄<br><br><span class="tag">LOLGOV-2026-0001</span> — Akta Kewarganegaraan<br><span class="tag">LOLGOV-2026-0002</span> — Ordinan Pembatalan<br><span class="tag">LOLGOV-2026-0003</span> — Piagam Hak Warganegara<br><span class="tag">LOLGOV-2026-0004</span> — Rangka Kerja Dasar Kerajaan<br><span class="tag gold">BH-2026-0001</span> — Proklamasi Presiden<br><span class="tag gold">BH-2026-0002</span> — Arahan Penamaan & Gaya (02 Apr 2026)<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">Layari Arkib →</a>`
        :`<strong>Legal Archive</strong> 📄<br><br><span class="tag">LOLGOV-2026-0001</span> — Citizenship Act<br><span class="tag">LOLGOV-2026-0002</span> — Revocation Ordinance<br><span class="tag">LOLGOV-2026-0003</span> — Citizens' Rights Charter<br><span class="tag">LOLGOV-2026-0004</span> — Government Policy Framework<br><span class="tag gold">BH-2026-0001</span> — Presidential Proclamation<br><span class="tag gold">BH-2026-0002</span> — Official Naming & Style Directive<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">Browse Legal Archive →</a>`,
    },

    /* CITIZENSHIP */
    { id:'citizenship', cat:'gov',
      kw:['citizenship','kewarganegaraan','citizen','warganegara','apply','mohon','permohonan','application','citizen rights','hak warganegara','how to join','macam mana nak join','become a citizen','jadi warganegara','jadi rakyat','how to apply','cara mohon','boleh join','nak join thelol','join the lol','masuk the lol','syarat warganegara','syarat masuk'],
      fup:['Legal archive','Government portal','Check citizenship status'],
      r:(bm)=>bm
        ?`<strong>Kewarganegaraan The LoL</strong> 🪪<br><br>Syarat asas: 16 tahun ke atas · Pemain Skyxion aktif · Tiada rekod server buruk<br><br>Dikawal oleh:<br>· LOLGOV-2026-0001 — Akta Kewarganegaraan<br>· LOLGOV-2026-0003 — Piagam Hak Warganegara<br>· LOLGOV-2026-0002 — Ordinan Pembatalan<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Mohon Kewarganegaraan →</a>`
        :`<strong>The LoL Citizenship</strong> 🪪<br><br>Basic requirements: 16+ · Active Skyxion player · Clean server record<br><br>Governed by:<br>· LOLGOV-2026-0001 — Citizenship Act<br>· LOLGOV-2026-0003 — Citizens' Rights Charter<br>· LOLGOV-2026-0002 — Revocation Ordinance<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">Apply for Citizenship →</a>`,
    },

    /* CITIZENSHIP STATUS */
    { id:'citizen_status', cat:'gov',
      kw:['check status','semak status','application status','status permohonan','reference number','thelol-ctzn','citizenship status','cek status','status checker','check application','semak permohonan'],
      fup:['Apply citizenship','Legal archive'],
      r:(bm)=>bm
        ?`<strong>Penyemak Status Kewarganegaraan</strong> 🔎<br><br>Masukkan nombor rujukan (format <span class="tag">THELOL-CTZN-YYYY-####</span>) untuk semak status permohonan anda.<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/status">Semak Sekarang →</a>`
        :`<strong>Citizenship Status Checker</strong> 🔎<br><br>Enter your reference number (format <span class="tag">THELOL-CTZN-YYYY-####</span>) to check your application status.<br><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/status">Check Now →</a>`,
    },

    /* NAMING POLICY */
    { id:'naming', cat:'gov',
      kw:['naming policy','dasar penamaan','style directive','arahan gaya','bh-2026-0002','the lol name','nama the lol','lol abbreviation','standalone lol','how to write the lol','cara tulis the lol','naming directive','arahan penamaan','lol is banned','lol dilarang'],
      fup:['Legal archive','The Black House'],
      r:(bm)=>bm
        ?`<strong>BH-2026-0002 — Arahan Penamaan Rasmi</strong> ✍️<br><br>✅ <strong>"The Legend of Legiona"</strong> — Nama penuh rasmi<br>✅ <strong>"The LoL"</strong> — Singkatan dibenarkan SAHAJA. "The" WAJIB ada.<br>❌ <strong>"LoL"</strong> (bersendirian) — DILARANG KERAS dalam semua bahan.<br><br>Berkuat kuasa 02 April 2026.`
        :`<strong>BH-2026-0002 — Official Naming & Style Directive</strong> ✍️<br><br>✅ <strong>"The Legend of Legiona"</strong> — Full official name<br>✅ <strong>"The LoL"</strong> — Only permitted abbreviation. "The" is mandatory.<br>❌ <strong>"LoL"</strong> (standalone) — STRICTLY PROHIBITED in all materials.<br><br>Effective 02 April 2026.`,
    },

    /* ULTRAX2020 */
    { id:'ultrax', cat:'history',
      kw:['ultrax2020','ultrax','ultra x','2nd president','presiden ke-2','second president','phrtl','crisis','krisis','resigned','letak jawatan','drone attack','serangan dron','bombed city','election 2023','pilihan raya 2023','ultrax presidency','apa jadi ultrax','pasal ultrax','chaos era'],
      fup:['Show ISC attack files','Show TLCC photos','History','The LoL Movie'],
      r:(bm)=>bm
        ?`<strong>UltraX2020 & Krisis (2023)</strong> ⚡<br><br>Menang pilihan raya 6 Mei 2023 di bawah <em>PHRTL</em> — jadi <strong>Presiden ke-2</strong>.<br><br>Semasa pemerintahannya:<br>— Papan tanda bandar <strong>dibom</strong><br>— Serangan dron ke atas <strong>TLCC Twin Towers</strong><br>— Huru-hara politik besar<br><br>UltraX2020 <strong>letak jawatan</strong>. Kuasa kembali ke Faiz4224.`
        :`<strong>UltraX2020 Presidency & Crisis (2023)</strong> ⚡<br><br>Won the first democratic election May 6, 2023 under <em>PHRTL</em> — became <strong>2nd President</strong>.<br><br>During his tenure:<br>— City sign was <strong>bombed</strong><br>— Drone attacks on <strong>TLCC Twin Towers</strong><br>— Broader political crisis<br><br>UltraX2020 <strong>resigned</strong>. Power returned to Faiz4224.`,
    },

    /* EHEKSQUAD */
    { id:'eheksquad', cat:'history',
      kw:['eheksquad','ehek squad','ehek','phoenixaiman','pandaputih','kagee','the sus members','sus era people','siapa eheksquad','pasal eheksquad'],
      fup:['The Sus Era','History of The LoL','Founders'],
      r:(bm)=>bm
        ?`<strong>EhekSquad</strong> — Ahli: PhoenixAiman, PandaPutih, Kagee.<br><br>Ada asosiasi tak ditakrifkan dengan The Sus (2023). Masa The Sus, tiada tadbir urus formal. Status mereka tidak pernah ditetapkan. Diorang keluar dan tubuh semula EhekSquad secara bebas. <strong>Masih wujud hari ini</strong> tanpa hubungan formal dengan The LoL.`
        :`<strong>EhekSquad</strong> — Members: PhoenixAiman, PandaPutih, Kagee.<br><br>Had an undefined association with The Sus (2023). Since The Sus had no formal governance, their exact status was never defined. They departed and re-established independently. <strong>Still exists today</strong> with no formal affiliation to The LoL.`,
    },

    /* TLSRL */
    { id:'tlsrl', cat:'corp',
      kw:['tlsrl','spawn railway','railway link','tren','kereta api','train','stations','stesen','railway project','projek rel','tll','llc','llo','mps','sxj','spn','express service','cargo service','4800','berapa blok tlsrl','berapa panjang tlsrl','panjang tlsrl','tlsrl stations','tlsrl route'],
      fup:['TL Railways','Paiz Corp','Show TLSRL photos','Show terminal photos'],
      r:(bm)=>bm
        ?`<strong>TLSRL — The LoL–Spawn Railway Link</strong> 🚂<br><br>Trek: <strong>4,800+ blok</strong> tertutup · Masa: <strong>~10 minit</strong> · 3 kelas · 6 stesen<br>Stesen: <strong>TLL → LLC → LLO → MPS → SXJ → SPN</strong><br><br>Dioperasikan oleh TL Railways. Dibina oleh Paiz™ Construction. Dicadangkan oleh Faiz4224.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">TL Railways →</a>`
        :`<strong>TLSRL — The LoL–Spawn Railway Link</strong> 🚂<br><br>Track: <strong>4,800+ blocks</strong> enclosed · Time: <strong>~10 minutes</strong> · 3 tiers · 6 stations<br>Stations: <strong>TLL → LLC → LLO → MPS → SXJ → SPN</strong><br><br>Operated by TL Railways. Built by Paiz™ Construction. Proposed by Faiz4224.<br><a href="https://thelegendoflegiona.github.io/tlrailways/">TL Railways →</a>`,
    },

    /* PAIZ CORP */
    { id:'paiz_corp', cat:'corp',
      kw:['paiz corp','paiz® corp','paiz corporation','all subsidiaries','semua subsidiari','five subsidiaries','lima subsidiari','conglomerate','konglomerat','national company','paiz group','overview paiz','apa tu paiz corp','pasal paiz corp','about paiz corp','all companies','semua syarikat'],
      fup:['Paiz Shop','Paiz Chicken','PaizProductions','TL Railways'],
      r:(bm)=>bm
        ?`<strong>Paiz® Corp — Konglomerat Nasional</strong> 🏢<br><br>Diasaskan dan diketuai oleh Faiz4224. Lima subsidiari:<br><br><strong>SUB-01 · TL Railways</strong> — Rel nasional · <a href="https://thelegendoflegiona.github.io/tlrailways/">→</a><br><strong>SUB-02 · Paiz™ Construction</strong> — Bina TLSRL, TLCC, farms<br><strong>SUB-03 · Paiz Shop</strong> — Kedai item Minecraft · <a href="https://faizzzlol.github.io/paizcorp/paizshop/">→</a><br><strong>SUB-04 · PaizProductions</strong> — Studio filem · <a href="https://faizzzlol.github.io/paizcorp/paizproductions/">→</a><br><strong>SUB-05 · Paiz Chicken</strong> — Pesanan makanan · <a href="https://faizzzlol.github.io/paizcorp/paizchicken/">→</a><br><br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`
        :`<strong>Paiz® Corp — National Conglomerate</strong> 🏢<br><br>Founded and chaired by Faiz4224. Five subsidiaries:<br><br><strong>SUB-01 · TL Railways</strong> — National rail · <a href="https://thelegendoflegiona.github.io/tlrailways/">→</a><br><strong>SUB-02 · Paiz™ Construction</strong> — Built TLSRL, TLCC, farms<br><strong>SUB-03 · Paiz Shop</strong> — Minecraft item store · <a href="https://faizzzlol.github.io/paizcorp/paizshop/">→</a><br><strong>SUB-04 · PaizProductions</strong> — Film studio · <a href="https://faizzzlol.github.io/paizcorp/paizproductions/">→</a><br><strong>SUB-05 · Paiz Chicken</strong> — Food ordering · <a href="https://faizzzlol.github.io/paizcorp/paizchicken/">→</a><br><br><a href="https://faizzzlol.github.io/paizcorp/">Paiz® Corp →</a>`,
    },

    /* PAIZ CHICKEN */
    { id:'paiz_chicken', cat:'corp',
      kw:['paiz chicken','chicken','ayam','food','makanan','restaurant','restoran','order food','pesan makanan','food delivery','penghantaran makanan','virtual food','fast food','makan','nak makan','lapar','hungry','paiz food'],
      fup:['Paiz Shop','Paiz Corp','TL Dollar'],
      r:(bm)=>bm
        ?`<strong>Paiz Chicken</strong> 🍗<br><br>Paiz® Corp SUB-05. Pesanan makanan Minecraft merentasi Skyxion. Penghantaran + kutipan · Dalam Diamonds · Discord webhook.<br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">Order →</a>`
        :`<strong>Paiz Chicken</strong> 🍗<br><br>Paiz® Corp SUB-05. Minecraft food ordering across Skyxion. Delivery + pickup · Diamonds · Discord webhook.<br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">Order Now →</a>`,
    },

    /* PAIZ SHOP */
    { id:'paiz_shop', cat:'corp',
      kw:['paiz shop','kedai paiz','shop','store','kedai','buy items','beli item','shulker','mending','unbreaking','nether wart','iron ingot','retail','item shop','minecraft store','apa ada kat shop','barang apa ada','harga item','price items'],
      fup:['Paiz Corp','Paiz Chicken','TL Dollar'],
      r:(bm)=>bm
        ?`<strong>Paiz Shop</strong> 🛒<br><br>Paiz® Corp SUB-03. Item dalam Diamond (◆):<br>Shulker Box ◆4 · Mending I ◆3 · Nether Wart ◆3 · Unbreaking III ◆2 · Iron Ingot ◆1<br><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">Lawati Kedai →</a>`
        :`<strong>Paiz Shop</strong> 🛒<br><br>Paiz® Corp SUB-03. Items in Diamonds (◆):<br>Shulker Box ◆4 · Mending I ◆3 · Nether Wart ◆3 · Unbreaking III ◆2 · Iron Ingot ◆1<br><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">Visit Shop →</a>`,
    },

    /* LOL MOVIE */
    { id:'lolmovie', cat:'corp',
      kw:['the lol movie','lol movie','thelolmovie','filem thelol','feature film','four phases','empat fasa','movie cast','pelakon filem','in production','movie thelol','bila keluar','when release','movie release','lol movie cast','siapa pelakon','pasal movie'],
      fup:['PaizProductions','Founders','UltraX2020'],
      r:(bm)=>bm
        ?`<strong>The LoL: The Movie</strong> 🎬<br><br>Status: <strong>DALAM PENGELUARAN</strong><br><br>Pelakon: Faiz4224 · Imii Kun · Dyno · UltraX2020<br>4 fasa · Epik politik Minecraft · Studio: PaizProductions<br><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/thelolmovie">Laman Filem →</a>`
        :`<strong>The LoL: The Movie</strong> 🎬<br><br>Status: <strong>IN PRODUCTION</strong><br><br>Cast: Faiz4224 · Imii Kun · Dyno · UltraX2020<br>4 phases · Political Minecraft epic · Studio: PaizProductions<br><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/thelolmovie">Film Page →</a>`,
    },

    /* CURRENCY */
    { id:'currency', cat:'all',
      kw:['tl dollar','tl$','currency','wang','duit','mata wang','exchange rate','kadar pertukaran','iron worth','diamond worth','netherite worth','national currency','mata wang nasional','tldollar','tl dolar','how much','berapa','nilai duit'],
      fup:['Paiz Shop','Paiz Chicken'],
      r:(bm)=>bm
        ?`<strong>TL Dollar (TL$)</strong> 💰<br><br>Iron Ingot → TL$1 · Gold Ingot → TL$5 · Emerald → TL$10 · Diamond → TL$30 · Netherite → TL$150<br><br><a href="https://thelegendoflegiona.github.io/gov/finance/">Penukar Mata Wang →</a>`
        :`<strong>TL Dollar (TL$)</strong> 💰<br><br>Iron → TL$1 · Gold → TL$5 · Emerald → TL$10 · Diamond → TL$30 · Netherite → TL$150<br><br><a href="https://thelegendoflegiona.github.io/gov/finance/">Currency Converter →</a>`,
    },

    /* SKYXION */
    { id:'skyxion', cat:'all',
      kw:['skyxion','altaer era','era altaer','altaer','minecraft server','server minecraft','kawaiisho','current era','era semasa','server admin','which server','server mana','skyxion server','what server','apa server','server the lol'],
      fup:['History','Government'],
      r:(bm)=>bm
        ?`<strong>Skyxion & Altaër Era</strong> 🌐<br><br>Skyxion ialah server Minecraft di mana The LoL berada, ditadbir oleh <strong>Kawaiisho</strong>. <strong>Skyxion: Altaër Era</strong> ialah era semasa.`
        :`<strong>Skyxion & Altaër Era</strong> 🌐<br><br>Skyxion is the Minecraft server where The LoL operates, administered by <strong>Kawaiisho</strong>. <strong>Skyxion: Altaër Era</strong> is the current era.`,
    },

    /* ALL PORTALS NAV */
    { id:'nav', cat:'all',
      kw:['link','links','url','website','portal link','where can i find','mana nak cari','all pages','semua halaman','all portals','semua portal','all links','semua link','official links','link rasmi','website the lol','all websites','senarai laman','portals list'],
      fup:['Government portal','ISC portal','Paiz Corp','Gallery','FN SMP'],
      r:(bm)=>bm
        ?`<strong>Semua Portal Rasmi</strong> 🔗<br><br><a href="https://thelegendoflegiona.github.io/main/">🏠 The Legend of Legiona</a><br><a href="https://faizzzlol.github.io/paizcorp/">🏢 Paiz® Corp</a><br><a href="https://thelegendoflegiona.github.io/gov/">🏛️ Kerajaan</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">🪪 Kewarganegaraan</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">📄 Arkib Undang-undang</a><br><a href="https://thelegendoflegiona.github.io/isc/">🔒 ISC</a><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">🛒 Paiz Shop</a><br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">🍗 Paiz Chicken</a><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/">🎬 PaizProductions</a><br><a href="https://thelegendoflegiona.github.io/tlrailways/">🚂 TL Railways</a><br><a href="https://thelegendoflegiona.github.io/gallery/">📷 Gallery</a><br><a href="https://faizzzlol.github.io/freakyniggas/">🖤 Freaky Niggas</a><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">⛏ FN SMP</a>`
        :`<strong>All Official Portals</strong> 🔗<br><br><a href="https://thelegendoflegiona.github.io/main/">🏠 The Legend of Legiona</a><br><a href="https://faizzzlol.github.io/paizcorp/">🏢 Paiz® Corp</a><br><a href="https://thelegendoflegiona.github.io/gov/">🏛️ Government</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/citizenship/">🪪 Citizenship</a><br><a href="https://thelegendoflegiona.github.io/gov/systems/archives/">📄 Legal Archive</a><br><a href="https://thelegendoflegiona.github.io/isc/">🔒 ISC</a><br><a href="https://faizzzlol.github.io/paizcorp/paizshop/">🛒 Paiz Shop</a><br><a href="https://faizzzlol.github.io/paizcorp/paizchicken/">🍗 Paiz Chicken</a><br><a href="https://faizzzlol.github.io/paizcorp/paizproductions/">🎬 PaizProductions</a><br><a href="https://thelegendoflegiona.github.io/tlrailways/">🚂 TL Railways</a><br><a href="https://thelegendoflegiona.github.io/gallery/">📷 Gallery</a><br><a href="https://faizzzlol.github.io/freakyniggas/">🖤 Freaky Niggas</a><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">⛏ FN SMP</a>`,
    },

    /* GALLERY */
    { id:'gallery', cat:'images',
      kw:['gallery','galeri','photo gallery','galeri foto','all photos','semua gambar','browse photos','browse gallery','thelol gallery','8 eras','photo archive','arkib foto','how many photos','berapa gambar','gallery page'],
      fup:['Show Neverland photos','Show The Sus','Show The LoL City','Show TLSRL'],
      r:(bm)=>bm
        ?`<strong>Galeri Foto Rasmi The LoL</strong> 📷<br><br>Arkib visual lengkap dari 2020–2024 merentasi 8 era. Gambar oleh Faiz4224, Dyno, Ikan dan lain-lain.<br><br>Taip <em>"tunjuk [topik]"</em> atau <em>"/show [topik]"</em> untuk preview gambar di sini, atau lawati galeri penuh:<br><a href="https://thelegendoflegiona.github.io/gallery/">Galeri Penuh →</a>`
        :`<strong>The LoL Official Photo Gallery</strong> 📷<br><br>Complete visual archive from 2020–2024 across 8 eras. Captured by Faiz4224, Dyno, Ikan and others.<br><br>Type <em>"show me [topic]"</em> or <em>"/show [topic]"</em> to preview any photos here, or visit the full gallery:<br><a href="https://thelegendoflegiona.github.io/gallery/">Full Gallery →</a>`,
    },

    /* FREAKY NIGGAS */
    { id:'fn_about', cat:'fn',
      kw:['freaky niggas','what is freaky niggas','fn community','freaky niggas site','pasal freaky niggas','apa tu fn','freaky','fn minecraft','freaky niggas community','fn page','fn website','laman fn'],
      fup:['Freaky News','FN Servers','What is FN SMP?','Search Freaky Niggas'],
      r:(bm)=>bm
        ?`<strong>Freaky Niggas (FN)</strong> 🖤<br><br>Komuniti Minecraft dengan estetik dark monochrome glitch. Laman penuh:<br><br>→ <a href="https://faizzzlol.github.io/freakyniggas/">Home</a> — Halaman utama<br>→ <a href="https://faizzzlol.github.io/freakyniggas/servers">Servers</a> — Senarai server Minecraft<br>→ <a href="https://faizzzlol.github.io/freakyniggas/news">Freaky News</a> — Berita EN/BM toggle<br>→ <a href="https://faizzzlol.github.io/freakyniggas/feedback">Feedback</a> — Borang maklum balas<br>→ <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP</a> — Server Minecraft FN crossplay`
        :`<strong>Freaky Niggas (FN)</strong> 🖤<br><br>A Minecraft community with dark monochrome glitch aesthetic. Full pages:<br><br>→ <a href="https://faizzzlol.github.io/freakyniggas/">Home</a> — Main landing page<br>→ <a href="https://faizzzlol.github.io/freakyniggas/servers">Servers</a> — Minecraft server listings<br>→ <a href="https://faizzzlol.github.io/freakyniggas/news">Freaky News</a> — Bilingual news EN/BM toggle<br>→ <a href="https://faizzzlol.github.io/freakyniggas/feedback">Feedback</a> — Feedback form<br>→ <a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP</a> — FN crossplay Minecraft server`,
    },

    /* ── FN SMP ENTRIES ── */

    { id:'fnsmp_about', cat:'fnsmp',
      kw:['fn smp','fnsmp','freaky nsmp','freakynsmp','what is fn smp','apa tu fn smp','fn smp tu apa','about fn smp','pasal fn smp','server fn smp','fn server info','crossplay server fn','semi vanilla server','minecraft server fn','fn smp info','server info fn','fn smp overview','joint server','crossplay smp','paper server fn','10 slots','10 slot server','minekeep server','sg server minecraft','singapore server minecraft','fn x thelol','fn thelol server','fn smp version','v1.3.3'],
      fup:['How to join FN SMP','FN SMP plugins','FN SMP changelog','FN SMP known issues'],
      r:(bm)=>bm
        ?`<strong>FN SMP</strong> ⛏️<br><br>Server Minecraft bersama antara <strong>Freaky Niggas × The Legend of Legiona</strong> — dua komuniti, satu dunia.<br><br><span class="tag new">V1.3.3</span> <span class="tag blue">AKTIF</span><br><br>— <strong>Mod:</strong> Java & Bedrock Crossplay<br>— <strong>Jenis:</strong> Semi-Vanilla Survival<br>— <strong>Engine:</strong> Paper<br>— <strong>Slot:</strong> 10 pemain<br>— <strong>Hosting:</strong> MineKeep (Singapore) — free tier<br>— <strong>Versi:</strong> 1.7.2 – latest (Java) · Bedrock support via Geyser<br>— <strong>Crossplay:</strong> Geyser + Floodgate (Java ↔ Bedrock)<br><br><strong>⚠️ Nota:</strong> Java cracked/TLauncher tidak disokong — guna Bedrock edition sebagai alternatif.<br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP Page →</a>`
        :`<strong>FN SMP</strong> ⛏️<br><br>A joint Minecraft server between <strong>Freaky Niggas × The Legend of Legiona</strong> — two communities, one world.<br><br><span class="tag new">V1.3.3</span> <span class="tag blue">ACTIVE</span><br><br>— <strong>Mode:</strong> Java & Bedrock Crossplay<br>— <strong>Type:</strong> Semi-Vanilla Survival<br>— <strong>Engine:</strong> Paper<br>— <strong>Slots:</strong> 10 players<br>— <strong>Hosting:</strong> MineKeep (Singapore) — free tier<br>— <strong>Version:</strong> 1.7.2 – latest (Java) · Bedrock via Geyser<br>— <strong>Crossplay:</strong> Geyser + Floodgate (Java ↔ Bedrock)<br><br><strong>⚠️ Note:</strong> Cracked Java / TLauncher not supported — use Bedrock edition instead.<br><br><a href="https://faizzzlol.github.io/freakyniggas/minecraft/fnsmp">FN SMP Page →</a>`,
    },

    { id:'fnsmp_join', cat:'fnsmp',
      kw:['how to join fn smp','cara join fn smp','java ip fn smp','bedrock ip fn smp','server address fn','ip fn smp','fn smp ip','connect fn smp','join fn smp','freakynsmp.minekeep.gg','bedrock port fn','19132','join server fn','minecraft server ip fn','copy ip fn','add fn smp','fn smp address','fn smp port','bedrock join','java join fn','cara masuk fn smp','nak join fn smp','masuk fn smp','ip server fn'],
      fup:['FN SMP info','FN SMP plugins','Submit FN SMP report'],
      r:(bm)=>bm
        ?`<strong>Cara Join FN SMP</strong> 🔌<br><br><strong>🟠 Java Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.minekeep.gg</code><br>Port: Default · Versi 1.7.2 – Latest · Premium sahaja<br><br><strong>🟢 Bedrock Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.bedrock.minekeep.gg</code><br>Port: <strong>19132</strong> · Win10/11 · Mobile · Console<br><br><strong>⚡ Launch terus:</strong> <a href="minecraft://?addExternalServer=FN SMP|freakynsmp.bedrock.minekeep.gg:19132">Add to Bedrock automatically →</a><br><br><strong>💬 WhatsApp Group:</strong> <a href="https://chat.whatsapp.com/E0Z4puJdXR8HhRcjoce3h6">Join untuk updates →</a><br><br><em>Cracked Java tak disokong — pakai Bedrock edition (mobile/PC/emulator).</em>`
        :`<strong>How to Join FN SMP</strong> 🔌<br><br><strong>🟠 Java Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.minekeep.gg</code><br>Port: Default · Version 1.7.2 – Latest · Premium only<br><br><strong>🟢 Bedrock Edition</strong><br>IP: <code style="font-family:'DM Mono',monospace;color:#3a9165">freakynsmp.bedrock.minekeep.gg</code><br>Port: <strong>19132</strong> · Win10/11 · Mobile · Console<br><br><strong>⚡ Quick launch:</strong> <a href="minecraft://?addExternalServer=FN SMP|freakynsmp.bedrock.minekeep.gg:19132">Auto-add to Bedrock →</a><br><br><strong>💬 WhatsApp Group:</strong> <a href="https://chat.whatsapp.com/E0Z4puJdXR8HhRcjoce3h6">Join for updates →</a><br><br><em>Cracked Java not supported — use Bedrock edition (mobile/PC/emulator) instead.</em>`,
    },

    { id:'fnsmp_plugins', cat:'fnsmp',
      kw:['fn smp plugins','plugin fn smp','senarai plugin fn','plugin list fn','auraskills fn','chestsort fn','chunky fn','discordsrv fn','essentialsx fn','floodgate fn','geyser fn','gsit fn','imageframe fn','interactivechat fn','jobsreborn fn','luckperms fn','packetevents fn','placeholderapi fn','protocollib fn','realscoreboard fn','skinsrestorer fn','vault fn','viabackwards fn','viaversion fn','20 plugins fn','active plugins fn','what plugins fn smp','plugin apa ada fn','jobs fn smp','rpg fn smp','economy fn smp','skill fn smp','auraskills smp','jobs reborn smp'],
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

  ]; // end KB

  /* ── CHIPS ── */
  const ALL_CHIPS = {
    all:['Who are The LoL founders?','What is The LoL?','Show me The LoL City 📷','Show me TLSRL 📷','/search government','What is FN SMP?'],
    history:['History of The LoL','Show founding photos 📷','UltraX2020 crisis','Show neverland 📷','EhekSquad','Show ender dragon 📷'],
    gov:['Government structure','ISC agency','/search citizenship','All legal documents','The Black House','Naming policy'],
    corp:['All 5 Paiz Corp subsidiaries','Show TLSRL railway 📷','The LoL Movie','show terminal 📷','Paiz Chicken','TL Dollar exchange'],
    fn:['What is Freaky Niggas?','Freaky News page','FN Servers','What is FN SMP?','/search fn smp'],
    fnsmp:['What is FN SMP?','How to join FN SMP','FN SMP plugins','FN SMP changelog','FN SMP known issues','FN SMP roadmap','Submit FN SMP report'],
    images:['Show me The LoL City 📷','Show me TLSRL 📷','Show me the last day 📷','Show me ender dragon 📷','Show me the sus base 📷','Show me neverland 📷','Show golden era photos 📷','Show TLCC Twin Towers 📷','Show bye thelol photo 📷','Show terminal photos 📷'],
    isc_img:['Show ISC TLCC attack files 📷','Show ISC operations 📷','Show ISC legacy records 📷','Show ISC city attacks 📷','ISC clearance code','What is ISC?'],
  };

  /* ── SCORING ENGINE ── */
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

  /** Render an image grid as an HTML string. Safe to call from any page. */
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
    VERSION:       '5.2',
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
