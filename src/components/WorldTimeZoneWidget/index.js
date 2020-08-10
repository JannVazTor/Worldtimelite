import React from 'react';
import { AppContextComponent } from '../../context/appContext';

import { SearchInput } from '../SearchInput';
import { TimeZoneTable } from '../TimeZoneTable';

import places from '../../data/places.json'

export function WorldTimeZoneWidget() {
    return (
        <AppContextComponent value={{ places }}>
            <>
                <SearchInput />
                <TimeZoneTable />
            </>
        </AppContextComponent>
    );
}