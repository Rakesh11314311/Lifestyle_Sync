import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Finance() {
    const navigate = useNavigate();
    // const finance = useSelector((state: RootState) => state.finance);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (finance && finance.length > 0) {
    //         // Find the latest entry by year and month
    //         const latest = finance.reduce((a, b) => {
    //             if (a.year > b.year) return a;
    //             if (a.year < b.year) return b;
    //             return a.month > b.month ? a : b;
    //         });
    //         const id = `${String(latest.month).padStart(2, '0')}-${latest.year}`;
    //         navigate(`/finance/${id}`, { replace: true });
    //     }
    // }, [finance, navigate]);


    //the following once on first render
    useEffect(() => {
        axios.get('http://localhost:5000/finance/latest')
            .then(res => {
                if (res.data) {
                    navigate(`/finance/${res.data.month}-${res.data.year}`);
                } else {
                    navigate('/finance/add', { state: { header: 'Get Started by adding your first finance data' } });
                }
            })
            .catch(err => console.log(err))
    }, []);

    return null;
}

export default Finance