/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ObservatoryDay = {
    observatory: string;
    date: string;
    comment: string;
    observers: Array<string>;
    catches: Array<{
        type: string;
        openedAt: number;
        closedAt: number;
        amount: number;
        location: string;
        netLength: number;
        netCode: string;
    }>;
    periods: Array<{
        type: string;
        location: string;
        startTime: number;
        endTime: number;
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

