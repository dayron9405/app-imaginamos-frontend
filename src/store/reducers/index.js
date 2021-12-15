import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import MenuReducer from './sidenav-reducer';
import AddCartReducer from './add-cart-reducer';
import ProductsListReducer from './products-list-reducer';
import NotificationReducer from './notification-reducer';
import StopReducer from './stop-reducer';

export default combineReducers({
    authentication: AuthReducer,
    sidenav: MenuReducer,
    cart: AddCartReducer,
    products: ProductsListReducer,
    notification: NotificationReducer,
    actionStop: StopReducer
})