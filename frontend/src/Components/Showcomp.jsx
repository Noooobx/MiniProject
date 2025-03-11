import React, { useState } from "react";
import Search from "./Search";

const Showcomp = () => {
    const [category, setCategory] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [showProducts, setShowProducts] = useState(false);
  
    const categories = [...new Set(products.map(product => product.category))];
    const items = category ? products.filter(product => product.category === category) : [];
  
    const filteredProducts = products.filter((product) =>
      (!category || product.category === category) &&
      (!selectedItem || product.name === selectedItem)
    );
  
    const applyFilter = () => {
      setShowProducts(true);
    };
  
    return (
      <div className="flex flex-col items-center p-5 space-y-5">
        <Search 
          category={category} setCategory={setCategory} 
          selectedItem={selectedItem} setSelectedItem={setSelectedItem} 
          categories={categories} items={items} 
          applyFilter={applyFilter}
        />
        
        {showProducts && (
          <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Available Products</h3>
            <ul className="space-y-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li key={product.id} className="p-3 bg-gray-100 rounded-lg shadow-sm">{product.name} - ${product.price}</li>
                ))
              ) : (
                <li className="text-gray-500">No products available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default Showcomp;

