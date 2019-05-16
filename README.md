# Toll fee calculator 1.1
A calculator for vehicle toll fees.

## Background
Our city has decided to implement toll fees in order to reduce traffic congestion during rush hours.
This is the current draft of requirements:

* Fees will differ between 8 SEK and 18 SEK, depending on the time of day
* Rush-hour traffic will render the highest fee
* The maximum fee for one day is 60 SEK
* A vehicle should only be charged once an hour
  * In the case of multiple fees in the same hour period, the highest one applies.
* Some vehicle types are fee-free
* Weekends and holidays are fee-free

## Your assignment
The last city-developer quit recently, claiming that this solution is production-ready.
You are now the new developer for our city - congratulations!

Your job is to deliver the code and from now on, you are the responsible go-to-person for this solution. This is a solution you will have to put your name on.

## Instructions
You can make any modifications or suggestions for modifications that you see fit. Fork this repository and deliver your results via a pull-request or send us an e-mail. You could also create a gist, for privacy reasons, and send us the link.

## Initial setup
`cd` into the theme directory
Run `npm install` to install the front end requirements, and then run gulp. `gulp` will output all the CSS & JS files into the `assets/dist` folder.

## Git
Please use staging and master branches accordingly. For all new changes, branch off of `master` and create your own feature branch for example `my-change`. Merge your feature branch into staging to test, and only when it is working, merge into master.

##Car animation
This animation is taken from: file:///C:/Users/Nina/Documents/Arbeten/Web/Evolve/index.html
