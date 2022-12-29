export interface UrlData {
  page_url: string;
}

export interface TopRank {
  [kay: string]: number;
}

export interface UrlResponse {
  data: {
    downloadTime: number;
    modelTime: number;
    topRank: TopRank;
  };
}

export enum AiErrorType {
  VALIDATION_FAILED = "value_error.url.host",
}
