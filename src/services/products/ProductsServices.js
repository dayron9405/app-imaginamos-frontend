import { 
    db,
    getDocs,
    collection
} from '../../firebase/firebase-config';

const ProductService = {
    getProducts(){
        console.log('getProducts fire base');
        return getDocs(collection(db, "products"));
    }
}
export default ProductService