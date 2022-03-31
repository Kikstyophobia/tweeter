/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */
const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

const createTweetElement = (tweet) => {
  const timeAgo = timeago.format(tweet.created_at);
  const avatar = tweet.user.avatars;
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const text = escapeFunc(tweet.content.text);
  
  const $tweet = $(`<article class="full-tweet">
      <header class="tweet-header">
        <div class="icon-name"><img src=${avatar}></img><span>${name}</span>
        </div>
        <span>${handle}</span>
      </header>
      <p class="tweet-body">${text}</p>
      <footer class="tweet-footer">
        <span>${timeAgo}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`)

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
      $('.tweet-error-empty').slideDown();
      $('.tweet-error-chars').slideUp();
    } else if (counter < 0) {
      $('.tweet-error-empty').slideUp();
      $('.tweet-error-chars').slideDown();

    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: tweetData,
        success: function(){
          $('.tweet-error-empty, .tweet-error-chars').slideUp();
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

