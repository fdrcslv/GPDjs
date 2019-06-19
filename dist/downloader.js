/*
 * script di download automatico
 * Il limite di geometrie scaricabili è 15000, è quindi necessario suddividere lo scaricamento
 * in pacchetti, utilizzando le Unità Urbanistiche.
 * Per dati particolarmente densi, potrebbe essere necessario selezionare un diverso criterio
 * di suddivisione.
------------------------------------------------------
* ISTRUZIONI:
* 1) Popolare la mappa del geoportale con il layer desiderato.
* 2) aprire il menù Layers, e cliccare su "open attribute Table"
* 2bis) effettuare almeno uno scaricamento per impostare il tipo di file.
* 3) Copiare e incollare tutto lo script nella console Js del browser (testato su Chrome)
* 4) premere INVIO
* 5) Enjoy
------------------------------------------------------
* AVVERTENZE:
* 1) NON chiuedere la finestra del browser
* 2) NON interagire con la pagina
------------------------------------------------------
* NOTA:
* la maggior parte dei menu viene richiamata ogni volta tramite ajax,
* è stato quindi necessario introdurre una serie di delay alle operazioni per poter
* eseguire lo script. Risultato: è lento.
*/



function Download(mode, etc){

// importare Jquery
var jqry = document.createElement('script');
jqry.src = "https://code.jquery.com/jquery-3.3.1.min.js";
document.getElementsByTagName('head')[0].appendChild(jqry);

queue = [];
counter = 1;

var q = function(){
  progress_bar('START', counter);
  $('#fg-search').click();
};

//reset query
var w = function(){
  progress_bar('open menu', counter);
  $('.query-filter-container').find('.glyphicon.glyphicon-clear-filter').parent().click();
//click on "Tipo di filtro" and select "Unità urbanistiche"
};

var ww = function(){
  progress_bar('choose criterion', counter);
  $('.logicHeader.filter-field-row.filter-field-fixed-row.row')
    .find('.rw-dropdownlist-picker.rw-select.rw-btn')
    .click();
};

var e = function(){
  progress_bar('', counter);
  $('#rw_1__listbox__option__5').click();
};

  //click on "Unità urbanistiche" and select one
var r = function(){
  progress_bar('', counter);
  $('.filter-field-row.filter-field-fixed-row.row')
    .not('.logicHeader')
    .find('span:contains("Urbanistiche")')
    .parents('.filter-field-row.filter-field-fixed-row.row')
    .find('.rw-select.rw-btn').click();
};

var rr = function(){
  progress_bar('browsing pagination', counter);
  $('.chevron-right.glyphicon.glyphicon-chevron-right').click();
};

var t = function() {
  progress_bar('chose U.U.', counter);
  if (counter>5){
      var index = counter%5;
      if (index == 0){
        index = 5;
      }
      $('.filter-field-row.filter-field-fixed-row.row')
        .not('.logicHeader')
        .find('span:contains("Urbanistiche")')
        .parents('.filter-field-row.filter-field-fixed-row.row')
        .find('ul')
        .children()[index-1].click();
    } else {
      $('.filter-field-row.filter-field-fixed-row.row')
        .not('.logicHeader')
        .find('span:contains("Urbanistiche")')
        .parents('.filter-field-row.filter-field-fixed-row.row')
        .find('ul')
        .children()[counter-1].click();
    }
    counter++;
};

  var y = function(){
    progress_bar('GO', counter);
    $('#query-toolbar-query').click();
  };
  var a = function(){
    progress_bar('prepare for download', counter);
    $('#fg-download-grid').click();
  };
  var s = function(){
    progress_bar('ENJOY', counter);
    $('.modal-footer').find('.download-button.btn.btn-primary').click();
  };
  var d = function(){
    progress_bar('still ' + (72-counter) + ' to go', counter);
    $('#mapstore-export').find('.settings-panel-close.close').click();
  };

function imnotarobot(){
  for (var i=1; i<=71; i++){
    queue.push([q,1000],[w,500],[ww,500],[e,500],[r,500]);
    if(i>5){
      clicks = (Math.ceil(i/5) - 1);
      for(var j=0; j< clicks; j++){
        queue.push([rr, 3000]);
      }
    }
    queue.push([t,1500],[y,1000],[a,1000],[s,2000],[d,2000]);
  }
}
// window.crap = [];
//   for (var q=0; q<queue.length; q++){
//     setTimeout(function(){queue[q](window.crap[q]);}, q*2000);
//   }
function TimerQueue(){
    this.currentTimer = null;
    this.tasks = [];
  }

  TimerQueue.prototype.addTask = function(callback, delay){
    this.tasks.push({ callback: callback, delay: delay });

    // If there's a scheduled task, bail out.
    if(this.currentTimer) return;

    // Otherwise, start kicking tires
    this.launchNextTask();
  };

  TimerQueue.prototype.launchNextTask = function(){

    // If there's a scheduled task, bail out.
    if(this.currentTimer) return;

    var self = this;
    var nextTask = this.tasks.shift();

    // There's no more tasks, clean up.
    if(!nextTask) return this.clear();

    // Otherwise, schedule the next task.
    this.currentTimer = setTimeout(function(){
      nextTask.callback.call();

      self.currentTimer = null;

      // Call this function again to set up the next task.
      self.launchNextTask();
    }, nextTask.delay);
  };

  scheduler = new TimerQueue();
  imnotarobot();
  for (var qq in queue){
    scheduler.addTask(queue[qq][0],queue[qq][1]);
  }
  function progress_bar(message, now){
    console.log(message.length);
    var tot = 71 + 1;
    bar_size = 20;
    var progr = Math.round(now/tot * bar_size);
    var bar = '[' + '|'.repeat(progr) + ' '.repeat(bar_size - progr) + ']';
    title_und1 = Math.floor((bar_size + 2 - message.length)/2);
    title_und2 = Math.ceil((bar_size + 2 - message.length)/2);
    var title_und =( bar_size + 2 - message.length)/2;
    console.clear();
    console.log(bar);
    console.log('-'.repeat(title_und1) + message + '-'.repeat(title_und2));
  }
}
