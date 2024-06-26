import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { deleteProduct, editProduct } from '../helpers/axios'
import Button from './Button'
import FormInput from './FormInput'
import Modal from './Modal'

export const CardListProducts = ({ product, setListProductsTotal }) => {

    const [openModal, setOpenModal] = useState(false)
    const [productUpdate, setProductUpdate] = useState({ dateEntry: new Date(), image: product.image, name: product.name, price: product.price, type: "", id: product.id });

    const handleDelete = async () => {
        Swal.fire({
            title: 'Está seguro de que desea eliminar éste producto?',
            text: "No podrá recuperar el producto eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'sí, eliminar producto!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(product, product.id).then((resDelete) => {
                    if (resDelete.status === 200) {
                        Swal.fire(
                            'Exito!',
                            'El producto se eliminó correctamente!',
                            'success'
                        )
                        setListProductsTotal((lista) => lista.filter(p => p.id !== product.id))
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo ocurrió y no se pudo crear el producto!'
                        })
                    }
                })
            }
        })
    }

    const handleEdit = () => {
        setOpenModal(true)
    }

    const handleChange = (e) => {
        setProductUpdate({
            ...productUpdate,
            [e.target.name]: e.target.value
        })
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const updateProductNow = async () => {
        const res = await editProduct(productUpdate, product.id)
        if (res.status === 200) {
            Swal.fire(
                'Bien hecho!',
                'El producto se editó con éxito!',
                'success'
            )
            setListProductsTotal((lista) => lista.map(p => {
                return (p.id === product.id) ? productUpdate : p
            }))
        } else {
            alert('No se edito el producto')
        }
        closeModal()
    }

    return (
        <>
            <div className='productsContainer'>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>${product.price}</p>
                <p>{product.type}</p>
            </div>
            <div className='btnContainerProducts'>
                <Button className='btn btnEdit' text='Editar' onClick={handleEdit} />
                <Modal
                    isOpen={openModal}
                    closeModal={closeModal}
                >
                    <p>Editar producto</p>
                    <FormInput
                        className="inputCargarImagen"
                        type='url'
                        name='image'
                        required
                        placeholder='cargar imagen'
                        value={productUpdate.image}
                        onChange={handleChange}
                    >
                    </FormInput>
                    <FormInput
                        className="inputNombreProducto"
                        type='nameNewProduct'
                        name='productName'
                        required
                        placeholder='Nombre del nuevo producto'
                        value={productUpdate.name}
                        onChange={handleChange}
                    >
                    </FormInput>
                    <FormInput
                        className="inputPrecio"
                        type='string'
                        name='price'
                        required
                        placeholder='Precio del nuevo producto'
                        value={productUpdate.price}
                        onChange={handleChange}
                    >
                    </FormInput>
                    <select defaultValue={product.type} className='SelectTypeProduct' name='type' onChange={handleChange} aria-label = 'type'>
                        <option value={product.type} disabled>{product.type}</option>
                        <option value='Desayuno'>Desayuno</option>
                        <option value='Almuerzo'>Almuerzo</option>
                        <option value='Bebida'>Bebida</option>
                        <option value='Adicion'>Adicion</option>
                    </select>
                    {/* <select defaultValue={product.type} name='type' onChange={handleChange} className="SelectTypeProduct">
                        <option value={product.type} disabled>{product.type}</option>
                        <option value='Desayuno'>Desayuno</option>
                        <option value='Almuerzo'>Almuerzo</option>
                    </select> */}
                    <div className='optionsModal'>
                        <Button onClick={updateProductNow} text="Aceptar" className="btn btnEdit" />
                        <Button onClick={closeModal} text="Cancelar" className="btn btnDelete" />
                    </div>

                </Modal>
                <Button className='btn btnDelete' text='Eliminar' onClick={handleDelete} />
            </div>
        </>
    )

}
