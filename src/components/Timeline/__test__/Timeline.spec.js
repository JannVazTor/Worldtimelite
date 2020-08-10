import React from 'react';
import { mount } from 'enzyme';
import { Timeline } from '..';
import { AppContext } from '../../../context/appContext';
import places from '../../../data/places.json';
import { noop } from 'lodash';

const contextValues = {
    places,
    timezonesSelected: { index: 0, clicked: false },
    setTimelineItemHovered: noop,
    setTimezonesSelected: []
}

const props = {
    timezone: 'America/Monterrey',
    timelineItems: [
        new Date().getTime(),
        new Date(new Date().getTime() + (1000 * 60 * 60))
    ]
}

describe('<Timeline />', function () {
    it('should render the component correctly', function () {
        const TestComponent = () => (
            <AppContext.Provider value={contextValues}>
                <Timeline {...props} />
            </AppContext.Provider>
        );
        const wrapper = mount(<TestComponent />);
        expect(wrapper).toHaveLength(1);
    });

    it('should call to the setTimelineItemHovered when hovered over any timeline item', function () {
        contextValues.setTimelineItemHovered = jest.fn();
        const TestComponent = () => (
            <AppContext.Provider value={contextValues}>
                <Timeline {...props} />
            </AppContext.Provider>
        );
        const wrapper = mount(<TestComponent />);
        const secondTimelineItem = wrapper.find('.timeline-item').at(1);
        secondTimelineItem.simulate('mouseenter');
        expect(contextValues.setTimelineItemHovered).toHaveBeenCalled();
    });
})