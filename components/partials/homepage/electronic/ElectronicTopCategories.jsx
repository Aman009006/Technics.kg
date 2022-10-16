import React, { Component, useState ,useEffect } from 'react';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'
import { config } from '~/config';


function ElectronicTopCategories({category}) {

    const [mini,setMini]=useState()

    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };

        axios
            .get(`${config.mainUrl}by-parent/categories?page=1&itemsPerPage=30&parent.id=1`, {
                headers: headers,
            })
            .then((response) => {
                setMini(response.data['hydra:member']);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
  

    const [showC, setShowC] = useState(false);
    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>Категории</h3>
                <div className="row row__custom">
                    <div className="acc__content">
                        
                                {category?.slice(0,3)?.map((c)=>{
                                    return(
                                        <a href={`/category/${c?.slug}-${c?.id}`} className="category__content">
                                            <img className='category__img_' src={`${c?.imagePath}`} alt="" />
                                            <p className='category__text'>{c?.name}</p>
                                        </a>
                                    )
                                })}

                               {mini?.slice(4,6)?.map((cc)=>{
                                return(
                                    <a href={`/category/${cc?.slug}-${cc?.id}`} className="category__content">
                                    <img className='category__img_' src={`${cc?.imagePath}`} alt="" />
                                    <p className='category__text'>{cc?.name}</p>
                                    </a>
                                )
                               })}
                               
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectronicTopCategories;
