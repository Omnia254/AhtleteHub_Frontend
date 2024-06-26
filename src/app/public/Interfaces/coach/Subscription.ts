// subscription.model.ts

export interface SubscribtionFeatureDto {
    subscriptionId: number;
    featureId: number;
    name: string;
    description: string;
  }
  
  export interface Subscription {
    id: number;
    coachId: number;
    name: string;
    price: number;
    durationInMonths: number;
    subscribtionsFeatures: SubscribtionFeatureDto[];
  }
  
  export interface PageResults<T> {
    items: T[];
    totalItemsCount: number;
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
  
  export enum SortingDirection {
    Ascending = 'Ascending',
    Descending = 'Descending',
  }
  