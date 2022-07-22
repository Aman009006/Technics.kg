import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';

function Delivery() {
    return (
        <PageContainer>
            <div className="container uper">
                <div className="about__title">
                    <h2>Доставка</h2>
                    <p>
                    1. При заказе товара свыше 12000 сом доставка по городу бесплатная


                    </p>
                    <br />
                    <p>
                    2. При заказе товара до 12000 сом доставка платная 140-200 сом в зависимости от расстояния

                    </p>
                    <br />
                    <p>
                        3. По регионам Кыргызстана 250 сом до 5 кг, каждый последующий кг 50 сом

                    </p>
                </div>
            {/* <img src="/images/amazon.jpg" alt="" /> */}
            </div>
        </PageContainer>
    );
}
export default Delivery;
