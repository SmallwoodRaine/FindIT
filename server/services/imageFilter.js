import ResImage from '../models/resImage';
// labels: [{"locations":[],"properties":[],"mid":"/m/01prls","locale":"","description":"Land vehicle","score":0.9961627125740051,"confidence":0,"topicality":0.9961627125740051,"
// boundingPoly":null}, {}, {}, {}]
//imgData = [labels]
//userLabels = [string]

let filterImages = (imgData, userDescs, numberWantBack) => {
    if (imgData.length < numberWantBack){
        return imgData;
    }
    imgData.forEach((data, index, array) => {
        data.labels.forEach((desc) => {
            userDescs.forEach((label) => {
                if(desc.description == label){
                    array[index].labels.labelCount++;
                }
            });
        });
    });
    imgData.sort((a,b) => (a.labelCount > b.labelCount) ? 1 : -1);

    let resArr = [];
    const arr = imgData.slice(0, numberWantBack);
    arr.forEach(ele => {
        resArr.push(new ResImage(ele.postUrl, ele.imageUrl));
    });
    return resArr;

};
export default filterImages


