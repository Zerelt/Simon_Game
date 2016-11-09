$(document).ready(function() {
  var arr = ['r', 'g', 'b', 'y'];
  var combo = []; //the sequence the user has to follow
  var userCombo = []; //the user inputed sequence
  var clickAllowed = true;// used to permit clicking only while power is ON and after the animation finishes
  var mode = false; //for the strict mode of the game
  var power = false;
  /*
  declare sound files as variables here so they are preloaded with the page, instead of using
  new Audio('./sounds/simonSound2.mp3').play() inside the clicking events for example,
  because this causes an inital delay between when the user pushed the button and sound playback,
  because it has to load that sound; Note if you'd have used sounds from the web, you could have made an
  AJAX request to get the sounds on page load, so they'd be pre-loaded and ready for use;*/
  var grSound=new Audio(' ./sounds/simonSound2.mp3');
  var rdSound=new Audio(' ./sounds/simonSound1.mp3');
  var ylSound=new Audio(' ./sounds/simonSound4.mp3');
  var blSound=new Audio(' ./sounds/simonSound3.mp3');

  //Generates random number to select a color and add it to the combo array
  function counting() {
    var x = Math.floor(Math.random() * 4);
    combo.push(x);
    clickAllowed=false;
    for (var i = 0; i <= combo.length - 1; i++) {

      if (arr[combo[i]] === 'g' && power) {
        setTimeout(function changingG () {
          grSound.play();
          $("#green").css("background-color", "#13FF7C");
        }, 500 + (1000 * i));
        setTimeout(function restoreG () {
          $("#green").css("background-color", "#00A74A");
        }, 1000 + (1000 * i));console.log(power);
      }

      if (arr[combo[i]] === 'r' && power) {
        setTimeout(function changingR () {
          rdSound.play();
          $("#red").css("background-color", "#FF4C4C");
        }, 500 + (1000 * i));
        setTimeout(function restoreR () {
          $("#red").css("background-color", "#9F0F17");
        }, 1000 + (1000 * i));console.log(power);
      }

      if (arr[combo[i]] === 'y' && power) {
        setTimeout(function changingY () {
          ylSound.play();
          $("#yellow").css("background-color", "#FED93F");
        }, 500 + (1000 * i));
        setTimeout(function restoreY () {
          $("#yellow").css("background-color", "#CCA707");
        }, 1000 + (1000 * i));console.log(power);
      }

      if (arr[combo[i]] === 'b' && power) {
        setTimeout(function changingB () {
          blSound.play();
          $("#blue").css("background-color", "#1C8CFF");
        }, 500 + (1000 * i));
        setTimeout(function restoreB () {
          $("#blue").css("background-color", "#094A8F");
        }, 1000 + (1000 * i));console.log(power);
      }
      $("#counter").text(combo.length);
      if(i===combo.length-1){
        setTimeout(function(){
          clickAllowed=true;
        },1500+(1000*i));
      }
      // console.log(combo);
    }
  }

  //Repeats the color sequence without adding a new random color; used if the user inputs wrong color
  function rpt () {
    clickAllowed=false;
    for (var i = 0; i <= combo.length - 1; i++) {

      if (arr[combo[i]] === 'g') {
        setTimeout(function() {
          $("#green").css("background-color", "#13FF7C");
          grSound.play();
        }, 500 + (1000 * i));
        setTimeout(function() {
          $("#green").css("background-color", "#00A74A");
        }, 1000 + (1000 * i));
      }

      if (arr[combo[i]] === 'r') {
        setTimeout(function() {
          $("#red").css("background-color", "#FF4C4C");
          rdSound.play();
        }, 500 + (1000 * i));
        setTimeout(function() {
          $("#red").css("background-color", "#9F0F17");
        }, 1000 + (1000 * i));
      }

      if (arr[combo[i]] === 'y') {
        setTimeout(function() {
          $("#yellow").css("background-color", "#FED93F");
          ylSound.play();
        }, 500 + (1000 * i));
        setTimeout(function() {
          $("#yellow").css("background-color", "#CCA707");
        }, 1000 + (1000 * i));
      }

      if (arr[combo[i]] === 'b') {
        setTimeout(function() {
          $("#blue").css("background-color", "#1C8CFF");
          blSound.play();
        }, 500 + (1000 * i));
        setTimeout(function() {
          $("#blue").css("background-color", "#094A8F");
        }, 1000 + (1000 * i));
      }
      $("#counter").text(combo.length);
      if(i===combo.length-1){
        setTimeout(function(){
          clickAllowed=true;
        },1500+(1000*i));
      }
      // console.log(combo);
    }
  }

  //Checks if user is inputing the correct sequence and if the game is over
  function checkColor() {
    for( var j=0;j<userCombo.length;j++ ) {
      if( userCombo[j]===combo[j] && j===combo.length-1 ) {
        if(j===19) {
          setTimeout( function() {
            $('#announcement').css('display','block');
            console.log('you won!');
            $('#switch').css('float', 'left');
            $("#counter").css("color", "#430710");
            $("#counter").text('- -');
            $('#start').css('background-color', 'red');
            $('#start').css("pointer-events", 'auto');
            $('#strict').css('background-color','#FFFF00');
            combo=[];
            userCombo=[];
            mode = false;
          },1500);

          setTimeout( function() {
            $('#announcement').css('display','none');
          },3000);
          return;
        }
        userCombo=[];
        setTimeout(function(){clickAllowed=false;},500);
        setTimeout(counting,1500);
        /*using counting() instead of just counting executes
         the function imediately instead of waiting the
         specified number of seconds*/

      } else if ( userCombo[j]!==combo[j] ) {
        clickAllowed=false;
        console.log('wrong color');
        $('#counter').text('! !');
        setTimeout( function() {
          $('#counter').text(combo.length)
        },1500);
        userCombo=[];
        if(mode===true){combo=[];setTimeout(counting,1500);return;}
        setTimeout(rpt,2500);
      }
    }
  }

  //Color click events
  $('#red').on('click',function() {
    if(userCombo.length<combo.length && power===true && clickAllowed===true){
      setTimeout(function() {
        rdSound.play();
        $("#red").css("background-color", "#FF4C4C");
        }, 500 );
        setTimeout(function() {
          $("#red").css("background-color", "#9F0F17");
        }, 1000 );
      userCombo.push(0);
      // console.log(userCombo);
      checkColor();
    }
  });

  $('#green').on('click',function() {
    if(userCombo.length<combo.length && power===true && clickAllowed===true){
      setTimeout(function() {
        grSound.play();
        $("#green").css("background-color", "#13FF7C");
        }, 500 );
        setTimeout(function() {
          $("#green").css("background-color", "#00A74A");
        }, 1000 );
      userCombo.push(1);
      // console.log(userCombo);
      checkColor();
    }
  });

  $('#blue').on('click',function() {
    if(userCombo.length<combo.length && power===true && clickAllowed===true){
      setTimeout(function() {
        blSound.play();
        $("#blue").css("background-color", "#1C8CFF");
        }, 500 );
        setTimeout(function() {
          $("#blue").css("background-color", "#094A8F");
        }, 1000 );
      userCombo.push(2);
      // console.log(userCombo);
      checkColor();
    }
  });

  $('#yellow').on('click',function() {
    if(userCombo.length<combo.length && power===true && clickAllowed===true){
      setTimeout(function() {
        ylSound.play();
        $("#yellow").css("background-color", "#FED93F");
        }, 500 );
        setTimeout(function() {
          $("#yellow").css("background-color", "#CCA707");
        }, 1000 );
      userCombo.push(3);
      // console.log(userCombo);
      checkColor();
    }
  });


  //Power On/Off the game
  $('#switch').on('click', function() {
    if ($('#switch').css('float') === 'left') {
      $('#switch').css('float', 'right');
      $("#counter").css("color", "#DC0D29");
      setTimeout(function(){power=true;},2600);
    } else {
      power=false;
      /*2.6seconds after user clicked the #start button,
      so 0.1 seconds after the counting() functions
      gets activated by the #start button*/
      mode = false;
      combo=[];
      userCombo=[];

      $('#switch').css('float', 'left');
      $("#counter").css("color", "#430710");
      $("#counter").text('- -');
      $('#start').css('background-color', '#cc0000');
      $('#start').css("pointer-events", 'auto');
      $('#strict').css('background-color','#FFFF00');

    }
  });

  //Initiate game
  $('#start').on('click', function() {

    if ($('#switch').css('float') === 'right') {
      setTimeout(function() {
          $("#counter").css("color", "#430710");
        }, 500);
        setTimeout(function() {
          $("#counter").css("color", "#DC0D29");
        }, 1000);
        setTimeout(function() {
          $("#counter").css("color", "#430710");
        }, 1500);
        setTimeout(function() {
          $("#counter").css("color", "#DC0D29");
        }, 2000);
      $('#start').css('background-color', '#ff4d4d');
            $('#start').css("pointer-events",'none');
      setTimeout(counting,2500);
      // console.log(combo);
    }
    if($('#switch').css('float') === 'right' && combo.length!==0) {
      $('#start').css("pointer-events",'none');
    }
  });

  $('#strict').on('click',function () {
    if ($('#switch').css('float') === 'right') {
      if(mode===false) {
        mode=true;
        $('#strict').css('background-color','gold');
        // console.log('true');
      } else {
        mode=false;
        $('#strict').css('background-color','#FFFF00');
        // console.log('false');
      }
    }
  });

});
