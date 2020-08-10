import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import { WorldTimeZoneWidget } from '../../components/WorldTimeZoneWidget';

import './styles.scss';

export function Home() {
    return (
        <div className='home-wrapper'>
            <Container>
                <h1 className='home-title'>WorldtimeLite</h1>
                <Card className='world-time-wrapper' raised>
                    <WorldTimeZoneWidget />
                </Card>
            </Container>
        </div>
    );
}