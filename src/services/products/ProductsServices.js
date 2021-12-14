import { 
    db,
    getDocs,
    collection
} from '../../firebase/firebase-config';

const ProductService = {
    getProducts(){
        return getDocs(collection(db, "products"));
    }
}
export default ProductService