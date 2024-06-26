import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// cart context
import { CartContext } from "../contexts/CartContext";
// icon
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"
import shoes from "../data/data";

const ProductDetails = () => {
  const { id } = useParams();
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { addToCart } = useContext(CartContext);

  // get the single product based on the Id
  const product = shoes.find((shoe) => {
    return shoe.id === parseInt(id);
  });

  // if product is not found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // destructure products
  const { title, price, description, image, rating, offers, originalPrize } =
    product;
  return (
    <>
      <Header />
      <section className="pt-20 lg:pt-40 pb-12 lg:py-32 h-screen flex bg-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            {/* image */}
            <div className="flex flex-1 justify-center items-center mb-6 lg:mb-0 w-[350px]">
              <img
                className="max-w-[250px] h-[150px] mt-5 lg:max-w-sm md:h-[200px] md:w-[300px] lg:w-[400px] lg:h-[250px] p-img"
                src={image}
                alt={title}
              />
            </div>
            {/* text */}
            <h2 className="text-[16px] mb-2 max-w-[450px] md:text-[25px] mx-auto lg:mx-0 text-white font-semibold lg:hidden">
              {title}
            </h2>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-x-3 justify-center lg:justify-start lg:gap-x-10">
                <div>
                  <h2 className="text-[16px] mb-2 max-w-[450px] md:text-[25px] mx-auto lg:mx-0 text-white font-semibold hidden lg:block">
                    {title}
                  </h2>
                  <div>
                    <div className="text-md md:text-xl font-medium mb-4 bg-slate-900 text-white px-4 py-2 rounded-md d-in inline-block">
                      {" "}
                      $ {price}{" "}
                      <span className="originalPrize text-gray-500">
                        $ {originalPrize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-2 lg:flex-col">
                  <p className="text-green-400 font-medium mb-1">{offers}</p>
                  <div className="inline-flex items-center gap-x-1 p-1 rounded-full bg-green-400 text-white">
                    <small className="inline lg:text-md">{rating} </small>

                    <small className="inline lg:text-lg">
                      {" "}
                      <FaStar className="text-sm pb-1" />{" "}
                    </small>
                  </div>
                </div>
              </div>
              <p className="sm:mt-2 mb-4 sm:mb-10 text-sm md:text-lg px-3 lg:px-0 text-gray-400 lg:pr-8">
                {description}
              </p>

              <div className=" flex flex-col sm:flex-row gap-2 sm:gap-10 justify-center items-center lg:justify-start  ">

              <div className=" text-center justify-center flex ">
                <button
                  className="bg-gray-900 py-3 px-8 text-white rounded-md flex justify-center items-center gap-2"
                  onClick={() => addToCart(product, product.id)}
                >
                  Add to cart
                  <div>
                    {" "}
                    <FaShoppingCart />
                  </div>
                </button>
              </div>

              <div className=" text-center justify-center sm:flex">
                <button
                  className="bg-gray-900 py-3 px-8 text-white rounded-md flex justify-center items-center gap-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Go to cart
                  <div>
                  <div>{" "}</div>
                    <BsBag className="text-white "/>
                  </div>
                </button>



              </div>
          </div>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
      <Footer />
    </>
  );
};

export default ProductDetails;
