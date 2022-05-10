// Bastava una sola chiamata Ajax invece che una per gli audio e l'altra per i video e i relativi collegamenti ai file
$(document).ready(function () {
  $.ajax({
    url: "assets/json/media.json",
    data: "data",
    dataType: "json",
    success: function (data) {
      // verifico quali sono i dati che arrivano dalla chiamata
      console.log(data);

      //Ciclo each per per mostrare a schermo le tracce audio e i relativi collegamenti ai file
      $.each(data.audio, function (i, el) {
        var title = el.title;
        var file = el.file;
        $("#musicTitles").append(
          ` <li class="list-group-item">
                <a href="assets/audio/${file}" class="btnAudio text-decoration-none text-black">${title}</a>
            </li>`
        );
      });

      //Ciclo each per per mostrare a schermo le tracce video
      $.each(data.video, function (i, el) {
        var title = el.title;
        var file = el.file;
        $("#videoTitles").append(
          '<li class="list-group-item"><a href="assets/video/' +
            file +
            '" class="btnVideo text-decoration-none text-black">' +
            title +
            "</a></li>"
        );
        $("#btnVideo").attr("href", '"assets/video/' + file + '"');
      });

      //il GET href e SET href vanno all'interno della funzione click del mouse non all'interno del ciclo each !
      $("a.btnAudio").click(function (event) {
        //Al click del mouse sul link della canzone specifico una funzione
        event.preventDefault(); //con preventDefault(), evito che il link ricarichi la pagina
        var source = $(this).attr("href"); //**Specificando this, dico che deve prendere l'attributo dello specifico bottone su cui clicco ! **/
        console.log(source);
        var audioPlayer = document.querySelector("#myaudio");
        $(audioPlayer).attr("src", source);
        playAudio();
      });

      $("a.btnVideo").click(function (event) {
        event.preventDefault();
        var source = $(this).attr("href"); //specifico this per assicurarsi che vada a selezionare il bottone attivo
        console.log(source);
        var videoPlayer = document.querySelector("#myVideo");
        $(videoPlayer).attr("src", source);
        playVideo();
      });
    },
  });
});

// Funzioni che selezionano il contenitore audio/video e lo mettono in play
// Mi serviranno per avviare automaticamente audio/video al click di un titolo
function playAudio() {
  var audioPlayer = document.querySelector("#myaudio");
  audioPlayer.play();
}

function playVideo() {
  var myVideo = document.querySelector("#myVideo");
  myVideo.play();
}
