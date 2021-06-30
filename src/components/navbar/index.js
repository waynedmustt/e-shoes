import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ThemeContext } from '../../core/provider';
import { coreService } from '../../core/service';

const Navbar = () => {
    const history = useHistory();
    const [menus, setMenus] = useState([]);

    const menuList = [
        {
            id: 'new-releases',
            title: 'New Releases',
            isActive: true,
            onClick: (e) => {
                e.preventDefault()
            }
        },
        {
            id: 'men',
            title: 'Men',
            isActive: false,
            onClick: (e) => {
                e.preventDefault()
            }
        },
        {
            id: 'women',
            title: 'Women',
            isActive: false,
            onClick: (e) => {
                e.preventDefault()
            }
        },
        {
            id: 'kids',
            title: 'Kids',
            isActive: false,
            onClick: (e) => {
                e.preventDefault()
            }
        },
        {
            id: 'customize',
            title: 'Customize',
            isActive: false,
            onClick: (e) => {
                e.preventDefault()
            }
        }
    ]
    useEffect(() => {
        setMenus(menuList);
    }, [])

    return(
        <ThemeContext.Consumer>
            {({cartCount}) => (
                <React.Fragment>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 f-600">
                        {menus.map((menu, i) => (
                            <li className={`nav-item ${menu.isActive ? 'active' : ''}`} key={i}>
                                <a className={`nav-link ${menu.isActive ? 'active' : ''}`} href="# " 
                                onClick={(e) => menu.onClick(e)}
                                >{menu.title}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex" style={{position: 'relative'}}>
                        {cartCount > 0 && 
                            <div className="circle cart-badge">
                                <div className="text-white text-center f-10">{cartCount > 9 ? 9 : cartCount}{cartCount > 9 ? '+' : ''}</div>
                            </div>
                        }
                        <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/header/bag.svg"} alt="bag" />
                        <img className="px-2" src={process.env.PUBLIC_URL + "/assets/img/header/user.svg"} alt="user" />
                    </div>
                </React.Fragment>
            )}
        </ThemeContext.Consumer>
    );
}

export default Navbar;