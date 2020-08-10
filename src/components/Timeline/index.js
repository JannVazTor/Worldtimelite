import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/appContext';
import { getTimeLineItemClassNameByHour } from './helper';
import { parseToTimezone } from '../TimeZoneTable/helper';

import './styles.scss';

export function Timeline({
    timezone,
    timelineItems
}) {
    const {
        timelineItemHovered,
        setTimelineItemHovered
    } = useAppContext();

    const renderTimelineItem = (hour, date) => {
        const isMidnight = hour === 0;
        if (isMidnight) {
            const month = date.format('MMM').toUpperCase();
            const day = date.format('D');
            return (
                <>
                    <small>{month}</small>
                    <small>{day}</small>
                </>
            );
        }
        const time = date.format('h');
        const meridiem = date.format('a');

        return (
            <>
                <span>{time}</span>
                <small>{meridiem}</small>
            </>
        );
    }

    const handleOnMouseEnter = index =>
        setTimelineItemHovered({ ...timelineItemHovered, index });

    const getInnerTimelineItemClassName = currentHour => {
        const className = ['timeline-item-container'];
        const itemClassName = getTimeLineItemClassNameByHour(currentHour);
        className.push(itemClassName);
        return className.join(' ');
    }

    return (
        <ul className='timeline-wrapper'>
            {timelineItems.map((timelineDate, index) => {
                const dateParsed = parseToTimezone(timelineDate, timezone);
                const currentHour = parseInt(dateParsed.format('H'));
                const innerItemClassName = getInnerTimelineItemClassName(currentHour);

                return (
                    <li key={`timeline-item-${index}`}
                        className='timeline-item'
                        onMouseEnter={() => handleOnMouseEnter(index)}>
                        <div className={innerItemClassName}>
                            {renderTimelineItem(currentHour, dateParsed)}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

Timeline.propTypes = {
    timezone: PropTypes.string,
    timelineItems: PropTypes.array
}