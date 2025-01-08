import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { toast, Slide } from "react-toastify";
import { useEffect, useState } from "react";

const EditOrderModal = ({ editing, setEditing, token, userId, orderId }) => {
  const [order, setOrder] = useState({
    customerName: "",
    status: "",
    total: 0,
    orderDate: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const fetchSingleOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/order/user/${userId}/orderId/${orderId}`,
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
      const parsedDateData = {
        ...data,
        orderDate: new Date(data.orderDate),
      };
      setOrder(parsedDateData);
    } catch (error) {
      toast.error(await error.message, {
        position: "top-center",
        toastId: `Order Details: ${error.message}`,
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
      fetchSingleOrder();
    }
  }, [editing]);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog
      open={editing}
      onClose={() => setEditing(false)}
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
            <div className="lg:col-start-3 lg:row-end-1">
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm/6 font-semibold text-gray-900">
                      Amount
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(order.total)}
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {order.status}
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <UserCircleIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm/6 font-medium text-gray-900">
                      {order.customerName}
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <CalendarDaysIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm/6 text-gray-500">
                      <time dateTime="2023-01-31">
                        {Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        }).format(order.orderDate)}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <CreditCardIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm/6 text-gray-500">
                      Paid with Visa ending in 1234
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  {isOpen ? (
                    <button
                      className="text-sm/6 font-semibold text-gray-900"
                      type="button"
                      onClick={toggleDropDown}
                    >
                      Close receipt <span aria-hidden="true">&uarr;</span>
                    </button>
                  ) : (
                    <button
                      className="text-sm/6 font-semibold text-gray-900"
                      type="button"
                      onClick={toggleDropDown}
                    >
                      View receipt <span aria-hidden="true">&darr;</span>
                    </button>
                  )}
                  {isOpen && (
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                      <div className="border-b-2 border-gray-400">
                        <div className="grid grid-cols-3 gap-4 font-semibold text-sm/6 text-gray-600 border-b-2 border-gray-400">
                          <span>Item Name</span>
                          <span className="text-center">Quantity</span>
                          <span className="text-right">Subtotal</span>
                        </div>
                        {order.orderItems.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-3 gap-4 text-sm/6 text-gray-500 py-1 border-b border-gray-300 last:border-none"
                          >
                            <span>{item.menuItem.name}</span>
                            <span className="text-center">{item.quantity}</span>
                            <span className="text-right">
                              ${item.subtotal.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-2">
                        <div className="grid grid-cols-2 gap-4 font-semibold">
                          <span>Total:</span>
                          <span className="text-right">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to Orders
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditOrderModal;
