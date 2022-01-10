import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import MenuReducer from './sidenav-reducer';
import AddCartReducer from './add-cart-reducer';
import ProductsListReducer from './products-list-reducer';
import NotificationReducer from './notification-reducer';
import AlertsReducer from './alerts-reducer';
import StopReducer from './stop-reducer';
import CountCartReducer from './count-cart-reducer';

export default combineReducers({
    authentication: AuthReducer,
    sidenav: MenuReducer,
    cart: AddCartReducer,
    countCart: CountCartReducer,
    products: ProductsListReducer,
    notification: NotificationReducer,
    alerts: AlertsReducer,
    actionStop: StopReducer,
})