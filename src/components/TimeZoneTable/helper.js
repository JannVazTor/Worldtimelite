import moment from 'moment-timezone';

export const getTimezoneDiffInHours = (timezone, targetTimezone) => {
    const now = moment.utc();
    const timezoneOffset = moment.tz.zone(timezone).utcOffset(now);
    const targetTimezoneOffset = moment.tz.zone(targetTimezone).utcOffset(now);
    return (timezoneOffset - targetTimezoneOffset) / 60;
}

export const abbreviate = timezone =>
    moment.tz(moment.utc(), timezone).format('z');

export const parseToTimezone = (date, timezone) =>
    moment.tz(date, timezone)

export const formatTimezone = (timezone, date = null, format = 'ddd, MMM D') =>
    moment.tz(date ? date : moment.utc(), timezone).format(format)

export const removeLastCharacter = str => str.substring(0, str.length - 1);

export const shortTimeFormat = (date, hours = 0) => {
    date = hours ? date.add(hours, 'hours') : date;
    const dateFormatted = `${date.format('h')}:00${date.format('a')}`;
    return removeLastCharacter(dateFormatted);
}
