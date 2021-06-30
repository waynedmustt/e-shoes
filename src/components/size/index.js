import React from 'react';

const Size = (props) => {
    const { sizes, setSelectedSize, selectedSize } = props;

    const selectSize = (e, size) => {
        e.preventDefault();
        setSelectedSize(size);
    }
    return (
        <React.Fragment>
            <div className="mt-3 d-flex flex-row">
                {sizes?.map((size, i) => (
                    <div className="px-2 py-2" key={i}>
                        <a href="# " className="a-none" onClick={e => selectSize(e, size)}>
                            <div className={`square d-flex align-items-center${selectedSize === size ? ' active' : ''}`}>
                                <div className="m-auto">{size}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default Size;