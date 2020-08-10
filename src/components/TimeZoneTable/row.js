import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Icon,
    Button
} from 'semantic-ui-react';
import { useAppContext } from '../../context/appContext';
import { Timeline } from '../Timeline';
import {
    abbreviate,
    formatTimezone,
    parseToTimezone,
    shortTimeFormat,
    getTimezoneDiffInHours
} from './helper';
import { SCREEN_BREAKPOINTS } from '../../constants';
import { getTimeLineHours } from '../Timeline/helper';
import { useWindowResize } from '../../utils/useResize';
import { getScreenBreakpoint } from '../../utils/utilHelper';
import { TimelineBand } from '../TimelineHoverBand';

export function TimeZoneRow({
    rowIndex,
    index,
    timezone,
    country,
    city
}) {
    const {
        homeTimeZone,
        timezonesSelected,
        timelineItemHovered,
        setTimezonesSelected
    } = useAppContext();

    const windowSize = useWindowResize();
    const screenBreakpoint = getScreenBreakpoint(windowSize);
    const [timelineItems, setTimelineItems] = useState(
        getTimeLineHours(
            timezone,
            timelineItemsByScreenBreakpoint(screenBreakpoint)
        )
    );
    const [currentDate, setCurrentDate] = useState(timelineItems[0]);

    useEffect(() => {
        setTimelineItems(getTimeLineHours(
            timezone,
            timelineItemsByScreenBreakpoint(screenBreakpoint)
        ));
    }, [screenBreakpoint]);

    const renderHoursDiffButton = (homeTimeZone) => {
        if (!homeTimeZone) return null;
        if (homeTimeZone.index === index) {
            return (<Button circular icon='home' className='home-button' />);
        }
        const diffInHours = getTimezoneDiffInHours(homeTimeZone.timezone, timezone);
        return (
            <Button className='date-hours-diff-button' circular>
                <span>{diffInHours}</span>
            </Button>
        );
    };

    const onDelete = index => {
        setTimezonesSelected([
            ...timezonesSelected.slice(0, index),
            ...timezonesSelected.slice(index + 1)
        ]);
    };

    const renderCurrentTimeFormatted = (
        {
            index,
            clicked: showItemSelected
        },
        timelineItems,
        timezone,
        currentDate
    ) => {
        const abbreviation = abbreviate(timezone);

        if (showItemSelected) {
            const dateSelected = timelineItems[index];
            const date = parseToTimezone(dateSelected, timezone);
            const leftDate = shortTimeFormat(date);
            const endDate = date.add(1, 'hours');
            const rightDate = shortTimeFormat(endDate);
            return (
                <div className='timeline-date-range'>
                    <p>
                        <span>{leftDate}</span>
                        <br />
                        <small>{formatTimezone(timezone, date)}</small>
                    </p>
                    <span> <b>-</b> </span>
                    <p>
                        <span>{rightDate}</span>
                        <br />
                        <small>{formatTimezone(timezone, endDate)}</small>
                    </p>
                </div>
            )
        }
        const timezoneFormatted = formatTimezone(timezone, currentDate);
        const timeFormatted = formatTimezone(timezone, currentDate, 'h:mma');
        return (
            <p className='timeline-single-date'>
                <b>{timeFormatted} {abbreviation}</b>
                <br />
                <small>{timezoneFormatted}</small>
            </p>
        )
    };

    function timelineItemsByScreenBreakpoint(screenBreakpoint) {
        // eslint-disable-next-line default-case
        switch (screenBreakpoint) {
            case SCREEN_BREAKPOINTS.LG:
                return 17;
            case SCREEN_BREAKPOINTS.MD:
                return 13;
            case SCREEN_BREAKPOINTS.SM:
                return 13;
            case SCREEN_BREAKPOINTS.XS:
                return 9;
        }
    };

    const handleOnNextDayChange = () => {
        const dateNextDay = parseToTimezone(currentDate, timezone)
            .add(1, 'days');

        const newTimelineItems = getTimeLineHours(
            timezone,
            timelineItemsByScreenBreakpoint(screenBreakpoint),
            dateNextDay
        );
        setCurrentDate(dateNextDay.valueOf());
        setTimelineItems(newTimelineItems);
    };

    return (
        <Grid.Row columns={1}>
            <Grid.Column
                computer={1}
                tablet={1}
                mobile={3}>
                <Icon link name='trash' onClick={() => onDelete(rowIndex)} />
            </Grid.Column>
            <Grid.Column
                computer={1}
                tablet={1}
                mobile={3}>
                {renderHoursDiffButton(homeTimeZone)}
            </Grid.Column>
            <Grid.Column textAlign='left'
                computer={2}
                tablet={2}
                mobile={5}>
                <p className='place-formatted'>
                    <b>{city}</b>
                    <br />
                    {country}
                </p>
            </Grid.Column>
            <Grid.Column textAlign='right'
                computer={2}
                tablet={2}
                mobile={5}>
                {renderCurrentTimeFormatted(timelineItemHovered, timelineItems, timezone, currentDate)}
            </Grid.Column>
            <Grid.Column
                computer={9}
                tablet={9}
                mobile={16} className='timeline-row'>
                <Timeline timezone={timezone} timelineItems={timelineItems} />
                {timezonesSelected.length > 0 && rowIndex === 0 && <TimelineBand />}
                <Icon name='angle right' size='large' className='timeline-next-item-arrow' onClick={() => handleOnNextDayChange()} />
            </Grid.Column>
        </Grid.Row>
    );
}

TimeZoneRow.propTypes = {
    rowIndex: PropTypes.number,
    index: PropTypes.string,
    timezone: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string
}