import React from 'react';
import { useParams } from 'react-router-dom';

const CardDetail = () => {
    const { id } = useParams();
    return <div>this link: {id}</div>;
};

export default CardDetail;
