import React from 'react';
import { shallow } from 'enzyme';
import { WorldTimeZoneWidget } from '..';

describe('<WorldTimeZoneWidget />', function () {
    it('should render the component correctly', function () {
        const wrapper = shallow(<WorldTimeZoneWidget />);
        expect(wrapper).toHaveLength(1);
    })
})