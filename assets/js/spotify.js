$(document).ready(function() {


    var templateSource = $("#results-template").html(),
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = $("#spotify-results"),
    playingCssClass = 'playing',
    audioObject = null;

    var fetchTracks = function(albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function(response) {
                callback(response);
            }
        });
    };

    var searchAlbums = function(query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album',
                limit: 6

            },
            success: function(response) {
                resultsPlaceholder.html(template(response));
            }
        });
    };

    $("#spotify-results").on('click', function(event) {
        var target = event.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function(data) {
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function () {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function () {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }
    });

    $("#artist-search").submit(function(event) {
        event.preventDefault();
        searchAlbums($("#query").val());
    });
});