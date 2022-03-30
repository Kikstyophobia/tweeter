/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    const inputValue = $('#tweet-text')
    $('#tweet-button').on('click', function() {
      // if (!inputValue) {
      //   console.log("inside the if loop")
      //   return;
      // } else {
        const $tweetList = $('.tweets')
        const $newTweet = $('<article>').text(inputValue.val());
        $tweetList.prepend($newTweet);
      // }
    });

});

