// ═══════════════════════════════════════
// GAME DATA - Characters, Prompts, Responses
// ═══════════════════════════════════════


const CHARACTERS = {
  istvan: { name: 'István', role: 'Komornyik', emoji: '🎩' },
  katalin: { name: 'Katalin', role: 'Legidősebb lány', emoji: '👩‍💼' },
  anna: { name: 'Anna', role: 'Legfiatalabb lány', emoji: '🎭' },
  tamas: { name: 'Tamás', role: 'Fiatalabb fiú', emoji: '🧥' },
  viktor: { name: 'Viktor', role: 'Középső gyerek', emoji: '😤' },
};


const ROUND_INFO = [
  {
    title: '1. Kör – Ismerkedés',
    description: 'Ismerjétek meg a szereplőket! Kérdezzétek ki őket a hátterükről, a kapcsolataikról és a személyiségükről. Próbáljátok kideríteni, kinek milyen viszonya volt az áldozattal.',
    limit: 20,
    timeLimit: 1200,
    roundLabel: '1. kör',
    descShort: '1. kör: Ismerjétek meg a gyanúsítottakat – hátterük, kapcsolataik, személyiségük.',
  },
  {
    title: '2. Kör – Az Este Eseményei',
    description: 'Rekonstruáljátok az este időrendjét! Kérdezzétek ki a szereplőket, mit csináltak aznap este, hol voltak, kit láttak. Próbáljátok összerakni a kirakóst.',
    limit: 10,
    timeLimit: 600,
    roundLabel: '2. kör',
    descShort: '2. kör: Derítsetek fényt az este eseményeire – ki, mikor, hol volt, mit csinált.',
  },
  {
    title: '3. Kör – Alibik Vizsgálata',
    description: 'Az utolsó kör! A nyomozó segít nektek megvizsgálni az alibik ellentmondásait és összefüggéseit. Használjátok bölcsen az utolsó kérdéseiteket!',
    limit: 5,
    timeLimit: 420,
    roundLabel: '3. kör',
    descShort: '3. kör: A nyomozó segítségével vizsgáljátok meg az alibik ellentmondásait.',
  }
];


