import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchRemoveService } from '../actions/actionCreators';
import { Redirect } from 'react-router-dom';

export default function ServiceItem({ id, name, price }) {
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch();

    const handleRemove = id => {
        fetchRemoveService(dispatch, id)
    }

    const handleEdit = () => {
        setRedirect(!redirect)
    }

    return (
        <Fragment>
            { redirect ? <Redirect to={`/services/${id}`} /> :
                <li >
                    {name} {price}
                    <button onClick={() => handleEdit()}>edit</button>
                    <button onClick={() => handleRemove(id)}>✕</button>
                </li>}
        </Fragment>
    )
}