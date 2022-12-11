/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Error } from '../models/Error';
import type { Observatory } from '../models/Observatory';
import type { ObservatoryDay } from '../models/ObservatoryDay';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Handles user login.
     * @param token
     * @returns Error Error
     * @throws ApiError
     */
    public getAccount(
        token?: string,
    ): CancelablePromise<Error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/login',
            query: {
                'token': token,
            },
            errors: {
                304: `Redirect to the laji authentication if token was not provided. Redirect to the root if token was provided.
                `,
            },
        });
    }

    /**
     * All observatories
     * @returns Observatory Success
     * @returns Error Error
     * @throws ApiError
     */
    public getObservatories(): CancelablePromise<Array<Observatory> | Error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/observatory',
        });
    }

    /**
     * Get observatory by name.
     * @param name
     * @returns Observatory Success
     * @returns Error Error
     * @throws ApiError
     */
    public getObservatoryByName(
        name: string,
    ): CancelablePromise<Observatory | Error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/observatory/{name}',
            path: {
                'name': name,
            },
        });
    }

    /**
     * Add new observatory day.
     * @param requestBody
     * @returns ObservatoryDay Success
     * @returns Error Error
     * @throws ApiError
     */
    public newObservatoryDay(
        requestBody?: ObservatoryDay,
    ): CancelablePromise<ObservatoryDay | Error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/observatory/{name}/day',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
