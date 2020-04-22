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

  $ ('#cerca').click(filmsData, seriesData);
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);



  // Funzioni

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
        // Vogliamo dopo la risposta dell’API visualizzare a schermo
        // i seguenti valori per ogni film trovato:
        // Titolo
        // Titolo Originale
        // Lingua
        // Voto

        var listaFilms = data.results;
        // console.log(listaFilms);
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
          var context = {
            titolo: singoloFilm.title,
            titolo_originale: singoloFilm.original_title,
            lingua: flag,
            voto: stelle()
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


    // Allarghiamo poi la ricerca anche alle serie tv.
    // Con la stessa azione di ricerca dovremo prendere sia
    // i film che corrispondono alla query, sia le serie tv,
    //  stando attenti ad avere alla fine dei valori simili
    //  (le serie e i film hanno campi nel JSON di risposta
    //   diversi, simili ma non sempre identici)
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
          // Vogliamo dopo la risposta dell’API visualizzare a schermo
          // i seguenti valori per ogni film trovato:
          // Titolo
          // Titolo Originale
          // Lingua
          // Voto

          var listaFilms = data.results;
          console.log(listaFilms);
          for (var i = 0; i < listaFilms.length; i++) {
            var singoloFilm = listaFilms[i]
            //Sostituisco al voto in decimali le stelle
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
          //Sostistuisco alla lingua la bandiera
          var flag = ' ';
          var lingua =singoloFilm.original_language;

          if (lingua ==='it') {
            flag += '<img src="img/it.png" alt="it">';
          }else if (lingua==='en') {
            flag += '<img src="img/gb.png" alt="en">';
          }else {
             flag = lingua;
          }


          var context = {
            titolo: singoloFilm.name,
            titolo_originale: singoloFilm.original_name,
            lingua: flag,
            voto: stelle()
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
  // Trasformiamo poi la stringa statica della lingua
  // in una vera e propria bandiera della nazione corrispondente,
  // gestendo il caso in cui
  // non abbiamo la bandiera della nazione ritornata dall’API

  function successo (){
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
      var filmTitolo =singoloFilm.title
      var filmTitoloOriginale=singoloFilm.original_title
      var serieTitolo=singoloFilm.original_name
      var serieTitoloOriginale=singoloFilm.original_name
      var titolo;
      var titolo_originale ;
      if (singoloFilm = filmsData) {
        titolo= singoloFilm.title
        titolo_originale= singoloFilm.original_title;
      } else {
        titolo = singoloFilm.original_name
        titolo_originale = singoloFilm.original_name
      }
      var context = {
        titolo: singoloFilm.title,
        titolo_originale: singoloFilm.original_title,
        lingua: flag,
        voto: stelle()
      };

      var film = template(context);
      $('.film').append(film);
    };

  }
});
