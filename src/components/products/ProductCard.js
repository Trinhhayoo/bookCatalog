import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

import { fireStore, storage } from "../../database/firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
const ProductCard = ({ product, fromWishlist }) => {
    console.log(product)
  
  const navigate = useNavigate();

  const { Authors, ISBN, imageUrl,Rating, Name, id, publicationYear } = product;
  const desertRef = ref(storage, `booksImage/${product.id}`);
  const { addNewBook, updateBookData, deleteBook, saveEditBook } =
  useContext(BooksContext);



  const deleteBookFunc = async () => {
    try {
     
        deleteBook(product.id);
      

    
    } catch (e) {
      console.log(e)
    }
  }

  const updateBookFunc = async () => {
    try {
     
        saveEditBook(product);
      navigate("/editBook");

    
    } catch (e) {
      console.log(e)
    }
  }

  

 

  return (
    <div
    //   onClick={(e) => productOverview(id)}
      className="flex flex-col items-center self-start border border-gray-900 rounded-lg hover:border hover:border-gray-700 p-4"
    >
      <div class="relative w-56 h-80 bg-gray-300 overflow-hidden group">
        <img
          className="w-40 h-56 p-4 rounded-t-lg lg:w-56 lg:h-80"
          src={imageUrl}
          alt={Name}
        />
        <div class="absolute inset-x-0 top-full h-40 bg-gray-900  flex   transition-all duration-500 ease-in-out group-hover:top-[80%]">
        {/* <div class="relative z-10 flex  mb-2 h-full">
        {Authors.map((author) => (
            <p className="text-white z-100">{author} </p>
            
          ))}
        </div> */}
        <span><RiDeleteBin6Line onClick = {deleteBookFunc} className="text-white mx-2 mt-5 size-5 " /></span>
        <span><MdModeEdit onClick = {updateBookFunc} className="text-white mx-2 mt-5 size-5" /></span>

        </div>
        
      </div>

      <div className="flex flex-col flex-wrap content-between justify-center mt-5 px-5  align-middle">
        <h5
          title={Authors}
          className=" h-6 text-base font-semibold tracking-tight text-gray-100  lg:text-sm overflow-hidden "
        >
            {publicationYear}
          
        </h5>
        <hr class="border-t-[0.5px] z-100 border-gray-400 w-full my-2" />
        <h5
          title={Name}
          className="w-32 h-12 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2"
        >
          {Name}
        </h5>
        <div className="flex flex-col  ">
          <div className="text-lg lg:text-2xl relative  before:mr-1 font-bold text-gray-100">
           
            <span className=" absolute text-xs right-0 bottom-1.5  font-semibold px-2.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100 ">
              {Rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
