$ (document).ready(function(){


  // cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha
  // scritto l’utente.
  // Vogliamo dopo la risposta dell’API visualizzare a schermo
  // i seguenti valori per ogni film trovato:
  // Titolo
  // Titolo Originale
  // Lingua
  // Voto

  // cliccando il  bottone, cercare sull’API tutti i film che contengono ciò
  // scritto l’utente.

  $ ('#cerca').click(filmsData);



  // Funzioni

  function filmsData(){

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
        // Vogliamo dopo la risposta dell’API visualizzare a schermo
        // i seguenti valori per ogni film trovato:
        // Titolo
        // Titolo Originale
        // Lingua
        // Voto
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var listaFilms = data.results;
        console.log(listaFilms);
        for (var i = 0; i < listaFilms.length; i++) {
          var singoloFilm = listaFilms[i]
          var context = {
            titolo: singoloFilm.title,
            titolo_originale: singoloFilm.original_title,
            lingua: singoloFilm.original_language,
            voto: singoloFilm.vote_average
          };
          var film = template(context);
          $('.film').append(film);
        };



      },
      error: function (richiesta, stato, errori){
        alert('è avvenuto un errore' + errori);
      }
    });
  };




});
