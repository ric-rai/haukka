/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Locations } from './Locations';
import type { Metadata } from './Metadata';
import type { ObservationTypes } from './ObservationTypes';

export type Observatory = {
    name: string;
    metadata: Metadata;
    actions: Array<{
        actions?: Array<string>;
        type?: 'TickBox' | 'Numeric';
    }>;
    locations: Locations;
    observationTypes: ObservationTypes;
};

