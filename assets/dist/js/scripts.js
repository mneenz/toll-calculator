// Toll fee calculator JS
$(function() {
  var timeFee = 0; //Our fee based on time variable needs to be defined here in order for it to be used outside of the time function
  var dt = new Date(); //Get the current date

  //This calculates the fees based on time of day
  function time() {
    var hour = dt.getHours(); //Get the current hour
    var minute = dt.getMinutes(); //Get current minutes
    var day = dt.getDay();
    t = setTimeout(time,1000); //Set the interval to 6000 so that we check the time every minute

    /*This was taken from 'TollCalculator.java'
    * & checks what time it is based on the hours/minutes above
    * & assignes a timeFee variable based on the time of the day*/
    if (!(day == 6 || day == 7)) //Check if it's a weekend
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

  var o = 0;
  //The text appearing in our info bubble
  function showInfoBubble(){
    $('.car .info-bubble').css('opacity','1'); //Show the bubble

    if ((o > 0) && (checkHour() == false)) { //If the function has runt more than once and there has been less than an hour
      $('.car .info-bubble').html("<p>Hey, don't bug me, it hasn't been an hour yet so I can still ride on this fee.</p>");
    } else {
      if (fee == 0) {
        $('.car .info-bubble').html("<p>I'm riding freeeeee</p>");
      } else if (fee == 60) {
        $('.car .info-bubble').html("<p>Maximum fee reached, I'll drive as much as I want today</p>");
      } else {
        $('.car .info-bubble').html("<p>In Sweden we say 'Cashen dom tas'.<br>I'm paying this much cashish: "+fee+" SEK</p>");
      }
    }
    $('.car .info-bubble').delay(3500)
    .queue(function (next) {
      $(this).css('opacity','0');
      next();
    });
  }

  /*Check if the car has passed the toll fee area*/
  i = 0; //Set variable before function is run
  function tollFeePass($div1, $div2) {
    $div1 = $('.car');
    $div2 = $('.toll-fee');
    var x1 = $div1.offset().left; //Get the left position of the car
    var w1 = $div1.outerWidth(true); //Get the outer width of the car
    var r1 = x1 + w1; //Get the total left position + width of the car
    var x2 = $div2.offset().left; //Get the left position of the toll fee mark
    var w2 = $div2.outerWidth(true); //Get the outer width of the toll fee mark
    var r2 = x2 + w2; //Get the total left postition + width of the toll fee mark

    /*If the total width + position of the is less than the left position of the
    * toll fee mark OR if the left positioning of the car is larger than the total
    * positioning of the toll fee mark*/
    if (r1 < x2 || x1 > r2) {
      i = 0; //Set i to 0 cause we want to run the function again
      return false; //The car isn't passed the toll fee mark
    } else { //The car is currently passing the toll fee mark
       if ((i > 0)) { //If we've already ran this function once within the collision area
         i++; //Add 1 more to see how many times the function has ran
         return false; //Don't count the fee again
       } else { //Otherwise if this function hasn't been run in the collision area before
         i++; //Add 1 so that we know that the function has been run
         return true; //Yaaay we can count the fee and display the info bubble
       }
     }
  }


  //Hour checking
  var originalDateTime = dt.getTime(); //Get the current time

  function checkHour() { //Check if 1 hour has pasts
    var past = new Date(originalDateTime).getTime(); //Get time and compare with original time
    var oneHour = 1000 * 60 * 60;
    if (new Date().getTime() - past < oneHour){ //Check if the current time minus the past time is smaller than one hour
      return false;
    } else { //It's been one hour
      return true;
    }
  }

  //Let's assign the fee
  var fee = 0; //It's always free to start driving!
   //We need this to check how many times the function && tollFeePass check has run has run
  setInterval(function() { //Check if the car has passed the "toll fee mark" based on the cars position
    if (tollFeePass(true)) {
      if (o == 0 || (o > 0 && checkHour(true))) { //If the function has never run before OR there has been an hour since it ran last time, add fee
        if (o > 0 && (checkHour() == true)) {o = -1;} //Set this to -1 since we want to start over and there will be o++ added at the bottom.
        var nextFee = fee + timeFee; // Check what the next fee is going to be
        if (nextFee < 60) { //If the cars position is on the toll fee mark & the fee is less than 60
          fee += timeFee; //Add fee
          showInfoBubble(); //Show the info bubble
        } else if (nextFee > 60) { //If the cars position is on the toll fee mark & the fee is higher than 60
          fee = 60; //60 is the highest fee
          showInfoBubble(); //Show the info bubble
        }
      } else if ((o > 0) && (checkHour() == false)) { //If the function has run before and there hasn't been an hour
        showInfoBubble();

      } o++; //Add 1 to tollFeePass check
    }
  }, 100);
});
