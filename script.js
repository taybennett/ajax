$(document).ready(function () {
    // global varibles
    var topics = ['football', 'Colorado', 'cats', 'cars', 'vegan', 'mountains',
    ];

    // functions

    // create buttons for elements
    var createBtn = function () {
        $('#topicBtn').empty();
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('data-type', topics[i]);
            newBtn.attr('class', 'giphy btn-success');
            newBtn.text(topics[i]);
            $('#topicBtn').append(newBtn);
        }
    }

    var submit = function () {
        //    event on click of button
        $('#submitBtn').on('click', function (event) {
            event.preventDefault();
        
            var userinputVal = $('#userInput').val();
            // push to array
            topics.push(userinputVal);
            createBtn();
            console.log(userinputVal);
            console.log(topics);
        // $('#submitBtn').on('click'), function (event) {
            // $('#userInput').empty();
        

        });
    }

    var displayGiphy = function () {
        var btnVal = $(this).attr('data-type');
        var apiKey = "MxIQpV0t8f7V3EtRhj1wrfwP2G1S3Tse";
        var apiUrl = "http://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=" + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
            

      }).done(function (response) {
        // remove images 
            $('.giphyImg').empty();

            for (var i = 0; i < 10; i++) {
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                stillImgrating = response['data'][i]['rating'];
                
                var newImg = $('<img>');
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('data-type', 'still')
                newImg.attr('src', stillImgUrl);
                newImg.addClass('giphyPic');
                $('.giphyImg').append(newImg);
                $('.giphyImg').append(stillImgrating);
            }
            // test response results //
            console.log('The button value is = ' + btnVal);
            console.log('Still image url = ' + stillImgUrl);
            console.log('Animated image url = ' + animateImgUrl);
            console.log('The rating = ' + stillImgrating);
        });
    }

    var giphyAnimate = function () {
        giphyCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (giphyCondition === 'still') {
            $(this).attr('src', animateUrl);
            $(this).data('type', 'animate');
        } else if (giphyCondition === 'animate') {
            $(this).attr('src', stillUrl);
            $(this).data('type', 'still');

            // test response results
            console.log(true);
        }
    }

    // main
    createBtn();
    submit();
    $(document).on('click', '.giphy', displayGiphy);
    $(document).on('click', '.giphyPic', giphyAnimate);
});