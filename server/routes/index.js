import * as ImageController from '../controllers/imageController';

export default (app) => {
    app.route('/processImages')
        .post(ImageController.processImages);
};