import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchService, changeServiceEditField, editService } from '../actions/actionCreators'
import Loader from "react-loader-spinner";
import { Redirect } from 'react-router-dom';



export default function EditForm({ match, history }) {
    const { loading, error, data, success } = useSelector(state => state.service)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const {name, price, content} = data

    const id = match.params.id

    useEffect(() => {
        dispatch(fetchService(id))
    }, [dispatch, id])

    const handleChange = evt => {
        const { name, value } = evt.target;
        dispatch(changeServiceEditField(name, value));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(editService(id))
        //editService(dispatch, name, price, content, id);
    }

    const handleClick = () => {
        setRedirect(!redirect)
    }

    if(success) {
        return (
            <Redirect to='/services' />
        )
    }

    if(redirect) {
        return (
            <Redirect to='/services' />
        )
    }

    if (loading) {
        return (
            <Loader
                type="TailSpin"
                color="#00BFFF"
                height={50}
                width={50}
            />
        )
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <div className="filed">
                <label htmlFor="name" className="name" id="name">Название</label>
                <input name='name' onChange={handleChange} value={name} type="text" className="name" id="name" />
            </div>
            <div className="filed">
                <label htmlFor="price" className="price" id="price">Стоимость</label>
                <input name="price" onChange={handleChange} value={price} type="text" className="price" id="price" />
            </div>
            <div className="filed">
                <label htmlFor="content" className="content" id="content">Описание</label>
                <input name='content' onChange={handleChange} value={content} type="text" className="content" id="content" />
            </div>
            <div className="filed">
                <button onClick={handleClick} >Отмена</button>
                <button type="submit">Сохранить</button>
            </div>
        </form>
    )
}