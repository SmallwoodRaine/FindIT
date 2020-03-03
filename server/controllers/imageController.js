//Import model files here
//They imported mongoose here too
import prePImage from '../models/resImage';
import postPImage from '../models/postImage';
import vision from '../services/vision';
import scrape from '../services/craigslist';
import filterImages from "../services/imageFilter";
import Listing from '../models/listing';

export const processImages = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        let listings = await scrape(req.body.searchWord, req.body.dateStolen, req.body.zipCode);
        console.log("Listings:" + JSON.stringify(listings));
        let postImages = await vision(listings);
        console.log("Post:" + JSON.stringify(postImages));
        let filteredLabels = await filterImages(postImages, Array.from(req.body.descriptions), postImages.length);
        console.log("Filtered:" + JSON.stringify(filteredLabels));
        res.json(filteredLabels);
    }
    catch(e) {
        res.send(e);
    }

    //Given the req body containing {zip, searchword, date, extraWords}
    //Call the craiglists API(date, searchWord, zipcode} returns [Listing Objects]
    //Call Vision API([{postUrl, imageUrl}] returns [Labels]
    //Call service method to parse images([{[labels], imageUrl: string, postUrl: string}], userLabels) returns [{imageUrl, postUrl}]
    //Res send [{imageUrl, postUrl}]
    //console.log(req);
    //console.log(res);
};

