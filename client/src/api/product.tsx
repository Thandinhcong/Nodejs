import insntace from "./insntace";
import { IProduct } from "../interfaces/product";
export const getProducts = () => {
    return insntace.get("/products")
}
export const addProducts = (product: IProduct) => {
    return insntace.post("/products", {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5NzdiOTMyODk5MGYzYzc5N2NhOSIsImlhdCI6MTY4MDE4NzM0NCwiZXhwIjoxNjgwMjczNzQ0fQ.HwUN9ljDQ9bD9SKMQjnaZMXORK9nsBbKDQrd5FLp2w4 `
        }
    })
}

export const deleteProducts = (id: number | string) => {
    return insntace.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI5NzdiOTMyODk5MGYzYzc5N2NhOSIsImlhdCI6MTY4MDE4NzM0NCwiZXhwIjoxNjgwMjczNzQ0fQ.HwUN9ljDQ9bD9SKMQjnaZMXORK9nsBbKDQrd5FLp2w4 `
        }
    })
}
