/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Observatory } from '../models/Observatory';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Handles login after the user has been authenticated.
     * @param token
     * @returns void
     * @throws ApiError
     */
    public getAccount(
        token?: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/login',
            query: {
                'token': token,
            },
            errors: {
                304: `Redirect to the root.`,
            },
        });
    }

    /**
     * All observatories
     * @returns Observatory Success
     * @throws ApiError
     */
    public getObservatory(): CancelablePromise<Array<Observatory>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/observatory',
        });
    }

    /**
     * Get observatory by name.
     * @param name
     * @returns Observatory Success
     * @throws ApiError
     */
    public getObservatory1(
        name: string,
    ): CancelablePromise<Observatory> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/observatory/{name}',
            path: {
                'name': name,
            },
        });
    }

}
