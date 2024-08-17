import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ShopCard = ({ title, brandName, category, dateAndTime, description, price, image, ratings,  }) => {

  // const date = dateAndTime ? dateAndTime.split('T')[0] : "N/A";
  // const timeFix = dateAndTime ? dateAndTime.split('T')[1] : "N/A";
  // const time = timeFix !== "N/A" ? timeFix.split('Z')[0] : "N/A";

  return (
    <div
      className="bg-white rounded-lg lg:w-[400px] shadow-lg dark:bg-gray-800 flex flex-col justify-between"
      style={{ height: "550px" }}
    >
      <img
        className="object-cover w-80 h-full mt-2 p-3 rounded-lg"
        src={image}
        alt="Product Image"
      />
      <div className="px-4 py-2 flex-grow">
        <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">
          {title}
        </h1>
        <h5 className="font-bold uppercase text-gray-600 dark:text-gray-400">
          Brand: {brandName}
        </h5>
        <div className="flex flex-col">
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Category: {category}</span>
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Date and Time: </span>
            <span>{dateAndTime}</span>
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold">Description: </span>
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${price}</h1>
        <Rating style={{ maxWidth: 120 }} value={ratings} readOnly />
      </div>
    </div>
  );
};

export default ShopCard;
