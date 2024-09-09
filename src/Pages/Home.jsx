import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ProductCard from "../Components/ProductCard";
import CategoryChip from "../Components/CategoryChip";
import { ThemeContext } from "../Context/ThemeContext";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chosenCategory, setChosenCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('default');
    const { theme } = useContext(ThemeContext); // Access theme from context

    useEffect(() => {
        const url = chosenCategory === 'All'
            ? 'https://dummyjson.com/products'
            : `https://dummyjson.com/products/category/${chosenCategory}`;

        axios.get(url)
            .then((res) => {
                let fetchedProducts = res.data.products;
                
                if (sortOrder === 'lowToHigh') {
                    fetchedProducts.sort((a, b) => a.price - b.price);
                } else if (sortOrder === 'highToLow') {
                    fetchedProducts.sort((a, b) => b.price - a.price);
                }

                setProducts(fetchedProducts);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setLoading(false);
            })
    }, [chosenCategory, sortOrder]);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then((res) => {
                setCategory(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching categories:', err);
                setLoading(false);
            })
    }, []);

    return (
        <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {loading ? (
                <h1 className="text-center text-3xl">Loading...</h1>
            ) : (
                <div>
                    {/* Category Chips */}
                    <div className="flex flex-wrap gap-3 my-4">
                        <CategoryChip
                            onClick={() => setChosenCategory('All')}
                            category={{ slug: 'All', name: 'All' }} isChosen={chosenCategory === 'All'} />
                        {category.map((category) => (
                            <CategoryChip
                                onClick={() => setChosenCategory(category.slug)}
                                category={category} isChosen={chosenCategory === category.slug} key={category.slug} />
                        ))}
                    </div>

                    {/* Sorting Buttons */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setSortOrder('lowToHigh')}
                            className={`rounded-full px-4 py-2 ${sortOrder === 'lowToHigh' ? 'bg-blue-200 ' : 'bg-white'} border border-blue-300 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded`}>
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => setSortOrder('highToLow')}
                            className={`rounded-full ml-2 px-4 py-2 ${sortOrder === 'highToLow' ? 'bg-blue-200' : 'bg-white'} border border-blue-300 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded`}>
                            Price: High to Low
                        </button>
                    </div>

                    {/* Products List */}
                    <div className="flex flex-wrap">
                        {products.map((item) => (
                            <ProductCard
                             item={item} key={item.id}  />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
