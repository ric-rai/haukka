/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ObservatoryDayBase = {
    date: string;
    comment: string;
    observers: Array<string>;
    catches: Array<{
        type: string;
        openedAt: string;
        closedAt: string;
        amount: number;
        location: string;
        netLength: number;
        netCode: string;
    }>;
    periods: Array<{
        startTime: string;
        endTime: string;
        observations: Array<{
            species: string;
            adultUnknownCount: number;
            adultFemaleCount: number;
            adultMaleCount: number;
            juvenileUnknownCount: number;
            juvenileFemaleCount: number;
            juvenileMaleCount: number;
            subAdultUnknownCount: number;
            subAdultFemaleCount: number;
            subAdultMaleCount: number;
            unknownUnknownCount: number;
            unknownFemaleCount: number;
            unknownMaleCount: number;
            totalCount: number;
            direction: string;
            bypassSide: number;
            notes: string;
        }>;
    }>;
};

