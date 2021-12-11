/*
Úkol z lekce 10:
- je POVINNÝ v rozsahu bodů 1 - 3
- body 4 -6 jsou dobrovolné pro šprtky

Odevzdávejte na:
https://goo.gl/forms/Jf87Qe4y401Jum752

---

V souboru kontakty.js je pole osob, které máš zobrazit.
Vzorová šablona pro osobu vypadá takto:

	<div class="kontakt">
		<div class="hleda">hledá práci</div>
		<div class="foto">
			<img src="obrazky/foto01.jpg" alt="Alena Nováková">
			<div class="vek">28</div>
		</div>
		<div class="detaily">
			<h2>Alena Nováková</h2>
			<p class="profese">zubní lékařka</p>
			<p class="telefon">+420 123 456 789</p>
		</div>
	</div>

Jsme na tebe hodní, takže níže v tomto dokumentu máš hotový kód,
který vytvoří prvek podle této šablony a doplní do něj napevno
testovací data.

Tvůj úkol je následující:

1) Zabal připravený kód pro vytvoření jednoho kontaktu do funkce,
abys ho mohla snadno použít odkudkoliv. Napiš funkci tak, aby jí
buď bylo možno jednoduše předat jako parametr, jakou osobu z pole
kontaktů chceš vytvořit. Funkce by měla vytvořený objekt vrátit
jako výstupní parametr. neměla by ho sama připojovat do stránky.


2) Napiš funkci, která zobrazí všechny kontakty v seznamu. Tato funkce
se zavolá hned při otevření stránky, aby se zobrazily všechny kontakty.
Bude se volat také po stisknutí tlačítka "Ukaž vše".

Veškeré výsledky (i dalších kroků) se budou generovat vždy do prvku
<div id="vysledek"> ... </div>

Jak by to mělo vypadat, když se ti vše povede, můžeš vidět na obrázku
ukazka-vysledku.jpg, který je přiložen k tomuto projektu.


3) Napiš funkci, která při stisknutí tlačítka "Hledat" zobrazí jen ty
kontakty, jejichž jméno obsahuje text zadaný do hledacího textového pole.
Nápověda:
- k hledání použij metodu textových řetězců includes (google "mdn string includes")
- nezapomeň, že hledání je citlivé na malá a velká písmena,
takže ideálně musíš nějak zajistit, aby se hledalo bez rozdílu
(google "mdn string toLowerCase" nebo "mdn string toUpperCase")

Při hledání buď procházej pole kontaktů v cyklu a testuj podmínku,
nebo pokud se na to cítíš, zkus použít medotu pole "filter"
(viz. pdf prezentace z hodiny).



BONUS PRO ŠPRTKY:
-----------------
4) Při stisku tlačítek "Od nejmladší" nebo "Od nejstarší" seřad pole
vzestupně nebo sestupně podle věku a zobraz výsledek.
Na řazení použij metodu pole "sort" - viz. PDF prezentace z hodiny.
Musíš si k ní napsat porovnávací funkci - jednu pro porovnání pro
sestupné řazení, druhou pro porovnání dvou objektů pole pro vzestupné
řazení podle věku.


5) Při stisknutí tlačítka "Hledá práci" zobraz jen ty kontakty, které
hledají práci. V objektu osoby je vlastnost hledaPraci, která má buď
hodnotu true nebo false.



BONUS PRO MEGA-ŠPRTKY:
----------------------
6) Dokážeš funkce z předchozích kroků napsat tak, aby fungovaly dohromady?
Tj. aby šlo hledat podle jména, vyhledaný seznam aby šel seřadit a případně
ještě vyfiltrovat podle hledání práce.

*/


