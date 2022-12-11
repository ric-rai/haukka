/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location_HangonLintuasema } from './Location_HangonLintuasema';
import type { Metadata } from './Metadata';
import type { ObservationType_HangonLintuasema } from './ObservationType_HangonLintuasema';

export type HangonLintuasema = {
    name: HangonLintuasema.name;
    metadata: Metadata;
    actions: {
        tickBox: Array<'standardObs' | 'gåu' | 'standardRing' | 'owlStandard' | 'mammals'>;
        numeric: Array<'attachments'>;
    };
    locations: Array<Location_HangonLintuasema>;
    observationTypes: Array<ObservationType_HangonLintuasema>;
};

export namespace HangonLintuasema {

    export enum name {
        HANGON_LINTUASEMA = 'Hangon_Lintuasema',
    }


}

