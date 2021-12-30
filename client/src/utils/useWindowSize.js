import React from "react";
import config from 'react-global-configuration';

/**
 * Custom React hook to handle the window resize event
 * @returns Current Window Size
 */
function useWindowSize() {
    const blockSize = config.get('blockSize');
    const [windowSize, setWindowSize] = React.useState({
        width: Math.floor(window.innerWidth / blockSize),
        height: Math.floor(window.innerHeight / blockSize)
    });
    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: Math.floor(window.innerWidth / blockSize),
                height: Math.floor(window.innerHeight / blockSize)
            })
        }
        window.addEventListener("resize", handleResize)
        return _ => {
            window.removeEventListener("resize", handleResize);
        }
    });

    return windowSize;
}

export default useWindowSize;