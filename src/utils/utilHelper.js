import { SCREEN_BREAKPOINTS } from "../constants";

export const getScreenBreakpoint = ({ width }) => {
	if (width <= 575) return SCREEN_BREAKPOINTS.XS;
	if (width >= 576 && width <= 767) return SCREEN_BREAKPOINTS.SM;
	if (width >= 768 && width <= 991) return SCREEN_BREAKPOINTS.MD;
	if (width >= 992 && width <= 1199) return SCREEN_BREAKPOINTS.LG;
	return SCREEN_BREAKPOINTS.XL;
};