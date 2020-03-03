
var puppeteer = require('puppeteer');
import Listing from '../models/listing';

//var listing = new Listing("bike", "losangeles", ["oct", "4"]);
// var listing = (0, Listing.Listing)("bike", "losangeles", ["Oct", "4"]);
// var listing = Listing("bike", "dasflj", ["Oct", "5"]);
/*
import Listing from '../models/listing';
import puppeteer from 'puppeteer';
*/
// Globals
const searchWord = "bike";
const SEARCH_DISTANCE = "40";
const LISTINGS_WANTED = "5";
const POSTINGS_PER_PAGE = "120";

//mapping months to number to later relate
const MONTHS = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12,
};

async function scrape(searchWord, dateStolen, zipCode, searchDistance=SEARCH_DISTANCE, listingsWanted=LISTINGS_WANTED) {


    let listings = [];
    await puppeteer.launch( ).then(async browser => {
        const getImageContent = async (page, url) => {
            const { content, base64Encoded } = await page._client.send(
                'Page.getResourceContent',
                { frameId: String(page.mainFrame()._id), url },
            );
            return content;
        };
        const page = await browser.newPage();
        for (let resultNumber = 0; resultNumber < listingsWanted; resultNumber += 120) {
            if (listingsWanted < resultNumber){
                resultNumber = listingsWanted;
            }
            const server = ["list", "cr", "ai", "gs", ".org", "sf", "bay"];
            const url = "https://" + server[5] + server[6] + "." + server[1] + server[2] + server[3] + server[0] + server[4]
                + "/search/sss?s=" + resultNumber + "&postal=" + zipCode +"&query=" + searchWord + "&search_distance="+ searchDistance + "&sort=date";
            console.log(url);
            await page.goto(url);
            // var html = await page.evaluate(() => document.body.innerHTML)
            // console.log(html);
            // var pages = await page.evaluate(() => {
            //   document.querySelector("[class=paginator]").
            // })
            // console.log(pages);
            let newPageOfListings = await page.evaluate(`(async() => {
                let rawListings = Array.from(document.querySelectorAll('[class=result-row]'));
                let newListings = [];
                for(const element of rawListings) {           
                //rawListings.forEach(element => {
                    try {
                        let link = element.querySelector('a');
                        let imageUrl = element.querySelector('img');
                        let date = element.querySelector('time').innerText.split(" ");
                        if (link != null && imageUrl != null) {
                            newListings.push({
                                    postUrl: link.href,
                                    imageUrl: imageUrl.src,
                                    month: date[0],
                                    day: date[1]                                 
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                return newListings
            })()`);
            listings.push(...newPageOfListings);
            for(let listing of listings) {
                const content = await getImageContent(page, listing.imageUrl);
                listing.imageData = Buffer.from(content, 'base64').toString('base64');
            }
        }
        await browser.close();
    });
    return filterByDate(listings, dateStolen.split(" "));
}

function filterByDate(unfilteredListings, dateStolen) {
    let filteredListings = [];
    let dateStolenFormatted = {
        month: dateStolen[0],
        day: dateStolen[1],
    };
    unfilteredListings.forEach(function(item){
            if (MONTHS[item.month] > MONTHS[dateStolenFormatted.month]) {
                filteredListings.push(item);
            } else if (MONTHS[item.month] === MONTHS[dateStolenFormatted.month] && Number(item.day) > Number(dateStolenFormatted.day)) {
                filteredListings.push(item);
            }
    });

    let listingArr = [];

    for (const obj of filteredListings) {
        listingArr.push(new Listing(obj.postUrl, obj.imageUrl, obj.month, obj.day, obj.imageData));
        if (listingArr.length === parseInt(LISTINGS_WANTED, 10)) {
            break;
        }
    }


    return listingArr;
}

module.exports = scrape;
