import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast, Slide } from "react-toastify";

const AddMenuModal = ({ adding, setAdding, userId, token, fetchUserMenu }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    available: false
  });

  const postMenuItem = async (userId, token) => {
    try {
      const response = await fetch(
        `https://bitesync-v2.onrender.com:8080/api/menu/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(Object.values(data)[0]);
      }
      toast.success("Inventory item created", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Add Menu: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMenuItem(userId, token);
    setAdding(false);
    fetchUserMenu(token, userId);
  };

  return (
    <Dialog open={adding} onClose={setAdding} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm lg:w-full lg:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Add Menu Item
                    </h2>
                    <div className="mt-10 flex justify-between flex-grow sm:grid-cols-6">
                      <div className="w-1/2 pr-12 flex flex-col justify-evenly">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="name of item"
                                required
                                onChange={handleChange}
                                value={formData.name}
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="description"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <textarea
                                id="description"
                                name="description"
                                placeholder="description of item"
                                required
                                onChange={handleChange}
                                value={formData.description}
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="price"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Price
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <span className="flex items-center text-gray-500">$</span>
                              <input
                                id="price"
                                name="price"
                                type="number"
                                min={0.01}
                                step={0.01}
                                placeholder="unit price of items"
                                required
                                onChange={handleChange}
                                value={formData.price}
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="category"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Category
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <input
                                id="category"
                                name="category"
                                type="text"
                                placeholder="item category"
                                required
                                onChange={handleChange}
                                value={formData.category}
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="col-span-full">
                          <label
                            htmlFor="imageUrl"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Image URL
                          </label>
                          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                              id="imageUrl"
                              name="imageUrl"
                              type="text"
                              placeholder="item image url"
                              required
                              onChange={handleChange}
                              value={formData.imageUrl}
                              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                          {formData.imageUrl ? (
                            <img src={formData.imageUrl} />
                          ) : (
                            <PhotoIcon className="w-3/4" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to Menu Items
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddMenuModal;
