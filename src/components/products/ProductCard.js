import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../../contexts/BooksProvider";


const ProductCard = ({ product, fromWishlist }) => {
    console.log(product)
  
  const navigate = useNavigate();

  const { Authors, ISBN, imageUrl,Rating, Name, id, publicationYear } = product;

  

 

  return (
    <div
    //   onClick={(e) => productOverview(id)}
      className="flex flex-col items-center self-start border border-gray-900 rounded-lg hover:border hover:border-gray-700 py-4"
    >
      <div class="relative w-56 h-80 bg-gray-300 overflow-hidden group">
        <img
          className="w-40 h-56 p-4 rounded-t-lg lg:w-56 lg:h-80"
          src={imageUrl}
          alt={Name}
        />
        <div class="absolute inset-x-0 top-full h-40 bg-gray-900  transition-all duration-500 ease-in-out group-hover:top-[80%]"></div>
        <div class="relative z-10 flex items-center justify-center h-full">
          <p>Rê chuột vào đây</p>
        </div>
      </div>

      <div className="flex flex-col flex-wrap content-between justify-center mt-5 px-5  align-middle">
        <h5
          title={Authors}
          className=" h-6 text-base font-semibold tracking-tight text-gray-100  lg:text-sm overflow-hidden "
        >
          {Authors.map((author) => (
            author
          ))}
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
