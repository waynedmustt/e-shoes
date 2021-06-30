import React from 'react';
import { coreService } from '../../core/service';
import Navbar from '../navbar';
import TopHeader from '../top-header';

const Header = () => {
    return (
      <React.Fragment>
        {!coreService.isMobileDevice() &&
        <TopHeader />
        }
        <nav className={`navbar navbar-expand-md navbar-light fixed-top bg-navbar ${coreService.isMobileDevice() ? '' : 't-40'}`}
        style={{zIndex: 'unset', backgroundColor: '#ffffff'}}>
            <div className="container-fluid w-80">
                <a className="navbar-brand col" href="# " onClick={e => {e.preventDefault(); window.location.replace('/home')}}>
                    <img src={process.env.PUBLIC_URL + "/assets/img/header/nike.svg"} alt="nike" />
                </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <Navbar />
                </div>
            </div>
        </nav>
      </React.Fragment>
    );
}

export default Header;