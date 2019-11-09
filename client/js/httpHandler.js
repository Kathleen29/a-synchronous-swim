(function() {

  const serverUrl = 'http://127.0.0.1:3000';


  // TODO: build the swim command fetcher here


  const getSwimCommand = () => {
    console.log('Getting Swim Command');
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/swim',
      timeout: 10000,
      success: (data) => {
        // reload the page
       console.log('Success', data);
       SwimTeam.move(data);
       getSwimCommand();
      },
      error: (err) => {
        console.log('Error occurred', err);
        // if we get a timeout or connection closed then getSwimCommand
        if (err.statusText === 'timeout') {
          getSwimCommand();
        }
      }
    });
  };

  getSwimCommand();

  // Get random move commands from server
  // var endlessLoop = setInterval(function() { getRandomSwimCommand(); }, 500);
  // setTimeout(() => { clearInterval(endlessLoop) }, 20000)

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'http://127.0.0.1:3000',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };


// $('body').on('receivedDataFromServer', (data) => {
//   var arrowPress = data.key.match(/Arrow(Up|Down|Left|Right)/);
//   if (arrowPress) {
//     var direction = arrowPress[1];
//     SwimTeam.move(direction.toLowerCase());
//   }
// });



  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
