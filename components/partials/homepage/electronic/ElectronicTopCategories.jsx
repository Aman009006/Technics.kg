import React, { Component, useState ,useEffect } from 'react';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'
import { config } from '~/config';


function ElectronicTopCategories() {

    const [category, setCategor] = useState();
    
    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };

        axios
            .get(`${config.mainUrl}categories/by-parent?page=1&itemsPerPage=30&parent.id=52`, {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data["hydra:member"]);
                console.log(response.data["hydra:member"]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    console.log(category);

    const [showC, setShowC] = useState(false);
    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>Категории</h3>
                <div className="row row__custom">
                    <div className="acc__content">
                        {category?.map((c) => {
                            return (
                               <>
                                <a href={`/category/${c.slug}-${c.id}`} className="category__content">
                                    <img className='category__img_' src={`${c.imageUrl}`} alt="" />
                                    <p className='category__text'>{c.name}</p>
                                </a>
                            
                               </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectronicTopCategories;
