import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import Radio from "../components/products/filters/Radio";
import Checkbox from "../components/products/filters/Checkbox";
import Range from "../components/products/filters/Range";

import { Outlet, useParams } from "react-router-dom";
import { BooksContext } from "../contexts/BooksProvider";
import { FILTERS_ACTION } from "../constants/dispatchTypes";
import { FaPlus } from "react-icons/fa6";

const ProductLayout = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {
    filtersState: { ratingSlider },
    filtersDispatch,
    handleFilterReset,
  } = useContext(BooksContext);

  const ratingsRange = {
    value: ratingSlider,
    dispatch: filtersDispatch,
    heading:
      ratingSlider === 10
        ? `Ratings (${ratingSlider})`
        : `Ratings (${ratingSlider} and above)`,
    max: 10,
    min: 0,
    step: 1,
    dispatchType: FILTERS_ACTION.UPDATE_RATING_SLIDER,
  };
  return (
    <div className=" bg-gray-900  ">
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-gray-900 shadow-xl">
                <div className="flex justify-end px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-gray-900 rounded-md"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-4 mt-8 ">
                  <h2 className="text-lg font-medium text-gray-100">Filters</h2>
                  <span className="w-px h-6 bg-gray-700" aria-hidden="true" />
                  <button
                    onClick={handleFilterReset}
                    className="flex items-center p-2 text-sm text-gray-400 rounded-lg bg-gray-50 bg-opacity-10"
                    type="button"
                  >
                    {" "}
                    <XMarkIcon className="w-4 h-4 mr-2" /> Clear All
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200 ">
                  <h3 className="sr-only">Categories</h3>
                  <div className="px-4 mt-12 space-y-2">
                    <Radio />
                    <Range {...ratingsRange} />
                    <Checkbox />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="relative px-4 mx-auto md:ml-36 mt-18 bg-gray-900 max-w-7xl sm:px-6 lg:px-8">
        <div className="sticky z-20 flex items-baseline justify-between pt-40 bg-gray-900 sm:top-16 lg:top-0 md:pt-24 mb-30">
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left"></Menu>
            <button
              type="button"
              className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          {/* Filters */}
          <aside
            id="default-sidebar"
            aria-label="Sidebar"
            className="fixed left-0 h-screen mx-6 transition-transform -translate-x-full lg:w-64 sm:top-32 lg:top-16 sm:translate-x-0"
          >
            <div className="h-full px-3 py-4 overflow-y-auto">
              <form className="hidden md:block">
                <div className="flex items-center justify-between my-4 text-gray-100 ">
                  <span className="font-bold tracking-wide md:text-md lg:text-2xl">
                    Filters
                  </span>
                  <span
                    className="hidden w-px h-6 bg-gray-700 lg:block"
                    aria-hidden="true"
                  />
                  <button
                    onClick={handleFilterReset}
                    className="flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-gray-50 hover:bg-opacity-10"
                    type="button"
                  >
                    {" "}
                    <XMarkIcon className="w-4 h-4 mr-2" /> Clear All
                  </button>
                </div>
                <h3 className="sr-only">Categories</h3>
                <div className="mt-6 space-y-4">
                  <Radio />
                  <Range {...ratingsRange} />
                  <Checkbox />
                </div>
              </form>
            </div>
          </aside>

          {/* Product grid */}
          <div className="ml-32 p-4 sm:mt-12 lg:mt-0">
            <div className="flex justify-end">
              <button
                type="button"
                className="  justify-end text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 "
              >
                <FaPlus className="w-6 h-5 me-2 -ms-1" />
                Add new book
              </button>
            </div>

            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductLayout;
