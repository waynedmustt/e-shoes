import React, { useState } from 'react';
import {
    ThemeContext
} from '../../core/provider';

const TopHeader = () => {

    const choosenLang = {
        en: 'English',
        idn: 'Indonesia'
    }

    const changeLang = (e, toggleLanguage, lang) => {
        e.preventDefault();
        toggleLanguage(lang);
    }

    return (
        <ThemeContext.Consumer>
            {({language, toggleLanguage}) => (
               <React.Fragment>
                    <div className="px-2 py-2 bg-top-header f-12 fixed-top">
                        <div className="m-auto d-flex list">
                            <div className="btn-group col-3">
                                <button className="btn btn-secondary btn-sm dropdown-toggle btn-lang" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {choosenLang[language]}
                                </button>
                                <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="# " onClick={e => changeLang(e, toggleLanguage, 'en')}>English</a></li>
                                <li><a className="dropdown-item" href="# " onClick={e => changeLang(e, toggleLanguage, 'idn')}>Indonesia</a></li>
                                </ul>
                            </div>
                            <div className="d-flex col-3">
                                <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/header/car-shipper.svg"} alt="car-shipper" />
                                <div className="px-2">{'free shipping over $100 purchase'.toUpperCase()}</div>
                            </div>
                            <div className="d-flex col-3 w-23">
                                <div className="px-2">Shipping</div>
                                <div className="px-2">FAQ</div>
                                <div className="px-2">Contact</div>
                            </div>
                        </div>
                    </div>
                </React.Fragment> 
            )}
        </ThemeContext.Consumer>
    );
}

export default TopHeader;