/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location_JurmonLintuasema } from './Location_JurmonLintuasema';
import type { Metadata } from './Metadata';
import type { ObservationType_JurmonLintuasema } from './ObservationType_JurmonLintuasema';

export type JurmonLintuasema = {
    name: JurmonLintuasema.name;
    metadata: Metadata;
    actions: {
        tickBox: Array<'standardObs' | 'gåu' | 'standardRing' | 'owlStandard' | 'mammals'>;
        numeric: Array<'attachments'>;
    };
    locations: Array<Location_JurmonLintuasema>;
    observationTypes: Array<ObservationType_JurmonLintuasema>;
};

export namespace JurmonLintuasema {

    export enum name {
        JURMON_LINTUASEMA = 'Jurmon_Lintuasema',
    }


}

