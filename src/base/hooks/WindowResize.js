import {useEffect, useLayoutEffect, useState} from 'react';

/**
 * Get windows size
 *
 * @returns {{width: number, height: number}}
 */
export function useWindowResize(effect = undefined) {

    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const handleWindowResize = () => {

        const result = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        setSize(result);

        if (effect !== undefined) {
            effect(result)
        }
    };

    useLayoutEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        setTimeout(function () { handleWindowResize() }, 50);
        setTimeout(function () { handleWindowResize() }, 150);
        setTimeout(function () { handleWindowResize() }, 300);
        setTimeout(function () { handleWindowResize() }, 600);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return size;
}
