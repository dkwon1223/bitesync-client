import {
  ListBulletIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { toast, Slide } from "react-toastify";
import AddMenuModal from "../components/AddMenuModal";
import EditMenuModal from "../components/EditMenuModal";

const Menu = () => {
  const { token, userId } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [itemId, setItemId] = useState(null);

  const fetchUserMenu = async (token, userId) => {
    try {
      const response = await fetch(
        `https://bitesync-v2.onrender.com:8080/api/menu/user/${userId}`,
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
      setMenuItems(data);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Menu: ${error.message}`,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const deleteMenuItem = async (userId, itemId, token) => {
    try {
      const response = await fetch(
        `https://bitesync-v2.onrender.com:8080/api/menu/user/${userId}/item/${itemId}`,
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
      toast.success("Item deleted", {
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
        toastId: `Menu Item: DELETE ${error.message}`,
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
    fetchUserMenu(token, userId);
  }, [editing, adding, deleting]);

  const handleDelete = (e) => {
    deleteMenuItem(userId, e.target.id, token);
    setDeleting(false);
  };

  const handleUpdate = (e) => {
    setItemId(e.target.id);
    setEditing(true);
  };

  const handlePost = () => {
    setAdding(true);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 pt-8 w-full h-full">
      <AddMenuModal
        adding={adding}
        setAdding={setAdding}
        userId={userId}
        token={token}
        fetchUserMenu={fetchUserMenu}
      />
      <EditMenuModal
        editing={editing}
        setEditing={setEditing}
        itemId={itemId}
        userId={userId}
        token={token}
        fetchUserMenu={fetchUserMenu}
      />
      <div className="sm:flex sm:items-center h-[10%] mb-8 border-b-2 border-gray-300">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Your Menu Items
          </h1>
          <p className="mt-2 text-sm text-gray-700">A list of all menu items</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handlePost}
          >
            Add Menu Item
          </button>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[80%]"
      >
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <h3 className="px-1 truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <span className="w-min inline-flex shrink-0 items-center justify-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {item.category}
                    </span>
                  </div>
                  <div className="w-1/2 flex justify-end items-center">
                    <img
                      alt={`${item.name}`}
                      src={item.imageUrl}
                      className="size-14 shrink-0 rounded-full bg-gray-300 object-cover"
                    />
                  </div>
                </div>
                <p className="my-4 flex justify-between items-center text-sm font-light">
                  Available:{" "}
                  {item.available ? (
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="size-7 text-green-400"
                    />
                  ) : (
                    <XCircleIcon
                      aria-hidden="true"
                      className="size-7 text-red-400"
                    />
                  )}
                </p>
                <div className="grid grid-cols-2 gap-y-1 text-sm font-semibold">
                  {[
                    { label: "Price", value: item.price },
                    { label: "Ingredient Cost", value: item.costToMake },
                    {
                      label: "Gross Profit",
                      value:
                        item.costToMake === 0
                          ? 0
                          : item.price - item.costToMake,
                    },
                  ].map((entry, index) => (
                    <div
                      key={`id-${item.id}-name-${item.name}${index}-label`}
                      className="contents"
                    >
                      <span className="text-gray-800 text-xs font-light w-1/2">
                        {entry.label}:
                      </span>
                      <span
                        key={`id-${item.id}-name-${item.name}${index}-value`}
                        className="text-right font-medium text-gray-700 text-xs border-b-[1px] border-gray-300"
                      >
                        {entry.value === 0
                          ? "N/A"
                          : Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    id={item.id}
                    onClick={handleUpdate}
                  >
                    <ListBulletIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400 pointer-events-none"
                    />
                    Edit
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    id={item.id}
                    onClick={handleDelete}
                  >
                    <TrashIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400 pointer-events-none"
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
