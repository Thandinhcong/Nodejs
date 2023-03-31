import { useForm } from "react-hook-form";


const AddProduct = ({ onAdd }) => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onHandleSubmit = (data) => {
        onAdd(data);
    }
    return (
        <div className="">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text"
                    {...register('name', { required: true })}
                />
                {errors.name && <span>Bắt buộc phải nhập</span>}
                <input type="number" {...register('age')} />
                <input type="text" {...register('description')} />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AddProduct;