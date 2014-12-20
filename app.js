/**
 * Created by cjonagam on 12/20/2014.
 */

var request = require('request');
var $ = require('cheerio');
var async = require('async');

var movies =[];
request('http://www.oldtelugusongs.com/cgi-bin/search2/search.pl?group=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var body = $.load(body);
        //console.log(body('table').html());
        var table = $.load(body('table').html());
        table('tr').each(function(i,tr){
            var movie={};
            movie.songs=[];
            movie.movieName=$(this).find('td').eq(1).text();
            movie.movieId=null;
            var song={};
            song.url=$(this).find('a').attr('href');
            song.title=$(this).find('td').eq(0).text();
            song.singers=[];
            $(this).find('td').eq(2).find('a').each(function(i,singer){
               song.singers.push($(this).text())
            });
            movie.songs.push(song);
            movies.push(movie);
        });
        for(var movie in movies){
            console.log(movies[movie]);
        }
    }
})

/*
request
    .get('http://google.com/img.png')
    .on('response', function(response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type']) // 'image/png'
    })
    .pipe(request.put('http://mysite.com/img.png'))


http://www.oldtelugusongs.com/cgi-bin/search2/search.pl
mcode
scode
lycode
mucode
*/