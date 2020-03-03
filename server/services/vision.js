import gVision from '@google-cloud/vision';
import Label from '../models/label';
import PostImage from "../models/postImage";
export const LABEL_DETECTION = 4;


async function createQuery(listings, query, order) {
    for(const listing of listings) {
        query.requests.push(
            {
                "image": {
                    "content": listing.imageData
                },
                "features": [
                    {
                        "type": LABEL_DETECTION, // Label Detection
                        "maxResults": 15
                    }
                ]
            }
        );
        order.push(listing.postUrl);
    }
}

export async function vision(listings) {
    let order = [];
    let query = {"requests": []};

    await createQuery(listings,query,order);

    console.log(query);

    const client = new gVision.v1.ImageAnnotatorClient();
    const [result] = await client.batchAnnotateImages(query)
        .catch(err => {
            console.error(err);
        });
    const imageFeatures = result.responses; // Array of objects which each contain a list of features(only using labelAnnotations)
    let postImageArr = [];

    for (const [index, listing] of listings.entries()) {
        let arr = [];
        const image = imageFeatures[index];
        const labels = image.labelAnnotations;
        labels.forEach(label => {
            arr.push(new Label(label.description,label.score));
        });
        postImageArr.push(new PostImage(listing.imageUrl, listing.postUrl, arr));
    }

    return postImageArr;
    // console.log("Client response " + labels);
    // labels.forEach(label => console.log("Descriptions" + label));
}

export default vision;
