import vision from '../services/vision';
import Listing from '../models/listing';

const listings = [];

const listing1 = new Listing("bike", "https://images.craigslist.org/00L0L_d7O7KSKMeCC_600x450.jpg", [1, 2]);
const listing2 =  new Listing("car", "https://images.craigslist.org/00L0L_d7O7KSKMeCC_600x450.jpg", [1, 2]);
const listing3 =  new Listing("ring", "https://images.craigslist.org/00L0L_d7O7KSKMeCC_600x450.jpg", 1, 2, );

//listings.push(listing1);
//listings.push(listing2);
listings.push(listing3);



vision(listings)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error)
    });