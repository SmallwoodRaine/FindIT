import filterImages from "../services/imageFilter"
import PostImage from "../models/postImage";
import Label from "../models/label";

let imageFilterTest = () => {
    let postImages = [];
    let labels = [new Label("Land Vehicle", "0.5555")];
    postImages.push(new PostImage("https://images.craigslist.org/00X0X_4eWHPDwaHna_1200x900.jpg",
        "https://losangeles.craigslist.org/wst/bik/d/santa-monica-2013-racing-bike-giant-tcr/6994217546.html",
        labels
        )
    );
    let userDesc = ["Land Vehicle"];
    console.log(filterImages(postImages, userDesc))
};
imageFilterTest();

