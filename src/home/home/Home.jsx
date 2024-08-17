import { useEffect, useState } from "react";
import ShopCard from "../../components/ShopCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchProducts = async () => {
    try {
      const response = await axiosPublic.get("/products", {
        params: {
          page,
          limit: 6, // Number of products per page
          search,
          brand,
          category,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder,
        },
      });
      setProducts(response.data.products);
      
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, brand, category, minPrice, maxPrice, sortBy, sortOrder]);

  console.log(search, "this is products");

  return (
    <div className="md:w-[92%] min-h-screen  w-[95%] mx-auto">
      <Helmet>
        <title>Tech Shop | Home</title>
      </Helmet>

      {/* Search and Filters */}
      <div className="flex md:flex-row flex-col justify-center my-8">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded mb-2 mr-2"
        />
        <select
          value={brand} // Added value attribute for controlled component
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 rounded mb-2 mr-2"
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Google">Google</option>
          <option value="Samsung">Samsung</option>
          <option value="Canon">Canon</option>
          <option value="Sony">Sony</option>
          <option value="OnePlus">OnePlus</option>
          <option value="Fujifilm">Fujifilm</option>
          <option value="LG">LG</option>
          <option value="Asus">Asus</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Huawei">Huawei</option>
          <option value="Acer">Acer</option>
          <option value="MSI">MSI</option>
          <option value="Bose">Bose</option>
        </select>
        <select
          value={category} // Added value attribute for controlled component
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded mb-2 mr-2"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Mobile</option>
          <option value="Camera">Camera</option>
          <option value="Monitor">Monitor</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded mb-2 mr-2 md:w-40 w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded mb-2 mr-2 md:w-40 w-full"
        />

        {/* Sort By Dropdown */}
        <select
          value={sortBy} // Added value attribute for controlled component
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded mb-2 mr-2"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="creationDate">Date</option>
        </select>

        <select
          value={`${sortBy}-${sortOrder}`} // Added value attribute for controlled component
          onChange={(e) => {
            const value = e.target.value;
            if (value === "price-asc") {
              setSortBy("price");
              setSortOrder("asc");
            } else if (value === "price-desc") {
              setSortBy("price");
              setSortOrder("desc");
            } else if (value === "date-desc") {
              setSortBy("creationDate");
              setSortOrder("desc");
            }
          }}
          className="border border-white p-2 rounded mb-2 mr-2"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="date-desc">Date (Newest)</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
        {products?.length > 0 ? (
          products.map((product) => (
            <ShopCard
              key={product._id}
              brandName={product.brandName}
              category={product.category}
              dateAndTime={product.date}
              description={product.description}
              price={product.price}
              image={product.productImage}
              title={product.productName}
              ratings={product.ratings}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center my-5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white border px-3 py-1 mx-1 rounded"
        >
          Previous
        </button>
        <span className="px-3 py-1 mx-1">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="border px-3 py-1 mx-1 rounded bg-blue-600 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
