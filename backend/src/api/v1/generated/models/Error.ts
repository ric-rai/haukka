/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error = {
    name: string;
    message: string;
    cause: string;
    stack?: string;
    code?: number;
    validationErrors?: Array<any>;
    invalidResponse?: any;
};