// ─────────────────────────────────────
// ROUND 1: GET TO KNOW CHARACTERS
// 40 prompts (8 per character)
// ─────────────────────────────────────
const ROUND1_PROMPTS = [
  // ── ISTVÁN (Butler) ──
  { target: 'istvan', quality: 'weak', text: 'Mesélj magadról, István!',
    response: 'Hát, mit mondjak… István vagyok, a komornyik. Már több mint húsz éve dolgozom itt a kastélyban. Szeretem a munkámat, Nóra asszony mindig jó volt hozzám. Szörnyű, ami történt.' },


  { target: 'istvan', quality: 'strong', text: 'István, milyen volt a kapcsolatod Nórával az elmúlt hónapokban? Változott-e valami a viselkedésében irántad?',
    response: 'Az elmúlt hónapokban Nóra asszony sokat beszélgetett velem négyszemközt. Mondta, hogy értékeli a hűségemet, és… nos, megemlítette, hogy szeretné, ha a végrendeletében is szerepelnék. Én nem kértem ilyesmit, és nem is mondtam el senkinek. De mostanában feszültnek tűnt. Úgy éreztem, valami bántotta a családban.' },


  { target: 'istvan', quality: 'weak', text: 'István, szereted a munkádat?',
    response: 'Igen, szeretem. Rutinom van, ismerem a kastély minden zugát. Nóra asszony mindig tisztelettel bánt velem, nem úgy, mint egyes családtagok… De ne haragudjon, nem akarok pletykálni.' },


  { target: 'istvan', quality: 'strong', text: 'István, hogyan vélekednek rólad a gyerekek? Volt-e bármelyikükkel konfliktusod?',
    response: 'A legtöbben elfogadnak, bár vannak, akik sosem tekintettek egyenlőnek. Katalin például… ő nyíltan mondta, hogy a személyzet ne szóljon bele a család ügyeibe. Egyszer meghallotta, hogy Nóra asszony a végrendeletéről beszél velem, és nagyon feldühödött. Azt mondta: „A családi vagyon a családé." De a többiekkel nincs különösebb bajom.' },


  { target: 'istvan', quality: 'strong', text: 'István, tudsz-e Nóra végrendeletének részleteiről? Megosztott veled bármit erről?',
    response: 'Nóra asszony… igen, bízott bennem. Nem mondott el mindent, de annyit igen, hogy két fontos változtatást tervez. Engem hozzá akart adni – jelképes összeg, a hűségemért. És… valakit törölni akart. Nem mondta ki a nevét nekem, de láttam rajta, hogy nagyon csalódott valamelyik gyermekében. Az arckifejezése… olyan szomorú volt, amikor erről beszélt.' },


  { target: 'istvan', quality: 'weak', text: 'István, mióta dolgozol itt?',
    response: 'Több mint húsz éve. Fiatalon kerültem ide, és azóta is itt vagyok. A kastély az otthonom.' },


  { target: 'istvan', quality: 'strong', text: 'István, láttál-e bármilyen furcsa viselkedést a vacsoránál?',
    response: 'A vacsora… feszült volt. Nóra asszony megemlítette, hogy változtatni akar a végrendeletén. Mindenki elhallgatott. Katalin szúrósan nézett, Viktor szarkasztikusan felnevetett. Anna szinte nem evett, és kerülte az édesanyja tekintetét – mintha szégyellné magát. Tamás? Ő volt a legnyugodtabb az asztalnál. Túlságosan is nyugodt volt, ha engem kérdeznek.' },


  { target: 'istvan', quality: 'weak', text: 'István, te is gyanúsított vagy?',
    response: 'Technikailag igen, a kastélyban voltam. De Nóra asszony halálával én veszítettem a legtöbbet. Ő bízott bennem, és én tiszteltem őt. Semmi okom nem volt ártani neki.' },


  // ── KATALIN (Offspring 1) ──
  { target: 'katalin', quality: 'weak', text: 'Katalin, milyen ember vagy?',
    response: 'Határozott vagyok és tudom, mit akarok. Én vagyok a legidősebb, és mindig is éreztem a felelősséget a család iránt. Édesanyám ezt nem mindig értékelte, de én akkor is a család érdekeit tartottam szem előtt.' },


  { target: 'katalin', quality: 'strong', text: 'Katalin, hogyan viszonyultál édesanyád döntéséhez, hogy a komornyikot is belefoglalja a végrendeletbe?',
    response: 'Őszintén? Felháborított. István egy alkalmazott. Hűséges, rendben – de a családi vagyon a családé! Édesanyámnak megmondtam: „Ha el akarod ismerni a szolgálatait, adj neki végkielégítést, de ne a végrendeleten keresztül." Vitatkoztunk ezen, de nem… nem volt erőszakos. Én nem vagyok ilyen.' },


  { target: 'katalin', quality: 'strong', text: 'Katalin, milyen volt a kapcsolatod az édesanyáddal az utóbbi időben?',
    response: 'Bonyolult. Édesanyám erős akaratú nő volt, és én is az vagyok. Sokat vitatkoztunk a pénzről, az örökségről. Ő úgy érezte, hogy túl sokat foglalkozom az anyagiakkal. Én úgy éreztem, hogy ő naivan bánik a vagyonnal. De szerettem őt. Mindig is szerettem.' },


  { target: 'katalin', quality: 'weak', text: 'Katalin, mit gondolsz a testvéreidről?',
    response: 'Mindannyian különbözőek vagyunk. Vannak köztünk olyanok, akik felelősebben viselkednek, és vannak, akik… nos, mindenki a maga útját járja.' },


  { target: 'katalin', quality: 'strong', text: 'Katalin, tudtad-e, hogy édesanyád valakit ki akar törölni a végrendeletből? Ha igen, kit?',
    response: '…Igen. Édesanyám vacsorán kívül is beszélt erről nekem. Megmondta, hogy Tamást akarja törölni. Nem mondta el pontosan, miért, csak annyit, hogy „elárulta a család bizalmát." Én nem kérdeztem tovább. De… ezt nem mondtam el senkinek aznap este. Legalábbis nem szándékosan.' },


  { target: 'katalin', quality: 'weak', text: 'Katalin, te vagy a legidősebb?',
    response: 'Igen, én vagyok a legidősebb. Mindig is többet vártam magamtól, mint a többiek. Talán túl sokat is.' },


  { target: 'katalin', quality: 'strong', text: 'Katalin, volt-e aznap este vitád valamelyik testvéreddel?',
    response: 'Igen… Viktorral. A dolgozószobában voltunk, és szóba került, hogy édesanyám kit törölne a végrendeletből. Viktor nem értett egyet azzal, hogy Tamást kizárják. A vita elfajult, lökdösődtünk… szégyellem. Viktor elesett és megütötte a karját. Az én kabátomról is leszakadt egy gomb. Utána Viktor kiviharzott a kastélyból, sétálni ment a viharba.' },


  { target: 'katalin', quality: 'weak', text: 'Katalin, szeretted az édesanyádat?',
    response: 'Természetesen szerettem. Ő volt az édesanyám. Nem mindig értettünk egyet, de a szeretet nem kérdés.' },


  // ── ANNA (Gambler / Offspring X) ──
  { target: 'anna', quality: 'weak', text: 'Anna, mesélsz magadról?',
    response: 'Én… én vagyok a legfiatalabb. Nem vagyok olyan erős, mint a többiek. Próbálok megfelelni, de… nehéz. Bocsánat, nem akarok erről beszélni.' },


  { target: 'anna', quality: 'strong', text: 'Anna, az öltözéked feltűnően díszes, de közelről a szövet olcsónak tűnik. Pénzügyi gondokkal küzdesz?',
    response: '…Szóval észrevették. Igen. Mindent elvesztettem. Szerencsejáték… ostoba voltam, tudom. Most nincs semmim. Ezért jöttem a vacsorára is – reméltem, hogy édesanyám talán segít. De nem mertem a szemébe nézni. Azt hittem, ő is megvet engem. Azt hittem, mindenki megvet.' },


  { target: 'anna', quality: 'strong', text: 'Anna, milyen volt a kapcsolatod az édesanyáddal? Beszéltetek-e az örökségről?',
    response: 'Édesanyám… féltem tőle. Nem mert bántott volna, hanem mert szégyelltem magam előtte. A vacsoránál próbáltam szóba hozni az örökséget, de nem bírtam végigmondani. Lehajtottam a fejem, és ő csak nézett rám. Azt hittem, utál. De… nem tudom. Talán tévedtem.' },


  { target: 'anna', quality: 'weak', text: 'Anna, hogy érzed magad?',
    response: 'Szörnyen. Fáradt vagyok, és a fejem fáj. Az éjszaka után alig bírok állni.' },


  { target: 'anna', quality: 'strong', text: 'Anna, hallottál-e aznap este bármilyen beszélgetést az édesanyád és valaki más között?',
    response: 'Igen! Éppen összeszedtem a bátorságomat, hogy beszéljek édesanyámmal, amikor meghallottam, ahogy a dolgozószobában beszél Istvánnal. Édesanyám azt mondta: „Hazudtak nekem. Azt hittem, megbízhatok bennük…" István próbálta csitítani: „Asszonyom, kérem… mindig is gyengék voltak. Ne tegye ezt velük." Aztán édesanyám: „Törölni fogom a végrendeletből. Nem tűröm tovább!" Én… azonnal tudtam, hogy rólam van szó. Elrohantam sírva.' },


  { target: 'anna', quality: 'weak', text: 'Anna, van-e bármi, amit el akarsz mondani?',
    response: 'Nem tudom… olyan zavaros minden. Az éjszaka nagy része homályos. Bocsánat.' },


  { target: 'anna', quality: 'strong', text: 'Anna, bízol valakiben a családban? Van, akihez közel állsz?',
    response: 'Tamás… Tamás mindig kedves volt hozzám. Aznap este, amikor sírva kiszaladtam a kertbe, ő talált rám. Elmondtam neki mindent – a szerencsejátékot, az adósságokat, amit hallottam. Ő vigasztalt. Visszakísért a szobámba. Utána… nem emlékszem semmire. Olyan hirtelen elaludtam, mintha… nem tudom. Furcsán mély alvás volt.' },


  // ── TAMÁS (Killer / Offspring Y) ──
  { target: 'tamas', quality: 'weak', text: 'Tamás, ki vagy te?',
    response: 'Tamás vagyok, a család egyik fiatalabb tagja. Próbálok a magam útján járni. A családi dinamika néha bonyolult, de én igyekszem mindenkit megérteni.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, milyen pénzügyi kapcsolatod volt az édesanyáddal? Volt-e bármilyen üzleti ügy köztetek?',
    response: 'Édesanyámmal? Nos… volt egy üzleti lehetőség, amibe bevontam őt. Egy befektetés. Sajnos nem jött be, és édesanyám pénzt veszített rajta. Ő haragudott, de én megpróbáltam megmagyarázni, hogy a piac kiszámíthatatlan. Ezeket a dolgokat nem mindenki érti.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, az édesanyád csalódott volt benned? Tudod, miért akart változtatni a végrendeleten?',
    response: 'Változtatni a végrendeleten? Igen, hallottam, hogy édesanyám erről beszélt a vacsoránál. De nem gondolom, hogy engem érintett volna. Szerintem Annáról volt szó – mindenki tudja, hogy Anna elvesztette a pénzét. Logikus, hogy édesanyám kételkedett benne, nem? Én mindig is jó kapcsolatban voltam édesanyámmal.' },


  { target: 'tamas', quality: 'weak', text: 'Tamás, mit gondolsz, ki a gyilkos?',
    response: 'Nem akarok ujjal mutogatni, de… gondolkodjatok el, kinek volt a legégetőbb szüksége pénzre. Kinek állt érdekében, hogy édesanyám ne változtasson a végrendeleten? Csak ennyit mondok.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, más családtagot is bevontál korábban édesanyádhoz hasonló „befektetésbe"?',
    response: '…Ez nem releváns. De ha már kérdezitek: igen, egyszer segítettem egy másik családtagnak is egy üzleti döntésben. Az sem sikerült jól. De ez nem jelenti, hogy szándékosan csináltam bármit! Az üzlet kockázatos, ezt mindenki tudja.' },


  { target: 'tamas', quality: 'weak', text: 'Tamás, hogy érzed magad a történtek után?',
    response: 'Természetesen szomorú vagyok. Édesanyám meghalt. Ez egy tragédia a család számára.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, miért kerülöd Istvánt? Feltűnt, hogy nem szívesen vagy a közelében.',
    response: '…Nem kerülöm. Csak nincs mit megbeszélnem egy komornyikkal. Ő a személyzet, én a család tagja vagyok. Ennyi.' },


  // ── VIKTOR (Offspring 4 - Red Herring) ──
  { target: 'viktor', quality: 'weak', text: 'Viktor, milyen ember vagy?',
    response: 'Milyen vagyok? Hát, kérdezd meg a családomat – biztosan elmondják, hogy „a nehéz eset." Mindig én vagyok a fekete bárány, akit senki sem ért meg. Unom már.' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, miért olyan feszült a viszonyod a testvéreiddel?',
    response: 'Mert soha nem fogadtak el olyannak, amilyen vagyok. Katalin szerint „szégyene vagyok a családnak", mert nem lettem ügyvéd vagy bankár. Folyton váltottam karriereket – étterem, művészet, tech startup. Egyik sem jött be. De legalább próbálkoztam! Ők meg csak ítélkeznek.' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, milyen volt a viszonyod az édesanyáddal?',
    response: 'Édesanyám… ő legalább nem vetett meg nyíltan, mint Katalin. De éreztem, hogy csalódott bennem. Soha nem mondta ki, de a szemében láttam. Mégis, ő volt az egyetlen, aki néha felhívott és megkérdezte, hogy vagyok. Most ez is megszűnt.' },


  { target: 'viktor', quality: 'weak', text: 'Viktor, miért van zúzódás a karodon?',
    response: 'Ez… ez semmi. Megütöttem valamit. Nem fontos.' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, mi történt közted és Katalin között aznap este a dolgozószobában?',
    response: 'Szóval tudtok róla. Igen, veszekedtünk. Szóba került, hogy édesanyám ki akarja törölni Tamást a végrendeletből. Én nem értettem egyet – Tamás a testvérem, ez nem igazságos! Katalin meg persze támogatta, sőt, örült is volna. A vita elfajult, lökdöstük egymást. Leestem, megütöttem a karom. Az ő kabátjáról leszakadt egy gomb. Elege lett az egészből, kimentem sétálni a viharba. Le kellett hűlnöm.' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, ki láthatta a veszekedéseteket Katalinnal? Volt-e más is a közelben?',
    response: 'Az ajtó nyitva volt… bárki hallhatta. Nem figyeltem, ki van a közelben. De most, hogy belegondolok… mintha láttam volna egy árnyékot a folyosón, amikor kijöttem a szobából. Nem tudom, ki volt. Talán csak képzeltem.' },


  { target: 'viktor', quality: 'weak', text: 'Viktor, szerinted ki a gyilkos?',
    response: 'Fogalmam sincs. De biztos vagyok benne, hogy engem fognak megvádolni, mint mindig. A „nehéz eset" biztosan bűnös, ugye? Tipikus.' },
];


