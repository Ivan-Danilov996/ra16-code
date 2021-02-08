import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../actions/actionCreators';
import Loader from "react-loader-spinner";
import ServiceItem from './ServiceItem';

function ServiceList(props) {
  const { items, loading, error } = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch])


  if (loading) {
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
      />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Fragment>
        <ul>
          {items.map(o => (
            <ServiceItem key={o.id} {...o}/>
          ))}
        </ul>
    </Fragment>
  );
}

export default ServiceList
