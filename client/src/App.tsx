import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { IProduct } from "./interfaces/product";
import { addProducts, deleteProducts, getProducts } from "./api/product";
import AddProduct from "./pages/addProduct";
function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    async function fetchProduct() {
      const { data } = await getProducts();
      // console.log(data);
      setProducts(data)
    }
    fetchProduct()
  }, [])

  const handleRemove = (id: string | number) => {
    deleteProducts(id)
  }

  const onHandleAdd = async (product: IProduct) => {
    const { data } = await addProducts(product)
    console.log(data);
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element=
          {products.map((item, index) => (
            <div key={index}>
              {item.name}
              <button onClick={() => { handleRemove(item._id) }}> xóa</button>
            </div>
          ))}
        />
        <Route path="/add" element={
          <AddProduct
            onAdd={onHandleAdd}
          />}
        />
        <Route path="/signin" element='home' />
      </Routes>
    </div>
  )
}

export default App;
