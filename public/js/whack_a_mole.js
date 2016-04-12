$(document).ready(function() {

    var nuts = 0;
    var gameOverTimer = 30;
    var outdoor = new Audio("/audio/outdoor.mp3");

    outdoor.play();

    $('.start').click(function() {
        $('.molehole').show();
        $('.start').hide();
        play();
    });

    function play(){
        setInterval(function() {
            if (gameOverTimer == 0) {
                clearInterval(game);
                outdoor.pause();
                $('#dialog').modal('show');
                $('.modal-body').html('You grabbed ' + nuts + ' nuts. Do you want to play again?')
                $('#yes').click(function(){
                    window.location.reload();
                });
            } 
            gameOverTimer--;
        }, 1000);
        $('#timer').html(gameOverTimer);

        var game = setInterval(function() {

            randomHole = Math.floor((Math.random() * 8) + 1);
            randomClicked = Math.floor((Math.random() * 4) + 1);
            randomSelected = $('.molehole' + randomHole);

            var id = randomSelected.data('moleid');

            randomSelected.addClass('active' + randomHole);

            animateSquirrel(id, randomSelected);

            // Adds a listener to the current molehole
            randomSelected.on('click', function(){

                $(this).removeClass('active' + randomHole);
                $('#gathered').html('Nuts Grabbed: ' + nuts); 
                new Audio("/audio/clicked" + randomClicked + ".wav").play();

            });

            setTimeout(function() {
                randomMissed = Math.floor((Math.random() * 3) + 1);
                if(randomSelected.hasClass('active' + randomHole)){
                    new Audio("/audio/missed" + randomMissed + ".wav").play();
                }

                randomSelected.removeClass('active' + randomHole);
            }, 1990);

        }, 2000);
    }  

    $('.img').on('click', function() {

        nuts++
    }) ;

    $('#timer').html(gameOverTimer)

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


