import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { toast, Slide } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";

const AddRequiredIngredientModal = ({
  addingIngredients,
  setAddingIngredients,
  menuItemId,
  menuItemName,
  requiredInventoryItems,
}) => {
  const { token, userId } = useContext(AuthContext);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
  const [removingIngredient, setRemovingIngredient] = useState(false);

  const fetchUserInventory = async (token, userId) => {
    try {
      const response = await fetch(
        `https://bitesync-v2.onrender.com:8080/api/inventory/user/${userId}`,
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
      const notIncludedIngredients = data.filter((item) => {
        return !requiredInventoryItems.includes(item.id);
      });
      setInventoryItems(notIncludedIngredients);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Inventory: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const postIngredients = async () => {
    const baseUrl = `https://bitesync-v2.onrender.com:8080/api/menu-inventory/user/${userId}`;

    try {
      const requests = ingredientsToAdd.map((item) => {
        const { id, quantityNeeded } = item;

        return fetch(`${baseUrl}/inventory-item/${id}/menu-item/${menuItemId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantityNeeded: quantityNeeded }),
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
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setAddingIngredients(false);
      setIngredientsToAdd([]);
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
  }

  useEffect(() => {
    fetchUserInventory(token, userId);
  }, [addingIngredients, removingIngredient]);

  const handleAddIngredient = (ingredient) => {
    ingredient.quantityNeeded = 1;
    setInventoryItems(() => inventoryItems.filter((item) => {
      return item.id !== ingredient.id;
    }))
    setIngredientsToAdd([...ingredientsToAdd, ingredient]);
  };

  const handleRemoveIngredient = (e, data) => {
    setRemovingIngredient(true);
    setIngredientsToAdd((ingredientsToAdd) => ingredientsToAdd.filter((item) => {
      return item.id !== parseInt(e.target.id);
    }))
    setInventoryItems([...inventoryItems, data]);
  }

  const handleQuantityChange = (e) => {
    const { id, value } = e.target;
    setIngredientsToAdd((ingredientsToAdd) => ingredientsToAdd.map((item) => {
      if(item.id = id) {
        return {...item, quantityNeeded: value }
      }
    }))
  }

  return (
    <Dialog
      open={addingIngredients}
      onClose={() => {
        setAddingIngredients(false);
        setIngredientsToAdd([]);
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
            <div className="sm:flex-auto border-b-2 border-gray-300">
              <h1 className="text-xl font-semibold text-gray-900 border-b-2 border-gray">
                Required Inventory/Ingredients
              </h1>
              <div className="w-full flex justify-end my-4 px-4">
                <button
                  type="button"
                  onClick={postIngredients}
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Ingredient(s)
                </button>
              </div>
              <div className="w-full flex justify-between my-4 border-b-2 border-gray px-4">
                <h2 className="w-1/2 text-md font-semibold text-gray-900">
                  Available
                </h2>
                <h2 className="w-1/2 text-md font-semibold text-gray-900">
                  Add Ingredient for: {menuItemName}
                </h2>
              </div>
            </div>
            <div className="flex">
              <div className="max-h-72 w-1/2 overflow-y-auto">
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
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-2"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 bg-white">
                    {inventoryItems.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {item.name}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <a
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => {
                              handleAddIngredient(item);
                            }}
                            id={item.id}
                          >
                            Add<span className="sr-only">, {item.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-y-auto max-h-72 w-1/2">
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
                        className="py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Quantity Required
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 bg-white">
                    {ingredientsToAdd.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap py-2 text-sm font-medium text-gray-900">
                          <div className="flex justify-center items-center">
                            <input
                              id={item.id}
                              name="quantityNeeded"
                              type="number"
                              min={1}
                              step={1}
                              value={item.quantityNeeded}
                              onChange={handleQuantityChange}
                              className="block min-w-0 max-w-24 grow py-1.5 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-gray-300 rounded-md"
                            />
                            <button
                              className="relative text-gray-500 hover:text-red-400 flex justify-center items-center ml-4"
                              type="button"
                              onClick={(e) => handleRemoveIngredient(e, item)}
                              id={item.id}
                            >
                              Remove
                              <TrashIcon
                                aria-hidden="true"
                                className="ml-2 size-5 text-inherit pointer-events-none"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddRequiredIngredientModal;
