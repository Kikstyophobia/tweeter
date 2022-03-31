/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */


const createTweetElement = (tweet) => {
  const timeAgo = timeago.format(tweet.created_at)

  const $tweet = $(`<article class="full-tweet">
      <header class="tweet-header">
        <div class="icon-name"><img src=${tweet.user.avatars}></img><span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <p class="tweet-body">${tweet.content.text}</p>
      <footer class="tweet-footer">
        <span>${timeAgo}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);

  return $tweet;

};

const renderTweets = (tweetObject) => {
  for (let tweetInfo of tweetObject) {
    $(".tweets").prepend(createTweetElement(tweetInfo));
  }
};


$(document).ready(function () {
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(result){
        $('#tweet-text').val("")
        renderTweets(result);
      }, 
      error: function(err){
        console.log("We are in the ERROR function ", err);
      }
    });
  };


  
  $('#tweet-form').submit((event) => {
    event.preventDefault();
    const tweetData = $("#tweet-form").serialize();
    const counter = $('#tweet-counter').val();

    if (counter == 140) {
      alert("Tweet form cannot be empty.");
    } else if (counter < 0) {
      alert("Tweet is over 140 characters.");
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: tweetData,
        success: function(){
            $('.tweets').empty();
            loadTweets();
        },
        error: function(err){
          console.log(err);
        }
      })
    }
  });
 
 
});

