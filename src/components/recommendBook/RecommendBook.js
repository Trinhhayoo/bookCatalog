import bestRCM from "../../assets/Recom.webp";
const RecommendBook = ({ product }) => {
  const img = 50;
  const fullName = product.Name;
  const nameParts = fullName.split(" ");
  const firstName = nameParts.slice(0, nameParts.length / 2).join(" ");
  const lastName = nameParts.slice(nameParts.length / 2).join(" ");
  return (
    <section className="bg-white mb-10 ">
        <div className="flex overflow-hidden "> 
              {Array.from({ length: 50 }, (_, index) => (
                <img
                  key={index}
                  src={bestRCM}
                  alt="Recommended Book"
                  className="h-10 w-10  animate-slideInfinite"
                />
              ))}
             </div> 
      <div className="grid max-w-screen-xl px-2 pt-2 pb-2 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28 ">
        <div className="mr-auto place-self-center lg:col-span-7 pl-20">
          <h1 className="max-w-xl mb-2 text-xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black">
            {firstName} <br />
            {lastName}.
          </h1>
          <p className="font-bold">Rating: {product.Rating}</p>
          <p className="font-bold">Authors: {product.Authors}</p>
          <div className="relative z-100 flex flex-row ml-4 mt-10">
            {/* <img
              src={bestRCM}
              alt="Recommended Book"
              className="h-10 w-10 absolute top-0 -right-12 z-10 animate-slideInfinite"
            /> */}
            
          </div>
        </div>

        <div className="hidden  justify-center lg:mt-0 lg:col-span-5 lg:flex ">
          <img
            className="h-4/5 w-1/2 object-cover "
            src={product.imageUrl}
            alt={product.Name}
          />
        </div>
       
      </div>
      <div className="flex overflow-hidden "> 
              {Array.from({ length: 50 }, (_, index) => (
                <img
                  key={index}
                  src={bestRCM}
                  alt="Recommended Book"
                  className="h-10 w-10  animate-slideInfinite"
                />
              ))}
             </div> 
    </section>
  );
};

export default RecommendBook;
