$(document).ready(function() {

    var nuts = 0;
    var gameOverTimer = 31;
    var outdoor = new Audio("/audio/outdoor.mp3");
    var missedAudio = null;

    outdoor.play();

    // starting the game
    $('.start').click(function() {
        $('.middleDiv').show();
        $('.start').hide();
        play();
    });

    // function to make the game work
    function play(){
        var endGame = setInterval(function() {
            if (gameOverTimer == 0) {
                clearInterval(game);
                (gameOverTimer)
                clearInterval(endGame);
                outdoor.pause();
                // modal functionality
                $('#dialog').modal('show');
                $('.modal-body').html('You grabbed ' + nuts + ' squirrel nuts. Do you want to play again?')
                $('#yes').click(function(){
                    window.location.reload();
                });
            } 
            // countdown for game
            $('#countDown').html(' ' + gameOverTimer + ' seconds...');
            gameOverTimer--;
        }, 1000);

        var game = setInterval(function() {

            // gets random squirrel to pop up
            randomHole = Math.floor((Math.random() * 8) + 1);
            // random audio when squirrel is clicked
            randomClicked = Math.floor((Math.random() * 4) + 1);
            randomSelected = $('.molehole' + randomHole);

            var id = randomSelected.data('moleid');

            randomSelected.addClass('active' + randomHole);

            animateSquirrel(id, randomSelected);

            // function for missed squirrels
            missed = setTimeout(function() {
                
                if(randomSelected.hasClass('active' + randomHole)){
                    missedAudio = new Audio("/audio/missed" + randomMissed + ".wav").play();
                }

                randomSelected.removeClass('active' + randomHole);
            }, 1990);

            // changes nut image depending on how many squirrels you have clicked
            randomSelected.on('click', function(){
        
                $(this).removeClass('active' + randomHole);
                if (nuts >= 8){
                    $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="/img/bignuts.png">');
                } else if (nuts >= 4) {
                    $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="/img/smallnuts.png">');
                } else {
                    $('#gathered').html('Nuts Grabbed: ' + nuts + '<br><br>' + '<img src="/img/nut.png">');
                }
                new Audio("/audio/clicked" + randomClicked + ".wav").play();
                missedAudio.pause();

            });

        }, 2000);
    }  

    // increments the score
    $('.img').on('click', function() {

        nuts++

    }) ;

    // animation for all squirrel images
    function animateSquirrel(id, squirrel) {
        
        switch (id) {
            case 1:
                squirrel.animate({
                    top: '+=458px',
                    left: '+=359px'
                }, 1000).animate({
                    top: '-=458px',
                    left: '-=359px'
                }, 990);
                break;
            case 2:
                squirrel.animate({
                    top: '+=340px'
                }, 1000).animate({
                    top: '-=340px',
                }, 990);
                break;
            case 3:
                squirrel.animate({
                    top: '+=458px',
                    right: '+=329px'
                }, 1000).animate({
                    top: '-=458px',
                    right: '-=359px'
                }, 990);
                break;
            case 4:
                squirrel.animate({
                    left: '+=458px'
                }, 1000).animate({
                    left: '-=458px',
                }, 990);
                break;
            case 5:
                squirrel.animate({
                    right: '+=428px'
                }, 1000).animate({
                    right: '-=458px',
                }, 990);
                break;
            case 6:
                squirrel.animate({
                    bottom: '+=458px',
                    left: '+=359px'
                }, 1000).animate({
                    bottom: '-=458px',
                    left: '-=359px'
                }, 990);
                break;
            case 7:
                squirrel.animate({
                    bottom: '+=340px'
                }, 1000).animate({
                    bottom: '-=340px',
                }, 990)
                break;
            case 8:
                squirrel.animate({
                    bottom: '+=458px',
                    right: '+=329px'
                }, 1000).animate({
                    bottom: '-=458px',
                    right: '-=359px'
                }, 990);
                break;
        };
    };

});