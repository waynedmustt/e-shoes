import React from 'react';

const Color = (props) => {
    const { colors, setSelectedColor, selectedColor } = props;

    const selectColor = (e, color) => {
        e.preventDefault();
        setSelectedColor(color?.color_hash);
    }

    const border = {
        ['#AA6159']: '#000000',
        ['#272425']: '#6c757d',
        ['#6389CB']: '#000000',
        ['#F2C758']: '#000000',
    }
    return (
        <React.Fragment>
            <div className="mt-3 d-flex flex-row">
                {colors?.map((color, i) => (
                    <div className="px-2 py-2" key={i}>
                        <a href="# " className="a-none" onClick={e => selectColor(e, color)}>
                            <div className={`circle d-flex align-items-center`}
                            style={{
                                backgroundColor: color?.color_hash,
                                border: selectedColor === color?.color_hash ? `3px solid ${border[selectedColor] ?? '#00000'}` : 'unset'
                            }}
                            ></div>
                        </a>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default Color;