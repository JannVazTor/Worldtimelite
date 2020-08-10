import React from 'react';
import { mount } from 'enzyme';
import { SearchInput } from '..';
import { AppContext } from '../../../context/appContext';
import places from '../../../data/places.json'
import { act } from 'react-dom/test-utils';

const contextValues = {
    places,
    timezonesSelected: { index: 0, clicked: false },
    setTimezonesSelected: []
}

describe('<SearchInput />', function () {
    it('should render the component correctly', function () {
        const TestComponent = () => (
            <AppContext.Provider value={contextValues}>
                <SearchInput />
            </AppContext.Provider>
        );
        const wrapper = mount(<TestComponent />);
        expect(wrapper).toHaveLength(1);
    });

    it('should load the place that matches with the search criteria', function () {
        contextValues.setTimezonesSelected = jest.fn();
        const TestComponent = () => (
            <AppContext.Provider value={contextValues}>
                <SearchInput />
            </AppContext.Provider>
        );

        const element = mount(<TestComponent />);
        const wrapper = element.find(SearchInput);

        act(() => {
            const input = wrapper.find('input').first();
            input.props().onChange({
                target: {
                    value: 'Hermosillo'
                },
                stopPropagation: jest.fn()
            });
            input.simulate('change');
        });

        const results = wrapper.find('.results').children();
        expect(results).toHaveLength(1);
    });
});