import React from 'react';
import { useHistory } from 'react-router-dom';

const ShoesList = (props) => {
    const { data, loading } = props;
    const history = useHistory();

    const openDetail = (e, shoe, shoeImgIdx) => {
        e.preventDefault();
        history.push({ pathname: '/detail/', state: { shoe: shoe, shoeImgIdx: shoeImgIdx } });
    }

    return (
        <React.Fragment>
            <div className="f-50 bold text-center my-5">New Releases</div>
            <div className="row align-items-center w-100 m-auto">
                {loading && <img className="spinner" src={process.env.PUBLIC_URL + `/assets/img/spinner.gif`} alt="spinner" />}
                {data.map((shoe, i) => (
                    <div className="col-lg-3 my-3" key={i}>
                        <div className="box">
                            <a href="# " onClick={(e) => openDetail(e, shoe, i + 1)}>
                                <img className="px-2 w-100 h-100" src={process.env.PUBLIC_URL + `/assets/img/shoes/${i + 1}.svg`} alt="shoes" />
                            </a>
                        </div>
                        <div className="f-18 pt-2">
                            <a className="d-flex space-between a-none" href="# " onClick={(e) => openDetail(e, shoe)}>
                                <div className="px-2">{shoe?.name?.toUpperCase()}</div>
                                <div className="px-2 f-400">${shoe?.price}</div>
                            </a>
                        </div>
                        <div className="f-14 py-2 px-2">{shoe?.category}</div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default ShoesList;