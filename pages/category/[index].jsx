import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import Newletters from '~/components/partials/commons/Newletters';
import axios from 'axios';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import CategoryContent from './CategoryContent';
import { config } from '~/config';

const ShopDefaultPage = () => {
    const router = useRouter();
    const category = router.query.index;
    const categoryId = Number(category?.replace(/\D+/g, ''));
    const [podProd, setPodProd] = useState();
    const [products, setProducts] = useState();
    const [countCard, setCountCard] = useState(30);

    const headers = {
        'api-token': config.apiToken,
    };

    useEffect(() => {
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=${countCard}&category=${categoryId}`,
                {
                    headers: headers,
                }
            )
            .then((response) => {
                setProducts(response?.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
            categoryId > 0 && ( axios
            .get(
                `${config.mainUrl}by-parent/categories?page=1&itemsPerPage=30&parent.id=${categoryId}`,
                {
                    headers: headers,
                }
            )
            .then((response) => {
                setPodProd(response.data['hydra:member']);
                console.log(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            }))

        setSecondtBanner('/static/2.jpg');
    }, [categoryId]);

    const [secondBanner, setSecondtBanner] = useState();

    const breadCrumb = [
        {
            text: 'Главная',
            url: '/',
        },
        {
            text: 'Категории',
        },
    ];

    return (
        <PageContainer>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    <ShopBanner urlImg={secondBanner} />
                    <div className="acc__content categoty__page">
                        {podProd?.map((c) => {
                            return (
                                <a
                                    href={`/category/${c.slug}${c.id}`}
                                    className="category__content">
                                    <p className="category__text">{c.name}</p>
                                    <img
                                        className="category__img_"
                                        src={`${c.imagePath}`}
                                        alt=""
                                    />
                                </a>
                            );
                        })}
                    </div>
                    <h2 className="categories__title">Товары по категории</h2>
                    <div className="ps-layout--shop">
                        <div className="ps-layout__right">
                            <CategoryContent products={products} />
                            <div className="count__btn_plus">
                                <button
                                    className="onenore__btn"
                                    onClick={() =>
                                        setCountCard(countCard + 17)
                                    }>
                                    Показать еще
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ShopDefaultPage;
