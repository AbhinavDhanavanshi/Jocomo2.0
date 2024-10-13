import React from 'react'
import {useContext} from 'react'
import MyContext from '../../context/Data/MyContext'

function AddProduct() {

    const context = useContext(MyContext)
    const {getRequestedProducts, requestedProducts, setRequestedProducts, addRequestedProduct} = context

    return (
        <div>
            <div className=' flex justify-center items-center h-screen m-10'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Request Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            value = {requestedProducts.title}
                            onChange={(e)=>setProducts({...requestedProducts, title: e.target.value})}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="number"
                            value = {requestedProducts.price}
                            onChange={(e)=>setProducts({...requestedProducts, price: e.target.value})}
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="url"
                            value = {requestedProducts.imageUrl}
                            onChange={(e)=>setProducts({...requestedProducts, imageUrl: e.target.value})}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value = {requestedProducts.category}
                            onChange={(e)=>setProducts({...requestedProducts, category: e.target.value})}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>

                    <div>
                        <input type="text"
                            value = {requestedProducts.ownerName}
                            onChange={(e)=>setProducts({...requestedProducts, ownerName: e.target.value})}
                            name='OwnerName'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Owner Name'
                        />
                    </div>

                    <div>
                        <input type="number"
                            value = {requestedProducts.ownerContact}
                            onChange={(e)=>setProducts({...requestedProducts, ownerContact: e.target.value})}
                            name='OwnerContact'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Owner Contact'
                        />
                    </div>

                    <div>
                       <textarea cols="30" rows="10" name='description'
                            value = {requestedProducts.description}
                            onChange={(e)=>setProducts({...requestedProducts, description: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product Description'>
                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default AddProduct