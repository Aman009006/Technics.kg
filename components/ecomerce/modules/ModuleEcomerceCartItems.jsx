import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import axios from 'axios';
import { config } from '~/config';

const ModuleEcomerceCartItems = ({ ecomerce, cartItems, getProducts }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    useEffect(() => {
        setMyProducts(cartItems);
    });

    const [myProducts, setMyProducts] = useState();

    function handleRemoveItem(item) {
        let authToken = localStorage.getItem('authToken');
        if (authToken === null) {
            setShow(true);
        }
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: item.product.id,
                count: 0,
            },
        };

        axios(options)
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
        getProducts();
    }

    function handleIncreaseItemQty(e, productId) {
        e.preventDefault();
        increaseQty({ id: productId }, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        decreaseQty({ id: productId }, ecomerce.cartItems);
    }

    function plusCount(item) {
        let count = item?.count + 1;

        let authToken = localStorage.getItem('authToken');
        if (authToken === null) {
            setShow(true);
        }
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: item.product.id,
                count: count,
            },
        };

        axios(options)
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
        //     // location.reload()
        getProducts();
    }
    function minusCount(item) {
        let count = item?.count - 1;

        let authToken = localStorage.getItem('authToken');
        if (authToken === null) {
            setShow(true);
        }
        const options = {
            url: `${config.mainUrl}cart`,
            method: 'POST',
            headers: {
                'api-token': config.apiToken,
                'user-token': authToken,
            },
            data: {
                productId: item.product.id,
                count: count,
            },
        };

        axios(options)
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
        //     // location.reload()
        getProducts();
    }

    // View
    let cartItemsViews;
    if (myProducts && myProducts.length > 0) {
        const items = myProducts?.map((item, index) => {
            // setCountPr(item?.product.count)

            return (
                <tr key={item?.id}>
                    <td>
                        <ProductCart product={item?.product} />
                    </td>
                    <td data-label="Цена" className="price">
                        {item?.product.price} сом
                    </td>
                    <td data-label="Количество">
                        <div className="form-group--number count__sort">
                            <div
                                className="btn__cort_"
                                onClick={() => minusCount(item)}>
                                -
                            </div>
                            {item?.count}
                            <div
                                className="btn__cort_"
                                onClick={() => plusCount(item)}>
                                +
                            </div>
                        </div>
                    </td>
                    <td data-label="Итого">
                        <strong>{item?.product.price * item?.count} сом</strong>
                    </td>
                    <td>
                        <a href="#" onClick={(e) => handleRemoveItem(item)}>
                            <i className="icon-cross"></i>
                        </a>
                    </td>
                </tr>
            );
        });

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Итого</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = <Result status="warning" title="Корзина пуста" />;
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
