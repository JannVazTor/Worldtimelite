import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

export function useWindowResize(debounce_timer = 1000) {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});
	useEffect(() => {
		const debounceHandleResize = debounce(function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth
			});
		}, debounce_timer);
		window.addEventListener('resize', debounceHandleResize, false);
		return () => {
			window.removeEventListener('resize', debounceHandleResize, false);
		};
	}, []);
	return dimensions;
}