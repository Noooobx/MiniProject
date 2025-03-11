const Search = ({ category, setCategory, selectedItem, setSelectedItem, categories, items, applyFilter }) => {
    return (
      <div className="w-full bg-gray-800 p-5 mt-16 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-white font-semibold mb-2">Select Category</label>
            <select 
              className="p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-white font-semibold mb-2">Select Item</label>
            <select 
              className="p-2 border border-gray-300 rounded-lg" 
              onChange={(e) => setSelectedItem(e.target.value)} 
              value={selectedItem} 
              disabled={!category}
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={applyFilter}
          >
            Filter
          </button>
        </div>
      </div>
    );
  };

  export default Search;
  