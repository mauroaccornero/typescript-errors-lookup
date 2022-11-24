export type IError = [number, string, number, number[]];

export type state = {
  errorsData: IError[];
  errorDetailData: IError | null;
  errorTags: string[];
  errorCategories: string[];
};

export interface IPageData {
  meta: {
    seo: {
      title: string;
      description: string;
    };
  };
}

declare global {
  interface Window {
    __STATE__: state;
  }
}
