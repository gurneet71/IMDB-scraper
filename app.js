const request = require('request');
const cheerio = require('cheerio');


let title = process.argv[2];
if(process.argv.length>2){
    for(i=3;i<process.argv.length;i++){
        title = title + '+' + `${process.argv[i]}`;
    }
}

else{
    title = process.argv[2];
}

// console.log(title);
request(`https://www.imdb.com/search/title/?title=${title}`,function(error,res,html){
    if(!error && res.statusCode == 200){
        const $ = cheerio.load(html);
        const a = $('h3.lister-item-header');
        const url = a.find('a').attr('href');
        loadTitle('https://www.imdb.com' + url);
        
    }
})

function loadTitle(url){
    request(url,function(error,res,html){
        if(!error && res.statusCode == 200){
            const $ = cheerio.load(html);
            const ratingValue = $('div.ratingValue').find('strong').find('span').text();
            const storyLine = $('div#titleStoryLine').find('div.canwrap span').first().text();
            console.log(ratingValue);
            console.log(storyLine);
        }
    })
}