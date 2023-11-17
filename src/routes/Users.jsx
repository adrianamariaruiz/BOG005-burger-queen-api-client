import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { createUserPost, getUsers } from '../helpers/axios';
import Swal from 'sweetalert2'
import CardListUsers from '../components/CardListUsers';
import { useNavigate } from 'react-router-dom';

export const Users = () => {

    const navegate = useNavigate()
    const { handleSubmit } = useForm()
    const [listUsersTotal, setListUsersTotal] = useState([])
    const [newUser, setNewUser] = useState({ email: "", password: "", role: "" })

    useEffect(() => {
        if (listUsersTotal.length === 0) {
            getUsers().then(res => {
                setListUsersTotal(res)
            })
        }

    }, [listUsersTotal])

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const createUser = async () => {
        const res = await createUserPost(newUser);
      
        if (res.status === 201) {
            Swal.fire(
                'Bien hecho!',
                'El Usuario se creó con éxito!',
                'success'
            )
            setListUsersTotal((lista) => [...lista, res.data.user])
            setNewUser({ email: "", password: "", role: "" })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo ocurrió y no se pudo crear el usuario!'
            })
        }
    }

    return (
        <section>
            <Header />
            <section className='usersAll'>
                <div className='containerBtnBack'>
                    <Button className='btnOrderRow' onClick={() => { navegate('/admin') }}><FontAwesomeIcon className='iconArrow' icon={faCircleArrowLeft} />Inicio</Button>
                </div>
                <h3>Administración de personal</h3>

                <div className='containerFormListUsers'>
                    <div className='containerFormAddUser'>
                        <form typeof='submit' className='formOrder formAddProduct' onSubmit={handleSubmit(createUser)} >
                            <p className='uAddUserForm'>Agregar Usuario</p>
                            <FormInput
                                className='inputEmailUser'
                                type='email'
                                name='email'
                                required
                                placeholder='Email nuevo usuario'
                                value={newUser.email}
                                onChange={handleChange}
                            >
                            </FormInput>
                            <FormInput
                                className='inputPasswordUser'
                                type='password'
                                name='password'
                                required
                                placeholder='Contraseña'
                                value={newUser.password}
                                onChange={handleChange}
                            >
                            </FormInput>
                            <select defaultValue='Selecciona tipo' className='SelectRolUser' name='role' onChange={handleChange} >
                                <option value='Selecciona tipo' disabled>Selecciona tipo</option>
                                <option value='waiter'>Mesero</option>
                                <option value='chef'>Chef</option>
                                <option value='admin'>Admin</option>
                            </select>
                            <section className='sectionBtn'>
                                <Button text='Agregar' className='btn btnSend'>
                                </Button>
                                <Button text='Cancelar' className='btn btnCancel'>
                                </Button>
                            </section>
                        </form>
                    </div>
                    <div className='containerUsersAdmin'>
                        {listUsersTotal.map((user, id) => (
                            <div key={id} className='divForUsers'>
                                <CardListUsers
                                    user={user}
                                    setListUsersTotal={setListUsersTotal}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}
