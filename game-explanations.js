// ═══════════════════════════════════════
// PROMPT EXPLANATIONS
// Maps prompt text (first 40 chars) to explanation
// Applied automatically after data loads
// ═══════════════════════════════════════


var EXPLANATIONS = {
  // ── ROUND 1: ISTVÁN ──
  'Mesélj magadról, István!':
    'Túl általános kérdés – a válasz csak felszínes bemutatkozást ad, semmilyen nyomozáshoz hasznos információt nem tartalmaz.',
  'István, milyen volt a kapcsolatod Nóráva':
    'Konkrét időszakra és változásra kérdez – feltárja a végrendeleti módosítást és István belső információit.',
  'István, szereted a munkádat?':
    'Igen/nem választ eredményező kérdés – nem nyújt érdemi nyomot, csak általános érzelmi reakciót kap.',
  'István, hogyan vélekednek rólad a gyerek':
    'Célzottan a kapcsolatokra és konfliktusokra kérdez – feltárja Katalin ellenségességét és a végrendelet körüli feszültséget.',
  'István, tudsz-e Nóra végrendeletének ré':
    'Direkt rákérdez a végrendeletre – két kulcsfontosságú információt tár fel: István bekapcsolása és valaki törlése.',
  'István, mióta dolgozol itt?':
    'Egyszerű ténykérdés – a válasz semmilyen nyomozási szempontból nem releváns.',
  'István, láttál-e bármilyen furcsa viselk':
    'Megfigyelésekre kérdez rá – István mint tanú részletes képet ad minden gyanúsított reakciójáról, beleértve Tamás feltűnő nyugalmát.',
  'István, te is gyanúsított vagy?':
    'Védekezésre kényszerítő kérdés – csak ártatlanságát hangoztatja, nem ad új információt.',


  // ── ROUND 1: KATALIN ──
  'Katalin, milyen ember vagy?':
    'Túl nyílt kérdés – önjellemzést kap, ami nem segít a nyomozásban.',
  'Katalin, hogyan viszonyultál anyád dönt':
    'Konkrét döntésre kérdez rá – feltárja Katalin erős motívumát és a végrendelet körüli konfliktust.',
  'Katalin, milyen volt a kapcsolatod az an':
    'Időszakra és kapcsolatra fókuszál – feltárja a pénzügyi vitákat és Katalin pénzközpontú gondolkodását.',
  'Katalin, mit gondolsz a testvéreidről?':
    'Túl általános – kitérő választ eredményez, amiből semmit nem lehet megtudni.',
  'Katalin, tudtad-e, hogy édesanyád valakit ki':
    'Két részből álló, célzott kérdés – nevén nevezi a végrendeleti törlést, és kiderül, hogy TAMÁST akarják törölni.',
  'Katalin, te vagy a legidősebb?':
    'Egyértelmű tény, amit már tudunk – semmi újat nem derít ki.',
  'Katalin, volt-e aznap este vitád valamel':
    'Eseményre és időpontra kérdez – megmagyarázza a gombot, a zúzódást, és Viktor távozását. Több nyomot is összeköt.',
  'Katalin, szeretted az édesanyádat?':
    'Érzelmi kérdés, amire mindenki igennel válaszolna – semmilyen megkülönböztető információt nem ad.',


  // ── ROUND 1: ANNA ──
  'Anna, mesélsz magadról?':
    'Nyílt kérdés, amire könnyen kitérő választ ad – érzelmi falat épít, nem oszt meg semmit.',
  'Anna, az öltözéked feltűnően díszes, de':
    'Konkrét megfigyelésre hivatkozik – leleplezhetetlenné teszi a hazugságot, és feltárja Anna pénzügyi helyzetét és motívumát.',
  'Anna, milyen volt a kapcsolatod az anyád':
    'Két irányú kérdés (kapcsolat + örökség) – feltárja Anna szégyenét és az örökség iránti desperációt.',
  'Anna, hogy érzed magad?':
    'Hogylét-kérdés – érzelmi választ kap, amiből nem derül ki semmi konkrét.',
  'Anna, hallottál-e aznap este bármilyen b':
    'Konkrét eseményre kérdez – feltárja a Nóra-István beszélgetést és Anna félreértését, hogy őt akarják törölni.',
  'Anna, van-e bármi, amit el akarsz mondan':
    'Túl nyílt és passzív kérdés – hagyja, hogy Anna kitérjen, ahelyett, hogy konkrét témába terelné.',
  'Anna, bízol valakiben a családban? Van, a':
    'Bizalmi kapcsolatokra kérdez – feltárja Tamás és Anna közeli viszonyát, a vigasztalást, és a gyanúsan mély alvást.',


  // ── ROUND 1: TAMÁS ──
  'Tamás, ki vagy te?':
    'Túl általános bemutatkozó kérdés – semmitmondó, felszínes választ eredményez.',
  'Tamás, milyen pénzügyi kapcsolatod volt ':
    'Specifikus területre (pénz, üzlet) kérdez – feltárja a befektetési csalást és Nóra haragját.',
  'Tamás, az édesanyád csalódott volt benned? Tu':
    'Két részes, konfrontáló kérdés – de Tamás ügyesen Annára tereli a gyanút. Ez önmagában is árulkodó!',
  'Tamás, mit gondolsz, ki a gyilkos?':
    'Véleménykérdés – a gyanúsított csak másra mutogat, nem derül ki tény.',
  'Tamás, más családtagot is bevontál koráb':
    'Mintázatra kérdez rá – feltárja, hogy Tamás többször is kihasználta a családtagjait. Manipulatív személyiség!',
  'Tamás, hogy érzed magad a történtek után?':
    'Hogylét-kérdés – általános sajnálkozást kap, ami nem ad érdemi információt.',
  'Tamás, miért kerülöd Istvánt? Feltűnt, h':
    'Viselkedésbeli megfigyelésre épít – Tamás kerüli Istvánt, mert István tanúja lehet a tettének.',


  // ── ROUND 1: VIKTOR ──
  'Viktor, milyen ember vagy?':
    'Túl nyílt kérdés – Viktor önsajnáló monológot tart, ami nem segít a nyomozásban.',
  'Viktor, miért olyan feszült a viszonyod a':
    'Kapcsolati dinamikára kérdez – feltárja a családi konfliktusokat és Viktor kívülálló státuszát.',
  'Viktor, milyen volt a viszonyod az anyádd':
    'Érzelmi kapcsolatra fókuszál – árnyalt képet ad Nóráról és Viktor csalódottságáról.',
  'Viktor, miért van zúzódás a karodon?':
    'Fizikai nyomra kérdez, de túl direkten – Viktor könnyen kitér a válasz elől.',
  'Viktor, mi történt közted és Katalin köz':
    'Konkrét eseményre kérdez – teljes képet ad a veszekedésről, a gombról és a zúzódásról. Több nyomot is megmagyaráz.',
  'Viktor, ki láthatta a veszekedéseteket Ka':
    'Tanúkra és környezetre kérdez – kiderül, hogy valaki más is hallhatta a beszélgetést (Tamás!).',
  'Viktor, szerinted ki a gyilkos?':
    'Véleménykérdés – Viktor csak panaszkodik, nem ad hasznos információt.',


  // ── ROUND 2: ISTVÁN ──
  'István, pontosan hol voltál este 10:15 é':
    'Percre pontos időbeosztást kér – teljes alibivonalat rajzol fel, ami más alibikkel összevethető.',
  'István, mit csináltál aznap este?':
    'Túl általános – rövid, semmitmondó összefoglalót kap az estéről.',
  'István, láttál-e bárkit a dolgozószoba kö':
    'Helyszínre és időpontra fókuszál – feltárja a legfontosabb tanúvallomást: valaki 11:10-kor a dolgozószobánál járt!',
  'István, milyen parfümillatot éreztél? Fel':
    'Érzékszervi részletre kérdez – összeköti a parfümöt Annával (és aki Annával volt: Tamás).',


  // ── ROUND 2: KATALIN ──
  'Katalin, pontosan mit csináltál este 10:':
    'Pontos időkeretet és bizonyítékot kér – erős alibit tár fel telefonhívás-naplóval.',
  'Katalin, hol voltál aznap este?':
    'Túl általános – csak annyit mond, hogy a szobájában volt, részletek nélkül.',
  'Katalin, a veszekedés után Viktorral ki l':
    'Fizikai bizonyítékot köt össze eseményekkel – megmagyarázza, hogyan került a gomb a dolgozószobába.',
  'Katalin, mikor feküdtél le?':
    'Egyszerű időpont-kérdés – minimális információ, nem vezet sehova.',


  // ── ROUND 2: ANNA ──
  'Anna, rekonstruáld az estédet 10 órától!':
    'Teljes idővonalat kér – Anna részletesen leírja az estét, beleértve a találkozást Tamással és a gyanús elalvást.',
  'Anna, aludtál aznap éjjel?':
    'Igen/nem kérdés – csak annyit tud mondani, hogy mélyen aludt, részletek nélkül.',
  'Anna, Tamás adott neked bármit inni vagy':
    'Kulcskérdés! – feltárja, hogy Tamás vizet hozott, ami után Anna azonnal elaludt. Ez az altatóra utal.',
  'Anna, ki látta, hogy Tamással együtt ment':
    'Tanúkra kérdez – megerősíti, hogy Tamás az utolsó, aki Annánál járt, és senki nem látta Annát utána.',


  // ── ROUND 2: TAMÁS ──
  'Tamás, részletezd az estédet 10 órától pe':
    'Percre pontos idővonalat kér – Tamás alibije összevethető más vallomásokkal, és kiderülnek az időrések.',
  'Tamás, mit csináltál aznap este?':
    'Túl általános – Tamás röviden és gyanútlanul válaszol, nem kényszerül részletekbe.',
  'Tamás, miután elváltál Annától, egyenesen':
    'Útvonalra és tanúkra kérdez – Tamás nem tudja bizonyítani, hogy egyenesen a szobájába ment.',
  'Tamás, miért érezhető Anna parfümjének il':
    'Fizikai bizonyítékot konfrontál – Tamás magyarázata logikus, de gyanús is egyben.',


  // ── ROUND 2: VIKTOR ──
  'Viktor, mikor hagytad el a kastélyt, és m':
    'Pontos időpontokat és tanúkat kér – Viktor gyenge alibije látszik, de megemlíti, hogy Tamást látta éjfélkor.',
  'Viktor, merre jártál aznap este?':
    'Túl rövid és általános – Viktor sértődötten egy mondatban válaszol.',
  'Viktor, miért jöttél vissza olyan későn? ':
    'A gyenge pontot feszegeti – Viktor védekezik, de az alibi továbbra is gyenge marad.',
  'Viktor, milyen állapotban volt Tamás, ami':
    'Tanúvallomásra kérdez – kiderül, hogy Tamás sietett és a kabátját húzgálta éjfélkor. Gyanús viselkedés!',


  // ── ROUND 3: NYOMOZÓ ──
  'Nyomozó, össze tudná hasonlítani Tamás é':
    'Két alibi keresztezését kéri – feltárja az időrést: Tamás a dolgozószoba közelében volt, nem a szobájába menet.',
  'Nyomozó, ki a leggyanúsabb személy?':
    'Túl általános – a nyomozó nem mondhat véleményt, csak összefoglalja a már ismert gyanúokat.',
  'Nyomozó, a komornyik által észlelt parfü':
    'Fizikai bizonyíték logikai elemzése – a parfüm nem csak Annára, hanem Tamásra is utalhat, mert átment rá az illat.',
  'Nyomozó, van-e bizonyíték arra, hogy vala':
    'Konkrét bizonyítékot keres – feltárja az altatót Tamás zsebében és Anna gyanús állapotát.',
  'Nyomozó, kinek volt motívuma?':
    'Túl széles kérdés – mindenkiről mond valamit, de nem szűkíti a kört.',
  'Nyomozó, ki tudta biztosan, hogy Tamást a':
    'Kulcskérdés! Információáramlást vizsgál – bebizonyítja, hogy Tamás TUDTA, hogy őt törlik, és szándékosan tereli Annára a gyanút.',
  'Nyomozó, a gyöngynyaklánc eltűnése hogya':
    'Fizikai bizonyítékot követ nyomon – a nyaklánc Anna zsebében van, de Anna aludt egész éjjel. Valaki odatette!',
  'Nyomozó, ki volt a dolgozószobában a gyil':
    'Túl általános kérdés – a nyomozó csak megismétli, hogy bárki bejuthatott.',
  'Nyomozó, ki akarhatta bekeretezni Annát,':
    'Logikai láncolatot épít – összeköti az altatót, a nyakláncot, a parfümöt, és Tamás közelségét Annához.',
  'Nyomozó, a gomb kié lehetett?':
    'Egyszerű fizikai nyom – a válasz megismétli Katalin magyarázatát, nem ad új információt.',
};


// ─── Apply explanations to all prompt arrays ───
var EXPLANATION_KEYS = Object.keys(EXPLANATIONS);


function applyExplanations(prompts) {
  prompts.forEach(function(p) {
    if (EXPLANATIONS[p.text]) {
      p.explanation = EXPLANATIONS[p.text];
      return;
    }
    for (var i = 0; i < EXPLANATION_KEYS.length; i++) {
      var k = EXPLANATION_KEYS[i];
      if (p.text.indexOf(k) === 0 || k.indexOf(p.text.substring(0, 25)) === 0) {
        p.explanation = EXPLANATIONS[k];
        return;
      }
    }
  });
}


applyExplanations(ROUND1_PROMPTS);
applyExplanations(ROUND2_PROMPTS);
applyExplanations(ROUND3_PROMPTS);