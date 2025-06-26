import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Finance() {
    const finance = useSelector((state: RootState) => state.finance);
    const navigate = useNavigate();

    useEffect(() => {
        if (finance && finance.length > 0) {
            // Find the latest entry by year and month
            const latest = finance.reduce((a, b) => {
                if (a.year > b.year) return a;
                if (a.year < b.year) return b;
                return a.month > b.month ? a : b;
            });
            const id = `${String(latest.month).padStart(2, '0')}-${latest.year}`;
            navigate(`/finance/${id}`, { replace: true });
        }
    }, [finance, navigate]);

    return null;
}

export default Finance