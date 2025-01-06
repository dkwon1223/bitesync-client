import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { toast, Slide } from "react-toastify";
import EditInventoryModal from "../components/EditInventoryModal";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const { token, userId } = useContext(AuthContext);

  const fetchUserInventory = async (token, userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/inventory/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve inventory data. Try again later.");
      }
      const data = await response.json();
      setInventoryItems(data);
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
    fetchUserInventory(token, userId);
  }, []);

  const handleEdit = (e) => {
    setEditing(true);
  }

  return (
    <section className="px-4 sm:px-6 lg:px-12 pt-8 w-full h-full">
      <EditInventoryModal editing={editing} setEditing={setEditing}/>
      <div className="sm:flex sm:items-center h-[10%]">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Your Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all inventory items
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add inventory item
          </button>
        </div>
      </div>
      <div className="mt-4 flex h-[85%] min-w-full">
        <div className="sm:-mx-6 lg:-mx-8 w-full">
          <div className="inline-block min-w-full max-h-full align-middle overflow-y-auto pb-2">
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
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Unit Price
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-2"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 bg-white">
                {inventoryItems.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.unitPrice)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        id={item.id}
                        onClick={handleEdit}
                      >
                        Edit<span className="sr-only">, {item.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
