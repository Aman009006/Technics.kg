import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';

const Product = ({ product }) => {
    const { thumbnailImage, price, badge, title } = useProduct();
    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.slug}`} as={`/product/${product.slug}`}>
                    <a>{product.imagePath ? <img className='category__img_main' src={product.imagePath} alt={product.name} /> : <img className='category__img_main' src='/images/photo.jpeg'/>}</a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                {/* <Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link> */}
                <div className="ps-product__content">
                                 {title(product)}

                    <div className="ps-product__rating">
                        <Rating rating={product.rating} />
                        <span>{product.rating ? product.rating : "0"}</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
