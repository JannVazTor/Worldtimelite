import React from 'react';
import { mount } from 'enzyme';
import { TimeZoneTable } from '..';
import { AppContext } from '../../../context/appContext';
import { noop } from 'lodash';

const contextValues = {
    places: [],
    timezonesSelected: [],
    setTimezonesSelected: noop
}

describe('<TimeZoneTable />', function () {
    it('should render the component correctly', function () {
        const TestComponent = () => (
            <AppContext.Provider value={contextValues}>
                <TimeZoneTable />
            </AppContext.Provider>
        );
        const wrapper = mount(<TestComponent />);
        expect(wrapper).toHaveLength(1);
    });
});