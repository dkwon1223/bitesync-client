import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PhotoIcon, TrashIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import AddRequiredIngredientModal from "./AddRequiredIngredientModal";

const EditMenuModal = ({
  editing,
  setEditing,
  itemId,
  userId,
  token,
  fetchUserMenu,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    available: false,
  });
  const [requiredInventoryItems, setRequiredInventoryItems] = useState([]);
  const [ingredientsDisabled, setIngredientsDisabled] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [addingIngredients, setAddingIngredients] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const fetchMenuItem = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu/user/${userId}/item/${itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(Object.values(data)[0]);
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Menu Item GET: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const fetchRequiredInventoryItems = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu-inventory/user/${userId}/menu/${itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(Object.values(data)[0]);
      }
      const data = await response.json();
      const parsedData = await data.map((item) => {
        return {
          id: item.id,
          quantityNeeded: item.quantityNeeded,
          name: item.requiredInventoryItem.name,
        };
      });
      setRequiredInventoryItems(parsedData);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Ingredients GET: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const updateMenuItem = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu/user/${userId}/item/${itemId}`,
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
        const data = await response.json();
        throw new Error(Object.values(data)[0]);
      }
      toast.success("Menu item updated", {
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
        toastId: `Menu Item UPDATE: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const updateMenuInventory = async (inventoryItems, token) => {
    const baseUrl = "http://localhost:8080/api/menu-inventory";

    try {
      const requests = inventoryItems.map((item) => {
        const { id, quantityNeeded } = item;

        return fetch(`${baseUrl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantityNeeded }),
        });
      });

      const responses = await Promise.all(requests);

      const results = await Promise.all(
        responses.map((response) => {
          if (!response.ok) {
            throw new Error(Object.values(response.json()[0]));
          }
          return response.json();
        })
      );
      toast.success("Ingredients updated", {
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
        toastId: `Ingredient UPDATE: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const deleteMenuInventory = async (ingredientId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu-inventory/${ingredientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(Object.values(data)[0]);
      }
      toast.success("Ingredient deleted", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setDeleting(true);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Ingredient DELETE: ${error.message}`,
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
      fetchMenuItem(userId, itemId, token);
      fetchRequiredInventoryItems(userId, itemId, token);
    }
  }, [editing, deleting, addingIngredients]);

  const handleChange = (e) => {
    setUpdateDisabled(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { value, id } = e.target;
    setRequiredInventoryItems((prevInventoryItems) =>
      prevInventoryItems.map((item) =>
        item.id === parseInt(id)
          ? { ...item, quantityNeeded: parseInt(value) }
          : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMenuItem(userId, itemId, token);
    setEditing(false);
    fetchUserMenu(token, userId);
  };

  const handleIngredientUpdate = () => {
    updateMenuInventory(requiredInventoryItems, token);
  };

  const handleIngredientDelete = (e) => {
    const { id } = e.target;
    deleteMenuInventory(id);
    setDeleting(false);
  };

  const toggleIngredientsDisabled = () => {
    if (ingredientsDisabled) {
      setIngredientsDisabled(false);
    } else {
      setIngredientsDisabled(true);
      handleIngredientUpdate();
    }
  };

  return (
    <>
      <AddRequiredIngredientModal
        addingIngredients={addingIngredients}
        setAddingIngredients={setAddingIngredients}
        menuItemId={itemId}
        menuItemName={formData.name}
        setEditing={setEditing}
        requiredInventoryItems={requiredInventoryItems.map((item) => {
          return item.id;
        })}
      />
      <Dialog
        open={editing}
        onClose={() => {
          setEditing(false);
          setUpdateDisabled(true);
        }}
        className="relative z-40"
      >
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
                    <div className="border-b border-gray-900/10 pb-4 flex flex-col overflow-y-auto">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Update Menu Item
                      </h2>
                      <div className="mt-10 flex justify-between flex-grow sm:grid-cols-6 overflow-y-auto">
                        <div className="w-1/2 pr-12 flex flex-col justify-evenly">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Name
                            </label>
                            <div>
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
                              className="block text-sm/6 font-medium text-gray-900 mt-2"
                            >
                              Description
                            </label>
                            <div>
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
                              className="block text-sm/6 font-medium text-gray-900 mt-2"
                            >
                              Price
                            </label>
                            <div>
                              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <span className="flex items-center text-gray-500">
                                  $
                                </span>
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
                              className="block text-sm/6 font-medium text-gray-900 mt-2"
                            >
                              Category
                            </label>
                            <div>
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
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="available"
                              className="block text-sm/6 font-medium text-gray-900 mt-2"
                            >
                              Available
                            </label>
                            <div>
                              <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                {formData.available ? (
                                  <CheckCircleIcon
                                    aria-hidden="true"
                                    className="size-5 text-green-400"
                                  />
                                ) : (
                                  <XCircleIcon
                                    aria-hidden="true"
                                    className="size-5 text-red-400"
                                  />
                                )}
                                <input
                                  id="available"
                                  name="available"
                                  type="text"
                                  placeholder="item available"
                                  disabled
                                  value={
                                    formData.available
                                      ? "available"
                                      : "not available"
                                  }
                                  className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-red-400">Availability can only be modified by adding associated inventory/ingredients</p>
                        </div>
                        <div className="w-1/2 max-h-36">
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
                              <img
                                src={formData.imageUrl}
                                className="max-h-52 rounded-lg"
                              />
                            ) : (
                              <PhotoIcon className="w-3/4" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="my-4 pb-4 flex items-center justify-end gap-x-6 border-b-2 border-gray-300">
                        <button
                          type="submit"
                          disabled={updateDisabled}
                          className={
                            updateDisabled
                              ? "rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 cursor-not-allowed"
                              : "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          }
                        >
                          Update Menu Item Details
                        </button>
                      </div>
                      <div className="h-12 w-full mt-2 px-4">
                        <div className="w-full flex justify-between py-2">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Menu Item Ingredients
                          </h2>
                          <button
                            type="button"
                            onClick={() => setAddingIngredients(true)}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add Required Inventory/Ingredient
                          </button>
                        </div>
                        <table className="min-w-full">
                          <thead className="sticky top-0 z-30 bg-[#F6FAFE] shadow-md">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Quanity Required
                              </th>
                              <th
                                scope="col"
                                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                <a
                                  className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                  onClick={toggleIngredientsDisabled}
                                >
                                  {ingredientsDisabled ? "Edit" : "Done"}
                                </a>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-300 bg-white">
                            {requiredInventoryItems.map((item) => (
                              <tr key={item.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <input
                                    id={item.id}
                                    name="quantityNeeded"
                                    type="number"
                                    min={0}
                                    step={1}
                                    disabled={ingredientsDisabled}
                                    onChange={handleIngredientChange}
                                    value={item.quantityNeeded}
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-gray-300 rounded-md"
                                  />
                                </td>
                                <td className="relative whitespace-nowrap py-4 pr-4 text-sm font-medium sm:pr-6 lg:pr-8">
                                  <button
                                    className="relative text-gray-500 hover:text-red-400 flex justify-center items-center"
                                    type="button"
                                    id={item.id}
                                    onClick={handleIngredientDelete}
                                  >
                                    Delete
                                    <TrashIcon
                                      aria-hidden="true"
                                      className="ml-2 size-5 text-inherit pointer-events-none"
                                    />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                  Go back to Menu Items
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditMenuModal;
