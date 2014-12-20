/**
 * Created by cjonagam on 12/20/2014.
 */

var request = require('request');
var $ = require('cheerio');
var requestjson = require('request-json');
var client = requestjson.newClient('http://i63.in:8090');
var async = require('async');

var movies =[];

request('http://www.oldtelugusongs.com/cgi-bin/search2/search.pl?group=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var body = $.load(body);
        var table = $.load(body('table').html());
        table('tr').each(function(i,tr){
            var movie={};
            movie.songs=[];
            movie.movieName=$(this).find('td').eq(1).text();
            movie.movieId=null;
            movie.coverPage=null;
            var song={};
            song.url=$(this).find('a').attr('href');
            song.title=$(this).find('td').eq(0).text();
            song.writtenBy=$(this).find('td').eq(4).text();
            song.year=$(this).find('td').eq(5).text();
            song.mDirector=$(this).find('td').eq(3).text();
            song.singers=[];
            $(this).find('td').eq(2).find('a').each(function(i,singer){
               song.singers.push($(this).text())
            });
            movie.songs.push(song);
            if(movies[movie.movieName]==undefined) {
                movies[movie.movieName] = movie;
            }
            else {
                movies[movie.movieName].songs.push(song);
            }
        });
        //console.log("--------------------------------",movies,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        for(var k in movies){
            console.log(movies[k]);
            client.post("/movies",movies[k],function(err,data){

            });
        }
        /*
        async.each(movies,function(item, callback){
            console.log(item[Object.keys(item)[0]]);
            //client.post("/movies",item[Object.keys(item)[0]],function(err,data){
               // callback(data);
            //});
        }, function (err) {
            console.log(err);
        });
        */
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