import React, { useState, useEffect } from 'react';
import ProductGroupDealOfDay from '~/components/partials/product/ProductGroupDealOfDay';
import ElectronicProductGroupWithCarousel from '~/components/partials/homepage/electronic/ElectronicProductGroupWithCarousel';
import HotSale from '~/components/partials/homepage/electronic/HotSale';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import ElectronicPromotions2 from '~/components/partials/homepage/electronic/ElectronicPromotions2';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import PageContainer from '~/components/layouts/PageContainer';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '~/components/shared/headers/HeaderMobileElectronic';
import FooterSecond from '~/components/shared/footers/FooterSecond';
import axios from 'axios';
import { config } from '~/config';
import ShopBanner from '~/components/partials/shop/ShopBanner';

const HomeElectronicsPage = () => {
    const [category, setCategor] = useState();
    const [firstBanner, setFirstBanner] = useState();
    const [secondBanner, setSecondtBanner] = useState();



    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };

        axios
            .get(`${config.mainUrl}main/page`, {
                headers: headers,
            })
            .then((response) => {
                setCategor(response.data["hydra:member"][1].data.slice(0, 4));
                setSecondtBanner('/static/2.jpg')
                setFirstBanner('/static/3.jpeg');
                setThreeBanner('/static/1.jpg');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const headers = (
        <>
            <HeaderElectronic />
            <HeaderMobileElectronic />
        </>
    );

    const footer = <FooterSecond classes="ps-footer" />;

    const [cards, setCards] = useState();
    const [electronic, setElectronics] = useState();
    const [PCtech, setPCtch] = useState();
    const [clothes, setClothes] = useState();
    const [threeCategory, setThreeCategory] = useState();
    const [fourCategory, setFourCategory] = useState();

    const [threeBanner,setThreeBanner]=useState()

    useEffect(() => {
        const headers = {
            'api-token': config.apiToken
        };
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=1`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setPCtch(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=67`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setClothes(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=112`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setThreeCategory(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&category=152`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setFourCategory(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });


        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&order%5BcreatedAt%5D=desc`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setElectronics(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(
                `${config.mainUrl}products?page=1&itemsPerPage=30&order%5BviewCount%5D=desc`,
                {
                    headers: headers
                }
            )
            .then((response) => {
                setCards(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <PageContainer title="Technics.kg">
            <main id="homepage-7">
                <div className="container mt-25 mb-25">
                <ShopBanner urlImg={firstBanner} />
                </div>
                <ElectronicTopCategories category={category} />
                {/* <ProductGroupDealOfDay
                    categorySlug="computers-and-technologies"
                    boxed={true}
                /> */}
                <HotSale
                    collectionSlug="electronics-best-sellers"
                    title="Популярные"
                    links={cards}
                />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronic_computer_technology"
                    title="Новинки"
                    links={electronic}
                />
                <ElectronicPromotions2 urlImg={secondBanner} />

                <ElectronicProductGroupWithCarousel
                    categorySlug="consumer-electrics"
                    title="Электроника"
                    links={PCtech}
                />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-cameras-and-videos"
                    title="Бытовая техника"
                    links={clothes}
                />
                <ElectronicPromotions2 urlImg={threeBanner} />
                <ElectronicProductGroupWithCarousel
                    categorySlug="consumer-electrics"
                    title="Компьютерная техника"
                    links={threeCategory}
                />
                <ElectronicProductGroupWithCarousel
                    collectionSlug="electronics-cameras-and-videos"
                    title="Строительство и ремонт"
                    links={fourCategory}
                />

                {/* <SiteFeatures /> */}
            </main>
        </PageContainer>
    );
};

export default HomeElectronicsPage;
