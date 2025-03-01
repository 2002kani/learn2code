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

const fetcher = (url:string) => fetch(url).then((response) => response.json());                   

const Produktliste = () => {

    const [suche, setSuche] = useState("");

    const { data, error, isLoading } = useSWR<ProduktResponse>("https://dummyjson.com/products", fetcher);

    // Naive Error Handling
    if(isLoading) return <h1>Lädt..</h1>
    if(error) return <h1>Fehler beim Laden der Seite!</h1>

    const filteredProducts = data?.products.filter((product) => 
        product.title.toLowerCase().includes(suche.toLowerCase()))

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSuche(e.target.value);
        console.log("Suchfeld geändert: ", e.target.value);
    }

    return(
        <div className="produktliste">
            <div className="suchleiste">
                <input 
                className="suchleiste-input"
                type="text" 
                placeholder="Produkte.."
                value={suche}
                onChange={handleSearchChange}/>
            </div>

            <div className="product-list">
                
                {filteredProducts?.map((product) => (
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