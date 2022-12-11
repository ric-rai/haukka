/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Metadata = {
    created?: string;
    modified?: string;
    isDeleted?: Metadata.isDeleted;
};

export namespace Metadata {

    export enum isDeleted {
        '_0' = 0,
        '_1' = 1,
    }


}

