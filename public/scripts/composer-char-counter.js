$(document).ready(function() {
  
  //textarea chacter-counter colours
  $('#tweet-text').on('input', function() {
    const inputValue = $(this).val().length;
    $(".counter").val(140 - inputValue);
    
    if (inputValue > 140) {
      document.getElementById("tweet-counter").className="counter counter-red";
    } else if (inputValue <= 140) {
      document.getElementById("tweet-counter").className="counter";
    }
    
  });
  
  const $tweetButton = $('#tweet-button');
  $tweetButton.on('click', () => {
    console.log("clicked");
  })

});

