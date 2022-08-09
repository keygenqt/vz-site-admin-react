import {useEffect, useRef} from 'react';

export function useScriptRef() {
    const scripted = useRef(true);
    useEffect(
        () => () => {
            scripted.current = false;
        }, []);
    return scripted;
}