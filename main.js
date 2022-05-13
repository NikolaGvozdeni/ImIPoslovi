let link = "../data/poslovi.xml";
let poslovi;
let kompanije = new Array();


function loadDoc(){

   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          createJobs(xhttp.responseXML);
          brojevi();
          getYear();
          napraviKutije();
       }
   };
   xhttp.open("GET", link, true);
   xhttp.send();

}

function loadPoslovi(){

   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          createJobs(xhttp.responseXML);
          napraviKarte();
          getYear();
       }
   };
   xhttp.open("GET", link, true);
   xhttp.send();

}

function createJobs(xmlDoc){
   poslovi = xmlDoc.getElementsByTagName("job");
   console.log(poslovi);
}

function brojevi(){

   let brojPoslova=0;
   let brojKompanija=0;
   let kompanija;

   let j;

   for(let i=0; i<poslovi.length; i++){
      brojPoslova++;

      kompanija=poslovi[i].getElementsByTagName("company")[0].childNodes[0].nodeValue;
      
      for(j=0; j<kompanije.length; j++){
         if(kompanije[j] == kompanija){
            break;
         }
      }
      if(j === kompanije.length){
         kompanije[j] = kompanija;
         brojKompanija++;
      }
  
   }

   document.getElementById("kompanije").setAttribute("data-target", brojKompanija);
   document.getElementById("poslovi").setAttribute("data-target", brojPoslova);


   ubaciBrojeve();
   
}

function ubaciBrojeve(){

   const brojaci = document.querySelectorAll('.count');
   const speed = 1;

   brojaci.forEach(brojac =>{
      const updateCount = () =>{
         const target = +brojac.getAttribute('data-target');
         const vrednost = +brojac.innerText;

         if(vrednost < target){
            brojac.innerText = vrednost + 1;
            setTimeout(updateCount, 100);
         }else{
            vrednost.innerText = target;
         }

      }
      updateCount();
   });


}

function getYear(){
   let yearText = document.getElementById("cpy-year");

   let date = new Date;
   let year = date.getFullYear();
   yearText.innerHTML = " "+year+" ";
}

function napraviKutije(){

   let kutije = document.getElementById("kutije");

   for(let i=0; i<6; i++){
      let kutija = document.createElement("div");
      kutija.className = "kutija";

      let nazivFirme = poslovi[i].getElementsByTagName("company")[0].childNodes[0].nodeValue;
      let slikaFirme = poslovi[i].getElementsByTagName("logo")[0].childNodes[0].nodeValue;
      let ime = document.createElement("h3");
      let slika = document.createElement("img");
      ime.innerHTML = nazivFirme;
      slika.src = slikaFirme;

      kutija.appendChild(ime);
      kutija.appendChild(slika);
      //dodaj kutiju u kutije
      kutije.appendChild(kutija);
   }

}

function napraviKarte(){
   
   let container = document.getElementById("poslovi");

   for(let i=0; i<poslovi.length; i++){

      let posaoKarta = document.createElement("div");
      posaoKarta.id = "posao"
      posaoKarta.className = "shadow";
      //Otvori Prikaz Posla
      posaoKarta.onclick = function(){

         let prikazPosla = document.getElementById("prikaz-posla");
         prikazPosla.style.display = "block";

         //Zatvori Posao Kartu
         let closeBtn = document.getElementById("close");
         closeBtn.onclick = function(){
            let prikazPosla = document.getElementById("prikaz-posla");
            prikazPosla.style.display = "none";
         };

         let naslovPosla = document.getElementById("naslov-posla");
         let nazivKompanije = document.getElementById("naziv-kompanije");
         let lokacija = document.getElementById("lokacija");
         let slikaKompanije = document.getElementById("slika-kompanije");
         let opisPosla = document.getElementById("opis-posla");

         naslovPosla.innerHTML = poslovi[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
         nazivKompanije.innerHTML = poslovi[i].getElementsByTagName("company")[0].childNodes[0].nodeValue;
         lokacija.innerHTML = poslovi[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
         slikaKompanije.src = poslovi[i].getElementsByTagName("logo")[0].childNodes[0].nodeValue;
         opisPosla.innerText = poslovi[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

      };
      let posaoInfo = document.createElement("div");
      posaoInfo.id = "posao-info";
      let posaoSlikaFirme = document.createElement("div");
      posaoSlikaFirme.id = "posao-slika";

      let nazivFirme = poslovi[i].getElementsByTagName("company")[0].childNodes[0].nodeValue;
      let posaoFirme = poslovi[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
      let slikaFirme = poslovi[i].getElementsByTagName("logo")[0].childNodes[0].nodeValue;
      let lokacijaFirme = poslovi[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;

      let posaoKartaNaslov = document.createElement("h2");
      let posaoKartaFirma = document.createElement("h4");
      let posaoKartaPinSlika = document.createElement("img");
      let posaoKartaLokacija = document.createElement("span");
      let posaoKartaSlika = document.createElement("img");

      posaoKartaNaslov.innerHTML = posaoFirme;
      posaoKartaFirma.innerHTML = nazivFirme;
      posaoKartaPinSlika.src = "./Images/pin.svg";
      posaoKartaLokacija.innerHTML = lokacijaFirme;
      posaoKartaSlika.src = slikaFirme;

      posaoInfo.appendChild(posaoKartaNaslov);
      posaoInfo.appendChild(posaoKartaFirma);
      posaoInfo.appendChild(posaoKartaPinSlika);
      posaoInfo.appendChild(posaoKartaLokacija);

      posaoSlikaFirme.appendChild(posaoKartaSlika);


      posaoKarta.appendChild(posaoInfo);
      posaoKarta.appendChild(posaoSlikaFirme);
      container.appendChild(posaoKarta);
   }


}

function newsLetter(){

   console.log("click");


}