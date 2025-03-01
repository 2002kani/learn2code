import useSWR from "swr";
import "./Produktliste.css";
import { useState } from "react";

interface Produkt {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

interface ProduktResponse {
    products: Produkt[];
}

const fetcher = (url:string) => fetch(url).then((respone) => respone.json());                   

const Produktliste = () => {

    const [filteredProducts, setFilteredProducts] = useState();

    const { data, error, isLoading } = useSWR<ProduktResponse>("https://dummyjson.com/products", fetcher);

    // Naive Error Handling
    if(isLoading) return <h1>Lädt..</h1>
    if(error) return <h1>Fehler beim Laden der Seite!</h1>
    
    return(
        <div className="produktliste">
            <div className="suchleiste">
                <input type="text" className="suchleiste-input"/>
            </div>

            <div className="product-list">
                {data?.products.map((product) => (
                    <div className="product" key={product.id}>
                        <img src={product.thumbnail} alt="" />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Produktliste