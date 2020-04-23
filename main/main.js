$ (document).ready(function(){


  // cliccando il  bottone, cercare sull’API tutti i film  e le serie
  // che contengono ciò che ha  scritto l’utente.

  $ ('#cerca').click(filmsData, seriesData);

  //Inizializzo le var per Handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  // Funzioni---------------------------------------------

  //Funzione di chiamata ajax per i film

  function filmsData(){
    $('.film').html(' ');
    var utente = $('#utente').val();
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: '17251a76623f6c9d8d8b5b585c785048',
        language: 'it-IT',
        query: utente
      },
      success: function (data, stato){
        var listaFilms = data.results;
        //Richiamo la funzione di output
        output(listaFilms, 'film')
      },
      error: function (richiesta, stato, errori){
        alert('è avvenuto un errore' + errori);
      }
    });
  };
  //Funzione di chiamata ajax per le serie
  function seriesData(){
    $('.film').html(' ');
    var utente = $('#utente').val();
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: "GET",
      data: {
        api_key: '17251a76623f6c9d8d8b5b585c785048',
        language: 'it-IT',
        query: utente
      },
      success: function (data, stato){

        var listaFilms = data.results;
        console.log(listaFilms);
        //Richiamo la funzione di output
        output(listaFilms, 'tv');
      },
      error: function (richiesta, stato, errori){
        alert('è avvenuto un errore' + errori);
      }
    });
  };


  function output (listaFilms, tipo){
    for (var i = 0; i < listaFilms.length; i++) {
      var singoloFilm = listaFilms[i]
      // Sostituire al voto in decimali 5 stelle
      var star = singoloFilm.vote_average;
      var media = Math.ceil(star / 2);
      var differenza = 5 - media;
      function stelle(){
        var stars= ' ';
        for (var i = 0; i < media; i++) {
          stars +='<i class="fas fa-star"></i>';
        }
        for (var j = 0; j < differenza; j++) {
          stars +='<i class="far fa-star"></i>';
        }
        return stars
      }
      //Sostituisco alla lingua la bandiera
      var flag = ' ';
      var lingua =singoloFilm.original_language;

      if (lingua ==='it') {
        flag += '<img src="img/it.png" alt="it">';
      }else if (lingua==='en') {
        flag += '<img src="img/gb.png" alt="en">';
      }else {
         flag = lingua;
      }
      //Differenzio i titoli tra serie e film
      var titolo, titolo_originale;
      if (tipo==='film') {
        titolo = singoloFilm.title;
        titolo_originale =singoloFilm.original_title;
      } else if (tipo==='tv') {
        titolo = singoloFilm.name;
        titolo_originale =singoloFilm.original_name;
      }
      //Devo aggiungere l'immagine
      var immagineUrl = singoloFilm.poster_path;
      var immagineCompleta;
      if (immagineUrl) {
         immagineCompleta = '<img src="https://image.tmdb.org/t/p/w342'+ immagineUrl+'"alt="img">';
      }else {
        immagineCompleta= 'Immagine non disponibile';
      }
      var context = {
        immagine: immagineCompleta,
        titolo: titolo,
        titolo_originale: titolo_originale,
        lingua: flag,
        voto: stelle()
      };

      var film = template(context);
      $('.film').append(film);
    };
  }


});
