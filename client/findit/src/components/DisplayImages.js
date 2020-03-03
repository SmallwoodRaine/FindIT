import React from 'react';
import Image from "./Image";
class DisplayImages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let images = this.props.images.map((image) => {
            return (<Image src={image.imageUrl} href={image.postUrl}/>);
        });
        console.log(images);

        if (images.length === 0) {
            return (
                <div>
                    Failed to load images
                </div>
            )
        }
        else {
            return (
                <div>
                    {images}
                </div>
            );
        }
    }
}

export default DisplayImages;