import scrape from '../services/craigslist';

scrape("bike", "Sep 7", "93611").then(function(listings) {
    console.log(listings)
});
