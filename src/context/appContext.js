import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

const AppContext = createContext();

const AppContextComponent = ({
    children,
    value
}) => {
    const [homeTimeZone, setHomeTimeZone] = useState(null);
    const [timezonesSelected, setTimezonesSelected] = useState([]);
    const [timelineItemHovered, setTimelineItemHovered] = useState({
        index: 0,
        clicked: false
    });

    const state = {
        homeTimeZone,
        setHomeTimeZone,
        timezonesSelected,
        timelineItemHovered,
        setTimezonesSelected,
        setTimelineItemHovered
    };

    useEffect(() => {
        if (timezonesSelected.length) {
            const [timezoneSelected] = timezonesSelected;
            setHomeTimeZone(timezoneSelected);
        }
    }, [timezonesSelected, setHomeTimeZone]);

    return (
        <AppContext.Provider value={{ ...state, ...value }}>
            {children}
        </ AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext or AppContext.Consumer cannot be rendered outside the AppContext.Provider components');
    }

    return context;
};

export {
    useAppContext,
    AppContextComponent
}