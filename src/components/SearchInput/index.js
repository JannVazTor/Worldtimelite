import React, { useState, useEffect } from 'react';
import { Grid, Search } from 'semantic-ui-react';
import { debounce, escapeRegExp, filter, take } from 'lodash';

import { TABLE_TIMEZONES_MAX_ROWS } from '../../config';
import { useAppContext } from '../../context/appContext';
import { SEARCH_TIMEZONE_PAGE_SIZE } from '../../constants'

import './styles.scss';

export function SearchInput() {
    const {
        places,
        timezonesSelected,
        setTimezonesSelected
    } = useAppContext();

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([]);

    const handleSearchChange = (e, { value }) => {
        setQuery(value);

        const timezones = places
            .map(({ country, city, province, timezone }, index) => ({
                index,
                title: `${country}, ${city} ${province}`,
                timezone,
                country,
                city,
                province
            }));

        if (value.length < 1) {
            return setQuery('');
        }

        const regex = new RegExp(escapeRegExp(value), 'i');
        const isMatch = result => regex.test(result.title);
        const resultsFiltered = filter(timezones, isMatch);
        setResults(take(resultsFiltered, SEARCH_TIMEZONE_PAGE_SIZE));
    }

    const handleResultSelect = (e, { result }) => {
        if (timezonesSelected.length < TABLE_TIMEZONES_MAX_ROWS) {
            setQuery(result.title);
            const timeZoneSelected = timezonesSelected
                .find(tz => tz.city === result.city);
                
            if (!timeZoneSelected) {
                setTimezonesSelected([...timezonesSelected, result]);
            }
        }
    };

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column computer={5} tablet={8} mobile={16}>
                    <Search
                        icon={false}
                        value={query}
                        results={results}
                        className='search-input-wrapper'
                        placeholder='Find place or timezone - Press ⏎'
                        onResultSelect={handleResultSelect}
                        onSearchChange={debounce(handleSearchChange, 500, {
                            leading: true,
                            trailing: false
                        })}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}