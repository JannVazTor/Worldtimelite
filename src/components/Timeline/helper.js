import moment from 'moment';
import { TIMELINE_MAX_HOURS } from "../../constants"

export const getDayStyle = (hours) => {
    if (hours >= 8 && hours <= 17) {
        return '';
    }
    return '';
}

export const getTimeLineHours = (
    timezone,
    numberOfItems = TIMELINE_MAX_HOURS,
    currentDate = moment.utc()
) => {
    const results = [];
    const date = moment.tz(currentDate, timezone);
    for (let index = 1; index <= numberOfItems; index++) {
        results.push(date.add(1, 'hours').valueOf());
    }
    return results;
}

export const getTimeLineItemClassNameByHour = hour => {
    if (hour >= 8 && hour <= 17) {
        return 'day';
    } else if ((hour >= 6 && hour <= 7) || (hour >= 18 && hour <= 20)) {
        return 'sun-rise-down';
    } else if ((hour >= 0 && hour <= 5) || (hour >= 21 && hour <= 23)) {
        const className = ['night'];
        if (hour === 23) {
            className.push('almost-midnight');
        }
        if (hour === 0) {
            className.push('midnight');
        }
        return className.join(' ');
    }
    return '';
}