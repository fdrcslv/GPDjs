# GPDjs

script di download automatico

Il limite di geometrie scaricabili è 15000, è quindi necessario suddividere lo scaricamento in pacchetti, utilizzando le Unità Urbanistiche.

Per dati particolarmente densi, potrebbe essere necessario selezionare un diverso criterio di suddivisione.

## Istruzioni
* Popolare la mappa del geoportale con il layer desiderato.
* aprire il menù Layers, e cliccare su "open attribute Table"
* Settare il tipo di file che si vuole scaricare.
* in console js

```
var gpdjs = document.createElement('script');
gpdjs.src = "https://cdn.jsdelivr.net/gh/fdrcslv/GPDjs@1.1/dist/downloader.js";
document.getElementsByTagName('head')[0].appendChild(gpdjs);
```
* premere INVIO per linkare lo script alla pagina, e digitare
``` 
Download();
```
* INVIO, Enjoy

## Avvertenze
* NON chiuedere la finestra del browser
* NON interagire con la pagina


## Versione 1.1
* Download per Unità Urbanistiche
* Progress Bar
* CDN

### Note
la maggior parte dei menu viene richiamata ogni volta tramite ajax, è stato quindi necessario introdurre una serie di delay alle operazioni per potereseguire lo script. Risultato: è lento.
