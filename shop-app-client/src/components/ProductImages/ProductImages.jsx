import React, { useState } from 'react';
import { Image, BigImage, ImageButtons, ImageButton, BigImageWrapper } from './ProductImages.styles';

const ProductImages = ({ photos }) => {
    const [activeImage, setActiveImage] = useState(photos?.[0]);

    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} />
            </BigImageWrapper>
            <ImageButtons>
                {photos?.map(image => (
                    <ImageButton
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}>
                        <Image src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}

export default ProductImages