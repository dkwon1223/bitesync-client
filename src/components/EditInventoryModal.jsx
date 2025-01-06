import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";

export default function EditInventoryModal({
  editing,
  setEditing,
  itemId,
  token,
  userId,
  fetchUserInventory,
}) {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    quantity: "",
    unitPrice: 0,
    category: "",
  });

  const fetchInventoryItem = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/inventory/user/${userId}/item/${itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const updateInventoryItem = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/inventory/user/${userId}/item/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update inventory item. Try again later.");
      }
      toast.success("Item updated", {
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  useEffect(() => {
    if (editing) {
      fetchInventoryItem(userId, itemId, token);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInventoryItem(userId, itemId, token);
    setEditing(false);
    fetchUserInventory(token, userId);
  };

  return (
    <Dialog open={editing} onClose={setEditing} className="relative z-40">
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
                      Edit Inventory Item
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
                            htmlFor="quantity"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Quantity
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="quantity of items"
                                required
                                onChange={handleChange}
                                value={formData.quantity}
                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="unitPrice"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Unit Price
                          </label>
                          <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                              <input
                                id="unitPrice"
                                name="unitPrice"
                                type="number"
                                min={0.01}
                                step={0.01}
                                placeholder="unit price of items"
                                required
                                onChange={handleChange}
                                value={formData.unitPrice}
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
                            htmlFor="image"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Image
                          </label>
                          <div className="mt-2 flex items-center gap-x-3">
                            <img src={formData.imageUrl} className="h-14 mr-4" />
                            <button
                              type="button"
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Change
                            </button>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cover photo
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <PhotoIcon
                                aria-hidden="true"
                                className="mx-auto size-12 text-gray-300"
                              />
                              <div className="mt-4 flex text-sm/6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs/5 text-gray-600">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Update Item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to inventory
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
