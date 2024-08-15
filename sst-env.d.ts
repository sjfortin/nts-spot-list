/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    NTSSpotList: {
      type: "sst.aws.Nextjs"
      url: string
    }
    NTSSpotListTable: {
      name: string
      type: "sst.aws.Dynamo"
    }
  }
}
export {}
