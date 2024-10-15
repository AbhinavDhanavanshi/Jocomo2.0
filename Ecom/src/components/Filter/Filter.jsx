import React, { useContext } from 'react';
import myContext from '../../context/Data/MyContext';

function Filter() {
    const context = useContext(myContext);
    const { mode, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, product } = context;
    const categories = [
        "Accessories",
        "Beauty",
        "Books",
        "Cycles",
        "Clothing",
        "Decoration",
        "Electronics",
        "Furniture",
        "Health",
        "Stationery",
        "Sports",
        "Other",
      ];

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFilterPrice(value);
        }
    };

    const ResetFilter = () => {
        setSearchkey('');
        setFilterType('');
        setFilterPrice('');
    };

    return (
        <div className='container mx-auto px-4 mt-5'>
            <div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                <div className="relative">
                    <input
                        type="text"
                        name="searchkey"
                        id="searchkey"
                        value={searchkey}
                        onChange={e => setSearchkey(e.target.value)}
                        placeholder="Search product name"
                        className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm" 
                        style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }} 
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="font-medium">Filters</p>
                    <button onClick={()=>ResetFilter()} className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Reset Filter
                    </button>
                </div>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}>
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={filterPrice}
                            onChange={handlePriceChange}
                            placeholder="Max Price"
                            className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
