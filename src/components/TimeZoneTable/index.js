import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useAppContext } from '../../context/appContext';
import { TimeZoneRow } from './row';

import './styles.scss';

export function TimeZoneTable() {
    const { timezonesSelected } = useAppContext();
    return (
        <Grid doubling verticalAlign='middle' className='timezone-table-wrapper'>
            {timezonesSelected.map((timezoneItem, index) =>
                <TimeZoneRow
                    key={`time-zone-row-${index}`}
                    rowIndex={index}
                    {...timezoneItem}
                />)
            }
        </Grid>
    );
}