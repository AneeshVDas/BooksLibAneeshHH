const USER_CONTROLLER = require('../controllers/user');
const BOOK_CONTROLLER = require('../controllers/book');
const COMMENT_CONTROLLER = require('../controllers/comment');
const CART_CONTROLLER = require('../controllers/cart');
const ERROR_CONTROLLER = require('../controllers/error');
const AUTH = require('./auth');

module.exports = (APP) => {
    APP.post('/api/user/register', USER_CONTROLLER.register);
    APP.post('/api/user/login', USER_CONTROLLER.login);
    APP.get('/api/user/profile/:username', AUTH.isAuth, USER_CONTROLLER.getProfile);
    APP.get('/api/user/purchaseHistory', AUTH.isAuth, USER_CONTROLLER.getPurchaseHistory);
    APP.post('/api/user/changeAvatar', AUTH.isAuth, USER_CONTROLLER.changeAvatar);
    APP.post('/api/user/blockComments/:userId', AUTH.isInRole('Admin'), USER_CONTROLLER.blockComments);
    APP.post('/api/user/unlockComments/:userId', AUTH.isInRole('Admin'), USER_CONTROLLER.unblockComments);

    APP.get('/api/cart/getSize', AUTH.isAuth, CART_CONTROLLER.getCartSize);
    APP.get('/api/user/cart', AUTH.isAuth, CART_CONTROLLER.getCart);
    APP.post('/api/user/cart/add/:bookId', AUTH.isAuth, CART_CONTROLLER.addToCart);
    APP.delete('/api/user/cart/delete/:bookId', AUTH.isAuth, CART_CONTROLLER.removeFromCart);
    APP.post('/api/user/cart/checkout', AUTH.isAuth, CART_CONTROLLER.checkout);

    APP.get('/api/book/search', BOOK_CONTROLLER.search);
    APP.get('/api/book/details/:bookId', BOOK_CONTROLLER.getSingle);
    APP.post('/api/book/add', AUTH.isInRole('Admin'), BOOK_CONTROLLER.add);
    APP.put('/api/book/edit/:bookId', AUTH.isInRole('Admin'), BOOK_CONTROLLER.edit);
    APP.delete('/api/book/delete/:bookId', AUTH.isInRole('Admin'), BOOK_CONTROLLER.delete);
    APP.post('/api/book/rate/:bookId', AUTH.isAuth, BOOK_CONTROLLER.rate);
    APP.post('/api/book/addToFavorites/:bookId', AUTH.isAuth, BOOK_CONTROLLER.addToFavorites);

    APP.get('/api/comment/getLatestFiveByUser/:userId', AUTH.isAuth, COMMENT_CONTROLLER.getLatestFiveByUser);
    APP.get('/api/comment/:bookId/:skipCount', COMMENT_CONTROLLER.getComments);
    APP.post('/api/comment/add/:bookId', AUTH.isAuth, COMMENT_CONTROLLER.add);
    APP.put('/api/comment/edit/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.edit);
    APP.delete('/api/comment/delete/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.delete);
    APP.all('*', ERROR_CONTROLLER.error);
};