// vytvoří element pro jeden kontakt a vrátí ho z funkce ven
// do funkce předáváme index kontaktu v poli
function vytvorKontakt(i, kontakty) {

	let kontaktElement = document.createElement('div');
	kontaktElement.classList.add('kontakt');

	// pokud osoba hledá práci, připojíme i <div class="hleda">, jinak ho vynecháme
	if (kontakty[i].hledaPraci) {
		let hledaElement = document.createElement('div');
		hledaElement.classList.add('hleda');
		hledaElement.textContent = 'hledá práci';
		kontaktElement.appendChild(hledaElement);
	}

	// hlavicka s fotkou a vekem
	let fotoElement = document.createElement('div');
	fotoElement.classList.add('foto');
	let imgElement = document.createElement('img');
	fotoElement.appendChild(imgElement);
	let vekElement = document.createElement('div');
	vekElement.classList.add('vek');
	fotoElement.appendChild(vekElement);
	kontaktElement.appendChild(fotoElement);

	// podrobnosti se jmenem, profesi a telefonem
	let detailyElement = document.createElement('div');
	detailyElement.classList.add('detaily');
	let jmenoElement = document.createElement('h2');
	detailyElement.appendChild(jmenoElement);
	let profeseElement = document.createElement('p');
	profeseElement.classList.add('profese');
	detailyElement.appendChild(profeseElement);
	let telefonElement = document.createElement('p');
	telefonElement.classList.add('telefon');
	detailyElement.appendChild(telefonElement);
	kontaktElement.appendChild(detailyElement);

	// vztvořeným prvkům nastavíme obsah
	imgElement.src = kontakty[i].foto;
	imgElement.alt = kontakty[i].jmeno;
	jmenoElement.textContent = kontakty[i].jmeno;
	vekElement.textContent = kontakty[i].vek;
	profeseElement.textContent = kontakty[i].profese;
	telefonElement.textContent = kontakty[i].telefon;

	// vrátíme element jako výstup z funkce
	return kontaktElement;
}


// vytvoříme si proměnnou pro element #vysledek,


// kam budeme vždy vypisovat seznam kontaktů
const vysledek = document.querySelector('#vysledek');
const hledat = document.querySelector("#hledat")
const jmeno = document.querySelector("#jmeno")

window.addEventListener("load",() => {
	for(let i = 0; i < kontakty.length; i++) {
		vysledek.appendChild(vytvorKontakt(i, kontakty))
	}
}) 

hledat.addEventListener("click", () => {

	vysledek.innerHTML = ""

	console.log(jmeno.value)

	const filtrovaneKontakty = kontakty.filter((kontakt) => {
		return kontakt.jmeno.startsWith(jmeno.value)
	})

	for(let i = 0; i < filtrovaneKontakty.length; i++) {
		vysledek.appendChild(vytvorKontakt(i, filtrovaneKontakty))
	}
	/*document.getElementById("vysledek").style.visibility = "hidden"*/
	  
	console.log(filtrovaneKontakty)

 
})

nahoru.addEventListener("click", () => {
	console.log("funguje")

	vysledek.innerHTML = ""

	for (let i = 0; i <= kontakty.length; i++) {
		kontakty[i] = i + 1;
	}

})

dolu.addEventListener("click", () => {
	console.log("funguje")

	vysledek.innerHTML = ""

	
	
	for (let i = 0; i >= kontakty.length; i++) {
		kontakty[i] = i - 1;
	}
})

filtr1.addEventListener("click", () => {
	vysledek.innerHTML = ""
	const hledaPraci = kontakty.filter(kontakt => kontakt.hledaPraci)
	console.log(hledaPraci)

	for(let i = 0; i < hledaPraci.length; i++) {
		vysledek.appendChild(vytvorKontakt(i, hledaPraci))
	}
	
})

filtr2.addEventListener("click", () => {

vysledek.innerHTML = ""

for(let i = 0; i < kontakty.length; i++) {
	vysledek.appendChild(vytvorKontakt(i, kontakty))
}

})


/*let vysledky = kontakty.filter(function(kontakt) {
	return true
})*/

