import { useState } from "react";
import instance from "../axiosConfig";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    attributes: [{ name: "", value: "" }],
    inStock: "",
    inventory: "",
    image: "",
  });

  function handleAttributeChange(index, field, value) {
    const newAttributes = data.attributes.map((attr, i) => {
      if (i === index) {
        return { ...attr, [field]: value };
      }
      return attr;
    });

    setData({
      ...data,
      attributes: newAttributes,
    });
  }

  function addNewAttribute() {
    setData({
      ...data,
      attributes: [...data.attributes, { name: "", value: "" }],
    });
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("brand", data.brand);
    formdata.append("description", data.description);
    formdata.append("attributes", JSON.stringify(data.attributes));
    formdata.append("inStock", data.inStock);
    formdata.append("inventory", data.inventory);
    formdata.append("image", data.image);

    const response = await instance.post("/product/add", formdata);
    console.log(response);
  }

  return (
    <>
      <form
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            name="name"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <input
            type="text"
            placeholder="Brand"
            value={data.brand}
            name="brand"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <input
            type="text"
            placeholder="Category"
            value={data.category}
            name="category"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <input
            type="text"
            placeholder="Price"
            value={data.price}
            name="price"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <textarea
            name="description"
            value={data.description}
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          ></textarea>

          <div id="attributes" className="space-y-4">
            {data.attributes.map((attribute, index) => (
              <div className="flex gap-4" key={index}>
                <input
                  type="text"
                  name="attributeName"
                  placeholder="Attribute Name"
                  value={attribute.name}
                  onChange={(e) =>
                    handleAttributeChange(index, "name", e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="attributeValue"
                  placeholder="Attribute Value"
                  value={attribute.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addNewAttribute}
              className="text-blue-500 font-medium hover:underline"
            >
              + Add Attribute
            </button>
          </div>

          <div id="inStock" className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="inStock"
                value={true}
                onChange={handleChange}
                className="mr-2"
              />
              In Stock
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inStock"
                value={false}
                onChange={handleChange}
                className="mr-2"
              />
              Out of Stock
            </label>
          </div>

          <input
            type="text"
            name="inventory"
            placeholder="Inventory Count"
            value={data.inventory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
