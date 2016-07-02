$(document).ready(function(){

        var $main = $('.main'); 
        
    
        var $feed = $('<div></div>');
        $feed.addClass('all tweets')
        $feed.appendTo($main);
    
        var $refreshLink = $('<button href="#" class="refresh"></button>');
        $refreshLink.text('Check For New Tweets');
        $refreshLink.prependTo($main);
    
        var input = $('<input type="text" placeholder="What is happening?... Press enter or Tweet it"></input>');
        $feed.before(input);
    
        var tweetButton = $('<button class="create new">Tweet it</button>');
        input.after(tweetButton);
        
    // Show alls the tweets
        var showTweets = function(username) {
            
            var source;
            var humanReadableStyle;
            $feed.html('');
            
            // Choose between home and specific user
            if (username === 'home') {
                source = streams.home;
            } else {
                source = streams.users[username];
            }
            
            var index = source.length ;
            while(index > 0){
                index -= 1;
        
                var tweet = source[index];
                var $tweet = $('<div></div>');
                $tweet.addClass('feed');
                
                var $user = $('<a></a>');
                $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
                $user.text('@' + tweet.user);
                
                $tweet.append(tweet.message);
                
                
                var $timeStamp = $('<span></span>')
                $timeStamp.addClass('timeStamp');
                
                //Make time in human readable way
                humanReadableStyle = moment(tweet.created_at).fromNow();
                $timeStamp.text(humanReadableStyle);
                
                $tweet.append($timeStamp);
                $user.appendTo($tweet);
                $tweet.appendTo($feed);
            }
            
            // Click on username to see all its tweets
             $('.username').on('click', function(e) {  
                 e.preventDefault();
                 showTweets($(this).data('user'));
            });
        };
        
        // Load more tweets
        $('.refresh').on('click', function(e){
            e.preventDefault();
            showTweets('home');
        });
        
        // User can write Tweet
        var writeNewTweet = function(userInput) {
            window.visitor = 'guest';
            if (streams.users[window.visitor] === undefined) {
                streams.users[window.visitor] = [];
            }
            writeTweet(userInput);
            showTweets('home');
        };
        var $input = $('input');
    
        //User can either press Enter
        $input.keypress(function(e) {
            var inputValue = $(this).val()
            if (e.which === 13) {
                if (inputValue) {
                    e.preventDefault();
                    writeNewTweet(inputValue);
                    $(this).val('');
                } else {
                    alert("Please enter something");
                }
            }
        });
        
        //Or click button "Tweet it"
        $('.create').on('click', function(e){
            var inputValue = $input.val()
            if (inputValue) {
                e.preventDefault();
                writeNewTweet(inputValue);
                $input.val('');
            } else {
                alert("Please enter something");
            }
        });
        
        showTweets('home');
      });