# GPDjs

script di download automatico

Il limite di geometrie scaricabili è 15000, è quindi necessario suddividere lo scaricamento in pacchetti, utilizzando le Unità Urbanistiche.

Per dati particolarmente densi, potrebbe essere necessario selezionare un diverso criterio di suddivisione.
## Versione
1.0
* Download per Unità Urbanistiche
* Progress Bar

```
[||||||       ]
-----DIALOG----
```

## Istruzioni
* Popolare la mappa del geoportale con il layer desiderato.
* aprire il menù Layers, e cliccare su "open attribute Table"
* Settare il tipo di file che si vuole scaricare.
* Copiare e incollare tutto lo script nella console Js del browser (testato su Chrome)
* premere INVIO
* Enjoy

## Avvertenze
* NON chiuedere la finestra del browser
* NON interagire con la pagina

## Note
la maggior parte dei menu viene richiamata ogni volta tramite ajax,è stato quindi necessario introdurre una serie di delay alle operazioni per potereseguire lo script. Risultato: è lento.
