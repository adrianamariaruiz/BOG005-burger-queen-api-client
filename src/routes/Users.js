import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
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
        // todo lo que este aca se ejecutara desde el inicio de la app
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
                    <Button className='btnStateOrder' text='Inicio' onClick={() => { navegate('/admin') }}><FontAwesomeIcon className='iconArrow' icon={faCircleArrowRight} /></Button>
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
                                placeholder='Email Nuevo usuario'
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
                                <option value='seleccion tipo' disabled>Selecciona tipo</option>
                                <option value='Mesero'>Mesero</option>
                                <option value='Chef'>Chef</option>
                                <option value='Admin'>Admin</option>
                            </select>
                            <section className='sectionBtn'>
                                <Button text='Agregar' className='btnEnviar'>
                                </Button>
                                <Button text='Cancelar' className='btnCancel'>
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
