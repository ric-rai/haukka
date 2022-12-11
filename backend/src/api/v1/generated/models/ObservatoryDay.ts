/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location_HangonLintuasema } from './Location_HangonLintuasema';
import type { Location_JurmonLintuasema } from './Location_JurmonLintuasema';
import type { ObservationType_HangonLintuasema } from './ObservationType_HangonLintuasema';
import type { ObservationType_JurmonLintuasema } from './ObservationType_JurmonLintuasema';
import type { ObservatoryDayBase } from './ObservatoryDayBase';

export type ObservatoryDay = (({
    observatory: ObservatoryDay.observatory;
    periods: Array<{
        type: ObservationType_HangonLintuasema;
        location: Location_HangonLintuasema;
    }>;
} & ObservatoryDayBase) | ({
    observatory: ObservatoryDay.observatory;
    periods: Array<{
        type: ObservationType_JurmonLintuasema;
        location: Location_JurmonLintuasema;
    }>;
} & ObservatoryDayBase));

export namespace ObservatoryDay {

    export enum observatory {
        HANGON_LINTUASEMA = 'Hangon_Lintuasema',
    }


}

