import React, {
    useEffect,
    useState,
    useRef,
    useCallback
} from 'react';
import { useAppContext } from '../../context/appContext';

import { useWindowResize } from '../../utils/useResize';
import { getScreenBreakpoint } from '../../utils/utilHelper';

import './styles.scss';

export function TimelineBand() {
    const {
        timezonesSelected,
        timelineItemHovered,
        setTimelineItemHovered
    } = useAppContext();

    const bandRef = useRef(null);
    const [position, setPosition] = useState({
        left: 0,
        top: 0
    });
    const [bandHeight, setBandHeight] = useState(0);
    const screenSize = useWindowResize();
    const screenBreakpoint = getScreenBreakpoint(screenSize);

    useEffect(() => {
        const timelines = document.getElementsByClassName('timeline-wrapper');
        const [timeline] = timelines;
        const timelineItem = timeline.getElementsByClassName('timeline-item')[timelineItemHovered.index];
        const itemBoundingClient = timelineItem.getBoundingClientRect();

        let height = itemBoundingClient.height;
        if (timelines.length > 1) {
            const lastItem = timelines[timelines.length - 1];
            const lastItemBoundingClient = lastItem.getBoundingClientRect();

            const HEIGHT_BORDERS_COMPENSATION = 4;
            height = (lastItemBoundingClient.top - itemBoundingClient.top) +
                lastItemBoundingClient.height + HEIGHT_BORDERS_COMPENSATION;
        }
        setPosition({
            left: timelineItem.offsetLeft,
            top: timelineItem.offsetTop
        })
        setBandHeight(height);
    }, [
        timezonesSelected.length,
        timelineItemHovered,
        screenBreakpoint
    ]);

    const handleOnBandClickOutside = useCallback((event) => {
        if (bandRef && bandRef !== null) {
            const curr = bandRef.current;
            if (curr && !curr.contains(event.target)) {
                setTimelineItemHovered({
                    ...timelineItemHovered,
                    clicked: false
                });
            }
        }
    }, [
        setTimelineItemHovered,
        timelineItemHovered,
        bandRef
    ]);

    const handleOnBandClick = () => setTimelineItemHovered({
        ...timelineItemHovered,
        clicked: true
    });

    useEffect(() => {
        document.addEventListener('mousedown', handleOnBandClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleOnBandClickOutside);
        }
    }, [
        bandRef,
        handleOnBandClickOutside
    ]);

    return (
        <div
            ref={bandRef}
            className='time-line-band-wrapper'
            onClick={() => handleOnBandClick()}
            style={{
                left: `${position.left}px`,
                top: `${position.top}px`,
                height: `${bandHeight}px`
            }}>
        </div>
    );
}