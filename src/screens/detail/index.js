import React, { useEffect, useState, useContext } from 'react';
import ModalVideo from 'react-modal-video';
import Size from '../../components/size';
import Color from '../../components/color';
import { coreService } from '../../core/service';
import { ThemeContext } from '../../core/provider';

const ShoeDetail = (props) => {
    const {
        location,
        history
    } = props;
    const [shoe, setShoe] = useState({});
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [shoeImg, setShoeImg] = useState('');
    const [error, setError] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const globalStore = useContext(ThemeContext);

    useEffect(() => {
        if (!location?.state) {
            return;
        }

        setShoe(location?.state.shoe || {});
        setShoeImg(location?.state.shoeImgIdx || '')
        if (!globalStore || typeof globalStore === 'undefined') {
            return;
        }
        globalStore.toggleCartCount();
    }, [])

    const goToCart = (e, toggleCartCount) => {
        e.preventDefault();
        setError('');
        if (!selectedSize || !selectedColor) {   
            setError('select size or color');
            return;
        }

        let newShoe = shoe;
        const newShoeName = newShoe.name;
        if (newShoe.colors) {
            delete newShoe.colors
        }
        if (newShoe.sizes) {
            delete newShoe.sizes
        }
        if (newShoe.name) {
            delete newShoe.name
        }
        newShoe.color = selectedColor;
        newShoe.size = selectedSize;
        newShoe['img'] = shoeImg;
        newShoe['shoeName'] = newShoeName
        let cart = [];
        if (coreService.getObjectItem('cart')) {
            const existingCart = coreService.getObjectItem('cart');
            if (existingCart?.data?.length === 0) {
                return;
            }

            coreService.removeItem('cart')
            cart.push(
                ...existingCart?.data,
            );
        }


        cart.push(newShoe)
        coreService.setObjectItem('cart', {data: cart});
        toggleCartCount();
        history.push('/cart');
    }

    return (
        <ThemeContext.Consumer>
            {({toggleCartCount}) => (
                <React.Fragment>
                    <div className="row my-5">
                        <div className="col-lg-6 left">
                            <div className="box">
                                <img className="px-2 w-100 h-100" src={process.env.PUBLIC_URL + `/assets/img/shoes/${shoeImg}.svg`} alt="shoes" />
                            </div>
                            <div className="mt-2">
                                <div className="d-flex w-100">
                                    <img className="px-2 col-4 w-20-5" src={process.env.PUBLIC_URL + `/assets/img/shoe-detail/sub-img-1.svg`} alt="sub-img" />
                                    <img className="px-2 col-4 w-20-5" src={process.env.PUBLIC_URL + `/assets/img/shoe-detail/sub-img-2.svg`} alt="sub-img" />
                                    <img className="px-2 col-4 w-20-5" src={process.env.PUBLIC_URL + `/assets/img/shoe-detail/sub-img-3.svg`} alt="sub-img" />
                                    <img className="px-2 col-4 w-20-5" src={process.env.PUBLIC_URL + `/assets/img/shoe-detail/sub-img-4.svg`} alt="sub-img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 content mt-5">
                            <div className="f-16">{shoe?.category?.toUpperCase()}</div>
                            <div className="f-50 f-700">{shoe?.name?.toUpperCase()}</div>
                            <div className="f-18">{shoe?.description}</div>
                            <div className="mt-4 d-flex align-items-center">
                                <a className="pr-2" href="# " onClick={e => {
                                    e.preventDefault();
                                    setIsOpenVideo(true);
                                }}>
                                    <img src={process.env.PUBLIC_URL + `/assets/img/shoe-detail/play.svg`} alt="play" />
                                </a>
                                <div className="px-2 f-20">{'Play Video'.toUpperCase()}</div>
                            </div>
                            <div className="mt-4 f-18">{'Select Size (US)'.toUpperCase()}</div>
                            <Size
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize} 
                            sizes={shoe?.sizes}
                            />
                            <div className="mt-4 f-18">{'Select Color'.toUpperCase()}</div>
                            <Color
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            colors={shoe?.colors}
                            />
                        </div>
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        <div className="mt-4 detail-footer">
                            <div className="d-flex flex-row space-between py-4">
                                <div className="d-flex align-items-center">
                                    <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/header/car-shipper.svg"} alt="car-shipper" />
                                    <div className="px-2 f-12">{'free shipping over $100 purchase'.toUpperCase()}</div>
                                </div>
                                <a href="# " className="px-2 a-none" onClick={e => goToCart(e, toggleCartCount)}>
                                    <div className="d-flex align-items-center px-2 py-2 text-white bold" style={{backgroundColor: '#000000'}}>
                                        <div className="px-2">{'Add to Bag'.toUpperCase()}</div>
                                        <div className="px-2">-</div>
                                        <div className="px-2">${shoe?.price}</div>
                                        <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/arrow-right.svg"} alt="arrow right" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ModalVideo channel='custom' autoplay isOpen={isOpenVideo} url={shoe?.video} onClose={() => setIsOpenVideo(false)} />
                </React.Fragment>
            )}
        </ThemeContext.Consumer>
    );
}

export default ShoeDetail;