function urciZakladniCenu() {
  const zvire = document.form1.kind.value;
  const mnozstvi = parseFloat(document.form1.quantity.value);

  let cenaZaKg = 0;

  switch (zvire) {
    case 'dog':
      cenaZaKg = 150;
      break;
    case 'cat':
      cenaZaKg = 120;
      break;
    case 'fish':
      cenaZaKg = 50;
      break;
    case 'tyger':
      cenaZaKg = 800;
      break;
  }

  document.form1.price1.value = cenaZaKg * mnozstvi;

  urciCelkovouCenu();
}

function urciCelkovouCenu() {
  const zakladniCena = parseFloat(document.form1.price1.value);
  let cena = zakladniCena;

  const bioKvalita = document.querySelector('#organic').checked;
  const premiumKvalita = document.querySelector('#premium').checked;
  const proChude = document.querySelector('#poor').checked;
  const darkoveBaleni = document.querySelector('#gift').checked;

  if (bioKvalita) {
    cena += zakladniCena * 0.3;
  }
  if (premiumKvalita) {
    cena += zakladniCena * 0.5;
  }
  if (proChude) {
    cena -= zakladniCena * 0.15;
  }
  if (darkoveBaleni) {
    cena += 500;
  }

  const zvolenaDoprava = document.querySelector(
    'input[name="transport"]:checked'
  );
  if (zvolenaDoprava) {
    if (zvolenaDoprava.id === 'courier') {
      cena *= 1.1;
    } else if (zvolenaDoprava.id === 'post') {
      cena += 250;
    }
  }

  document.form1.price2.value = cena.toFixed(2);
}

const druhKrmiva = document.querySelector('#kind');
const mnozstviKrmiva = document.querySelector('#quantity');

druhKrmiva.addEventListener('change', urciZakladniCenu);
mnozstviKrmiva.addEventListener('input', urciZakladniCenu);

const druhyKvality = document.querySelectorAll('.quality');

druhyKvality.forEach((prvek) => {
  prvek.addEventListener('change', urciCelkovouCenu);
});

const druhyDopravy = document.querySelectorAll('input[name="transport"]');
druhyDopravy.forEach((druh) =>
  druh.addEventListener('change', urciCelkovouCenu)
);

const kontrola = document.querySelector('#check');

kontrola.addEventListener('click', function () {
  const celkovaCena = parseFloat(document.form1.price2.value);
  const castkaKUtrate = parseFloat(document.form1.amount.value);

  const vysledek = document.querySelector('#report');
  vysledek.innerHTML = ''; // správně!

  const odstavec = document.createElement('p');

  if (celkovaCena <= castkaKUtrate) {
    odstavec.textContent = '✅ Tvoje částka k útratě je dostatečná.';
    odstavec.style.color = 'green';
  } else {
    odstavec.textContent = '❌ Tvoje částka k útratě je nedostatečná.';
    odstavec.style.color = 'red';
  }

  vysledek.appendChild(odstavec);
});

document.addEventListener('DOMContentLoaded', () => {
  const potvrzovaciTl = document.getElementById('submit');
  const jmenoInput = document.getElementById('name');
  const vyslednyDiv = document.getElementById('result');

  potvrzovaciTl.addEventListener('click', () => {
    const jmeno = jmenoInput.value.trim();
    vyslednyDiv.innerHTML = ''; // vyčistit předchozí zprávu

    const regex = /^[a-zA-Z0-9]+$/; // povolena pouze písmena a čísla, bez speciálních znaků

    if (jmeno === '') {
      vyslednyDiv.textContent = '❌ Pole jméno nesmí být prázdné.';
      vyslednyDiv.style.color = 'red';
    } else if (!regex.test(jmeno)) {
      vyslednyDiv.textContent = '❌ Ve jméně mohou být pouze písmena a čísla.';
      vyslednyDiv.style.color = 'red';
    } else {
      vyslednyDiv.textContent = `✅ E-mailová adresa ${jmeno}@gmail.com je v pořádku.`;
      vyslednyDiv.style.color = 'green';
    }
  });
});
