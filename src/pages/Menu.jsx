import { ListBulletIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const Menu = () => {
  const { token, userId } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);

  const fetchUserMenu = async (token, userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu/user/${userId}`,
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
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 pt-8 w-full h-full">
      <div className="sm:flex sm:items-center h-[10%] mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Your Menu Items
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
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto"
      >
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
              <img
                alt=""
                src={item.imageUrl}
                className="size-10 shrink-0 rounded-full bg-gray-300"
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <ListBulletIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    Edit
                  </button>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <TrashIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
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