// ─────────────────────────────────────
// ROUND 2: TIMELINE OF THE NIGHT
// 20 prompts (4 per character)
// ─────────────────────────────────────
const ROUND2_PROMPTS = [
  // ── ISTVÁN ──
  { target: 'istvan', quality: 'strong', text: 'István, pontosan hol voltál este 10:15 és 11:30 között? Részletezd percről percre!',
    response: '10:15-kor teát készítettem a konyhában Nóra asszonynak. 10:25-kor felvittem a dolgozószobába – ő nyugodtan olvasott az íróasztalánál. 10:40-kor elhagytam a szobát és bezártam a folyosó ajtaját, ahogy minden este szoktam. 10:45-től 11:05-ig elmostam az edényeket a konyhában. 11:05-től 11:30-ig kitakarítottam az ebédlőt. A mosogatóban még meleg volt a víz, a lámpák égtek. Ezután nem mentem vissza a dolgozószobába.' },


  { target: 'istvan', quality: 'weak', text: 'István, mit csináltál aznap este?',
    response: 'A szokásos esti teendőimet végeztem – teát készítettem, takarítottam. Semmi különös.' },


  { target: 'istvan', quality: 'strong', text: 'István, láttál-e bárkit a dolgozószoba közelében este 11 óra után?',
    response: 'Igen! Ez fontos. 11:10 körül, amikor az ebédlőből átmentem a konyhába, láttam valakit, aki sietve hagyta el a dolgozószoba irányát. A kabátját igazgatta, a mellkasánál, és hallottam egy apró szakadás-szerű hangot. Éreztem egy erős parfümillatot is. Nem láttam tisztán az arcát – sötét volt a folyosón – de biztos vagyok benne, hogy nem személyzeti tag volt.' },


  { target: 'istvan', quality: 'strong', text: 'István, milyen parfümillatot éreztél? Fel tudnád ismerni?',
    response: 'Erős, édes parfüm volt, de… olcsóbb fajta. Nem a finom, diszkrét illat, amit Katalin vagy Nóra asszony hordana. Inkább olyan, mint amit valaki azért hord, hogy elfedjen valamit. Anna jut eszembe róla – ő szokott ilyen erős parfümöt viselni.' },


  // ── KATALIN ──
  { target: 'katalin', quality: 'strong', text: 'Katalin, pontosan mit csináltál este 10:30 után? Van-e bizonyíték az alibidre?',
    response: '10:30-kor visszamentem a szobámba. Átöltöztem, majd videóhívást indítottam egy üzleti partneremmel. A hívás 10:35-től 11:15-ig tartott – a telefon naplójában benne van. Utána lefeküdtem, 11:20 körül elaludtam. Egy cseléd látta, hogy ég a szobámban a lámpa.' },


  { target: 'katalin', quality: 'weak', text: 'Katalin, hol voltál aznap este?',
    response: 'A szobámban voltam. Pihentem és telefonáltam.' },


  { target: 'katalin', quality: 'strong', text: 'Katalin, a veszekedés után Viktorral ki láthatta a hiányzó gombot a kabátodon?',
    response: 'A dolgozószobában voltunk, az ajtó résnyire nyitva lehetett. Bárki hallhatta, aki arra járt. Viktor elég hangos volt. Utána ő kiviharzott. Én vettem néhány mély levegőt és visszamentem a szobámba. A gomb? Igen, hiányzik a kabátomról. De az a lökdösődésnél szakadhatott le a dolgozószobában, nem a gyilkosság közben.' },


  { target: 'katalin', quality: 'weak', text: 'Katalin, mikor feküdtél le?',
    response: '11:20 körül. Fáradt voltam a vacsorától és a vitától.' },


  // ── ANNA ──
  { target: 'anna', quality: 'strong', text: 'Anna, rekonstruáld az estédet 10 órától! Hol voltál, mit csináltál, kivel találkoztál?',
    response: '10:20-kor visszamentem a szobámba. Összeszedtem a bátorságomat, hogy beszéljek édesanyámmal. 10:30 körül odamentem a dolgozószobához, de hallottam, ahogy édesanyám és István beszélnek a végrendeletről. Meghallottam, hogy édesanyám valakit törölni akar. Azt hittem, engem… Elsírtam magam és kiszaladtam a kertbe. 10:35-10:50 körül Tamás talált rám. Elmondtam neki mindent. Ő vigasztalt. 11 óra körül visszakísért a szobámba. Megbotlottam a folyosón, ő elkapott, de közben a ruhám elszakadt. A szobámban… hirtelen nagyon álmos lettem. Ennyi az, amire emlékszem.' },


  { target: 'anna', quality: 'weak', text: 'Anna, aludtál aznap éjjel?',
    response: 'Igen… nagyon mélyen. Furcsán mélyen. Szinte semmire sem emlékszem, miután a szobámba értem.' },


  { target: 'anna', quality: 'strong', text: 'Anna, Tamás adott neked bármit inni vagy enni, mielőtt elaludtál?',
    response: 'Most, hogy mondod… Igen, hozott egy pohár vizet, amikor a szobámba kísért. Azt mondta, igyak, mert a sírástól kiszáradok. Kedves volt. De utána szinte azonnal elaludtam. Olyan furcsán gyorsan… Nem gondolkodtam rajta eddig, de… miért kérdezed?' },


  { target: 'anna', quality: 'strong', text: 'Anna, ki látta, hogy Tamással együtt mentetek a szobádba?',
    response: 'Nem tudom biztosan… de a folyosón sötét volt, és én nagyon sírtam. Tamás tartott, nehogy megint elessek. Lehet, hogy valaki látott minket, de én nem figyeltem. Tamás pár perc múlva távozott a szobámból – utána… csak az alvás.' },


  // ── TAMÁS ──
  { target: 'tamas', quality: 'strong', text: 'Tamás, részletezd az estédet 10 órától percről percre! Hol voltál, kit láttál?',
    response: '10:20 körül hallottam, ahogy édesanyám valakivel beszél az örökségről. Kimentem a kertbe sétálni, 10:30 körül. Ott talált rám Anna, sírt, szegény. Megvigasztaltam, meghallgattam. 11 óra körül visszakísértem a szobájába. Utána egyenesen a saját szobámba mentem, 11:10 körül. Lefeküdtem.' },


  { target: 'tamas', quality: 'weak', text: 'Tamás, mit csináltál aznap este?',
    response: 'Sétáltam a kertben, aztán segítettem Annának, aki ideges volt. Utána aludni mentem.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, miután elváltál Annától, egyenesen a szobádba mentél? Látott-e téged valaki útközben?',
    response: 'Igen, egyenesen a szobámba mentem. Hogy látott-e valaki? Nem tudom, késő volt, sötét volt. Nem figyeltem.' },


  { target: 'tamas', quality: 'strong', text: 'Tamás, miért érezhető Anna parfümjének illata a ruhádon?',
    response: 'Hát, mert Anna rám borult sírva a kertben! Átölelt, zokogott. Természetes, hogy átment az illata. Mi mást gondolnátok? Anna szegény próbált rám támaszkodni. Szó szerint.' },


  // ── VIKTOR ──
  { target: 'viktor', quality: 'strong', text: 'Viktor, mikor hagytad el a kastélyt, és mikor tértél vissza? Látott-e bárki?',
    response: 'A vita után Katalinnal – talán 10:40 körül – kimentem. Dühös voltam, a viharban sétáltam a birtok körül. Elég későn jöttem vissza, talán éjfél körül. Tudom, ez nem jó alibi. Nem látott senki, mert vihar volt. De amikor visszajöttem, láttam, hogy Tamás épp a szobájába ment. Legalábbis azt hiszem, ő volt. Sötét volt.' },


  { target: 'viktor', quality: 'weak', text: 'Viktor, merre jártál aznap este?',
    response: 'Sétáltam. Kint. Dühös voltam.' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, miért jöttél vissza olyan későn? Mit csináltál éjfélig kint?',
    response: 'Gondolkodtam! Dühös voltam Katalinra, az egész családra. A viharban sétáltam, és próbáltam megnyugodni. Nem volt terv, nem csináltam semmit. Csak sétáltam. Tudom, hogy ez gyanús, de ez az igazság. Nem öltem meg az édesanyámat!' },


  { target: 'viktor', quality: 'strong', text: 'Viktor, milyen állapotban volt Tamás, amikor éjfél körül láttad?',
    response: 'Sötét volt, de… gyorsan lépkedett. Nem nézett körül, nem vett észre engem. Mintha sietett volna. A kabátját húzgálta. Furcsának tűnt, de nem gondoltam bele – én is csak ágyba akartam menni.' },
];


