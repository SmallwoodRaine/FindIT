function Listing(postUrl, imageUrl, month, day, imageData) {
    this.postUrl = postUrl;
    this.imageUrl = imageUrl;
    this.month = month;
    this.day = day;
    this.imageData = imageData;
}

Listing.prototype.fromJSON = function(obj) {
    this.postUrl = obj.postUrl;
    this.imageUrl = obj.imageUrl;
    this.month = obj.month;
    this.day = obj.day;
};

export default Listing;