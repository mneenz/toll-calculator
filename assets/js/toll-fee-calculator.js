// Toll fee calculator JS
$(function() {
  var timeFee = 0; //Our fee based on time variable needs to be defined here in order for it to be used outside of the time function

  //This calculates the fees based on time of day
  function time() {
    var dt = new Date(); //Get the current date
    var hour = dt.getHours(); //Get the current hour
    var minute = dt.getMinutes(); //Get current minutes
    t = setTimeout(time,60000); //Set the interval to 6000 so that we check the time every minute

    /*This was taken from 'TollCalculator.java'
    * & checks what time it is based on the hours/minutes above
    * & assignes a timeFee variable based on the time of the day*/
    if (hour == 6 && minute >= 0 && minute <= 29) timeFee = 8;
      else if (hour == 6 && minute >= 30 && minute <= 59) timeFee = 13;
      else if (hour == 7 && minute >= 0 && minute <= 59) timeFee = 18;
      else if (hour == 8 && minute >= 0 && minute <= 29) timeFee = 13;
      else if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59) timeFee = 8;
      else if (hour == 15 && minute >= 0 && minute <= 29) timeFee = 13;
      else if (hour == 15 && minute >= 0 || hour == 16 && minute <= 59) timeFee = 18;
      else if (hour == 17 && minute >= 0 && minute <= 59) timeFee = 13;
      else if (hour == 18 && minute >= 0 && minute <= 29) timeFee = 8;
      else timeFee = 0;
  }

  time(); //Run time function

  //The text appearing in our info bubble
  function showInfoBubble(){
    $('.info-bubble').css('opacity','1'); //Show the bubble
    if (fee == 0){
      $('.info-bubble').html("<p>You're riding free my friend</p>");
    } else if (fee == 60) {
      $('.info-bubble').html('<p>Maximum fee reached, drive as much as you want today</p>');
    } else {
      $('.info-bubble').html("<p>In Sweden we say 'Cashen dom tas'.<br>Your'e paying this much cashish: "+fee+"</p>");
    }
    $('.info-bubble').delay(4000)
    .queue(function (next) {
      $(this).css('opacity','0');
      next();
    });
  }



  function collision($div1, $div2) {
    $div1 = $('.car');
    $div2 = $('.toll-fee');
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
   }

  //Let's assign the fee
  var fee = 0; //It's always free to start driving!
  setInterval(function() { //Check if the car has passed the "toll fee mark" based on the cars position
    if (collision(true)) {
      var nextFee = fee + timeFee; // Check what the next fee is going to be
      if (nextFee < 60) { //If the cars position is on the toll fee mark & the fee is less than 60
        fee += timeFee; //Add fee
        showInfoBubble(); //Show the info bubble
      } else if (nextFee > 60) { //If the cars position is on the toll fee mark & the fee is higher than 60
        fee = 60; //60 is the highest fee
        showInfoBubble(); //Show the info bubble
      }
    }
  }, 100);
});