// ─────────────────────────────────────
// ROUND 3: INSPECTOR HELPER
// 10 prompts
// ─────────────────────────────────────
const ROUND3_PROMPTS = [
  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, össze tudná hasonlítani Tamás és Anna alibiját este 11 óra körül? Vannak-e ellentmondások?',
    response: 'Igen, van egy fontos időrés. Tamás azt állítja, hogy 11:10-kor a szobájába ment. Anna szerint Tamás 11 óra körül hagyta el a szobáját. De a komornyik 11:10-kor látott valakit a dolgozószoba felől jönni – erős parfümillattal és kabátigazgatással. Ha Tamás Anna szobájából ment a sajátjába, miért volt a dolgozószoba közelében? Az útvonal nem egyezik.' },


  { target: 'nyomozo', quality: 'weak', text: 'Nyomozó, ki a leggyanúsabb személy?',
    response: 'A nyomozásban nem szabad előítéletekre hagyatkozni. Mindenkinél vannak gyanús elemek – Viktor nem tud alibit igazolni, Anna parfümje a helyszínen érezhető, Katalin gombja a dolgozószobában volt. Vizsgáljátok meg az ellentmondásokat az alibikben.' },


  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, a komornyik által észlelt parfümillat kinek a parfümje lehet? Mond-e ez bármit a tettesről?',
    response: 'A komornyik az illatot Anna parfümjéhez hasonlította – erős, olcsó, édes. Ez két dolgot jelenthet: vagy Anna volt ott, vagy valaki, aki nemrég szoros kontaktusban volt Annával. Mivel Anna azt állítja, hogy Tamás átölelte, és Tamás ruháján is érezhető Anna parfümje, a tettes lehetett Tamás is, akire átment az illat. Ez fontos megkülönböztetés!' },


  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, van-e bizonyíték arra, hogy valaki altató szert használt aznap este?',
    response: 'Anna viselkedése reggel feltűnő: szédült, alig bírt állni, a memóriája hézagos, és „mintha kikapcsolták volna." Nem ivott sokat a vacsoránál, tehát ez nem alkohol hatása. Ha valaki altatót tett a vizébe – amit Tamás hozott neki –, az megmagyarázná az állapotát. Tamás zsebében egyébként egy nyugtatós üvegcsét találtunk.' },


  { target: 'nyomozo', quality: 'weak', text: 'Nyomozó, kinek volt motívuma?',
    response: 'Szinte mindenkinek. Katalin a pénzt akarta a családban tartani. Anna kétségbeesetten pénzre szorult. Viktor kizártnak érezte magát. Tamás pedig… nos, ő azt állítja, nem volt motívuma. De a motívum önmagában nem bizonyíték.' },


  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, ki tudta biztosan, hogy Tamást akarják törölni a végrendeletből, nem Annát?',
    response: 'Ez kulcskérdés! Nóra csak Katalinnak mondta el közvetlenül, hogy Tamást akarja törölni. A vacsoránál elhangzott, hogy „valakit" törölni fog, de a nevet nem mondta ki. Anna feltételezte, hogy ő az – mert meghallotta a beszélgetést, és a saját helyzetéből kiindulva magára vette. Tamás hallhatta Katalin és Viktor vitáját, ahol Tamás neve elhangzott. Tehát Tamás TUDTA, hogy őt törlik – és ennek ellenére Annára tereli a gyanút.' },


  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, a gyöngynyaklánc eltűnése hogyan kapcsolódhat az ügyhöz? Találtak-e nyomot?',
    response: 'A gyöngynyaklánc hiányzik Nóra nyakáról. Egy ilyen értékes ékszer ellopása arra utal, hogy a tettes vagy pénzre szorult, vagy el akarta terelni a nyomozás figyelmét, esetleg be akart keretezni valakit. Érdemes megvizsgálni, hogy felbukkant-e valamelyik gyanúsítottnál az ékszer. Anna kabátzsebében egy gyöngynyakláncot találtunk – de Anna állítja, hogy fogalma sincs, hogyan került oda, mivel egész éjjel aludt.' },


  { target: 'nyomozo', quality: 'weak', text: 'Nyomozó, ki volt a dolgozószobában a gyilkosság idején?',
    response: 'A gyilkosság 10:30 és éjfél között történt. A komornyik 10:25-kor látta Nórát élve. 10:40-kor bezárta a folyosó ajtaját. Ezután bárki bejuthatott, akinek kulcsa volt. Sajnos több gyanúsítottnak is volt hozzáférése.' },


  { target: 'nyomozo', quality: 'strong', text: 'Nyomozó, ki akarhatta bekeretezni Annát, és miért?',
    response: 'Anna az ideális bűnbak. Pénzügyi gondjai vannak – ez motívum. Gyenge fizikailag – nem tudna védekezni a vád ellen. A parfümje erős és felismerhető – könnyen ráfogható. Ha valaki altatót adott neki, biztosította, hogy ne legyen alibije. Ha valaki ráadásul a nyakláncot is az ő kabátjába rejtette… az illető jól ismerte Anna sebezhetőségeit. Ki állt hozzá a legközelebb aznap este? Ki volt az utolsó, aki a szobájában járt? Tamás.' },


  { target: 'nyomozo', quality: 'weak', text: 'Nyomozó, a gomb kié lehetett?',
    response: 'A gomb egy drága, egyedi kabátról származik. Katalin kabátjáról hiányzik egy ilyen gomb, és Katalin elismerte, hogy a Viktorral való lökdösődés közben szakadt le. Ugyanakkor a gomb jelenléte a dolgozószobában nem jelenti feltétlenül, hogy Katalin volt ott a gyilkosság idején – a veszekedés korábban zajlott.' },
];
