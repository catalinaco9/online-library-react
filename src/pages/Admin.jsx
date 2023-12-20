import { useState, useEffect } from "react";

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    author: "",
    price: "",
    description: "",
    imageURL: "",
  });
  const [currentProductId, setCurrentProductId] = useState("");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://657ad1a9394ca9e4af12bec4.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const addNewProduct = () => {
    const url = "https://657ad1a9394ca9e4af12bec4.mockapi.io/products";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    fetch(url, options);
  };

  const deleteProduct = async (id) => {
    const url = `https://657ad1a9394ca9e4af12bec4.mockapi.io/products/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const updatedProducts = products.filter((product) => product.id != id);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className=" bg-purpleBackground p-10 ">
      <div className="flex flex-col gap-4 justify-center align-center ">
          <div className="flex gap-10">
            <label htmlFor="name" className="text-purple-dark font-bold">Name</label>
            <input
              className="form-control w-1/4 p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black"
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => {
                const productName = e.target.value;
                setProduct({ ...product, name: productName });
              }}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="author" className="text-purple-dark font-bold">Author</label>
            <input
              className="form-control w-1/4 p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black"
              type="text"
              id="author"
              value={product.author}
              onChange={(e) => {
                const productAuthor = e.target.value;
                setProduct({ ...product, author: productAuthor });
              }}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="imageURL" className="text-purple-dark font-bold">Image URL</label>
            <input
              type="text"
              id="imageURL"
              className="form-control w-1/4 p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black"
              value={product.imageURL}
              onChange={(e) => {
                const imageURL = e.target.value;
                setProduct({ ...product, imageURL: imageURL });
              }}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="price" className="text-purple-dark font-bold">Price</label>
            <input
              type="text"
              id="price"
              className="form-control w-1/4 p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black"
              value={product.price}
              onChange={(e) => {
                const productPrice = e.target.value;
                setProduct({ ...product, price: productPrice });
              }}
            />
          </div>
          <div className="flex gap-10">
            <label htmlFor="description" className="text-purple-dark font-bold">Description</label>
            <input
              type="text"
              id="description"
              className="form-control resize w-1/4 h-14 inline-block p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black"
              value={product.description}
              onChange={(e) => {
                const productDescription = e.target.value;
                setProduct({ ...product, description: productDescription });
              }}
            />
          </div>
      
        <div className="flex-row content-center">
          <button
            onClick={addNewProduct}
            className="rounded-md px-5 py-2.5  text-center text-sm font-bold font-large bg-purple-dark text-purple-light hover:bg-purple-light hover:text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple"
          >
            Save
          </button>
        </div>
      </div>
      <div>
        {products && (
          <table>
            <thead>
              <th>Name</th>
              <th>Author</th>
              <th>Image URL</th>
              <th>Price</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b-2 border-gray-300 pb-4">
                  <td>{product.name}</td>
                  <td>{product.author}</td>
                  <td>
                    <img src={product.imageURL} width={80} alt="" />{" "}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      id={product.id}
                      onClick={(e) => {
                        const productId = e.target.id;
                        setCurrentProductId(productId);
                        const productToBeEdited = products.find(
                          (product) => product.id === productId
                        );
                        setProduct(productToBeEdited);
                      }}
                      className=" hover:bg-purple-dark hover:text-purple-light bg-purple-light text-purple-dark focus:outline-none focus:ring-4 focus:ring-purple font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      id={product.id}
                      onClick={(e) => deleteProduct(e.target.id)}
                      className="bg-red hover:bg-[gray] text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
