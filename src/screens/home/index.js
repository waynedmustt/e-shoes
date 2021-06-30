import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../core/provider';
import {
    getShoes
} from '../../apis/shoes';
import ShoesList from '../../components/shoes-list';

const Home = () => {
    const [shoes, setShoes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);
    const globalStore = useContext(ThemeContext);

    useEffect(async () => {
        setIsLoading(true);
        const response = await getShoes();
        setIsLoading(false);
        if (!response?.data && response?.response?.data?.statusCode !== 200) {
            setError(response?.response?.data?.message);
            return;
        }

        if (response?.data?.shoes?.length === 0) {
            setError('data is not available');
            return;
        }

        setShoes(response?.data?.shoes);

        if (!globalStore || typeof globalStore === 'undefined') {
            return;
        }
        globalStore.toggleCartCount();
    }, [])

    return (
        <ThemeContext.Consumer>
            {({language}) => (
                <React.Fragment>
                    {error ? 
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div> : 
                        <ShoesList 
                        data={shoes}
                        loading={loading}
                        />
                    }
                </React.Fragment>
            )}
        </ThemeContext.Consumer>
    );
}

export default Home;