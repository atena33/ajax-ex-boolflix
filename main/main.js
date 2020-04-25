$ (document).ready(function(){


  // cliccando il  bottone, cercare sull’API tutti i film  e le serie
  // che contengono ciò che ha  scritto l’utente.

  $ ('#cerca').click(
    function (){

    //Salvo l'input dell'utente
    var utente = $('#utente').val();
    //Richiamo la funzione per la chiamata ajax per le serie tv
    chiamataApi ('tv','https://api.themoviedb.org/3/search/tv',utente);
    //Richiamo la funzione per la chiamata ajax per i film
    chiamataApi('film', 'https://api.themoviedb.org/3/search/movie', utente);
  });

  //Funzioni-------------------------------------------------------------------

  //funzione chiamata ajax

  function chiamataApi (tipo, url, richiestaUtente){
    $.ajax({
       url: url,
       method: "GET",
       data: {
         api_key: '17251a76623f6c9d8d8b5b585c785048',
         language: 'it-IT',
         query: richiestaUtente
       },
       success: function (data, stato){

         var listaFilms = data.results;
         //Richiamo la funzione di output
         output(listaFilms, tipo);
        },
        error: function (richiesta, stato, errori){

         alert('è avvenuto un errore' + errori);
       }
     });
   };

 });

  //Funzione di composizione dell'output
  function output (listaFilms, tipo){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < listaFilms.length; i++) {
      var singoloFilm = listaFilms[i]

      //Differenzio i titoli tra serie e film
      var titolo, titolo_originale;
      if (tipo==='film') {
        titolo = singoloFilm.title;
        titolo_originale =singoloFilm.original_title;
      } else if (tipo==='tv') {
        titolo = singoloFilm.name;
        titolo_originale =singoloFilm.original_name;
      }

      var context = {
        immagine: immagine(singoloFilm.poster_path),
        titolo: titolo,
        titolo_originale: titolo_originale,
        lingua: bandiere(singoloFilm.original_language),
        voto: stelle(singoloFilm.vote_average),
        tipo: tipo,
        trama: singoloFilm.overview
      };

      var film = template(context);
      $('.film').append(film);
    };
  }


  // Funzione per sostituire al voto in decimali 5 stelle

  function stelle(star){
    var media = Math.ceil(star / 2);
    var differenza = 5 - media;
    var stars= ' ';
    for (var i = 0; i < media; i++) {
      stars +='<i class="fas fa-star"></i>';
    }
    for (var j = 0; j < differenza; j++) {
      stars +='<i class="far fa-star"></i>';
    }
    return stars
  }

  //Funzione per inserire bandiere al posto della lingua
  function bandiere (lingua){
    var flag = ' ';
     if (lingua ==='it') {
       flag += '<img src="img/it.png" alt="it">';
     }else if (lingua==='en') {
       flag += '<img src="img/gb.png" alt="en">';
     }else {
       flag = lingua;
     }
     return flag;
  }
  // Funzione per inserire le immagini
  function immagine(immagineUrl){
    var immagineCompleta;
    if (immagineUrl) {
       immagineCompleta = '<img src="https://image.tmdb.org/t/p/w342'+ immagineUrl+'"alt="img">';
    }else {
      immagineCompleta= '<img src="img/immagine-non-disponibile.jpg" alt="img" class= "no-img">';
    }
    return immagineCompleta;
  };
