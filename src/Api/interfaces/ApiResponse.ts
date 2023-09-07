export interface Response {
  StatusCode: number;
  message: string;
  data: any;
}

export interface ErrorApiResponse {
  isSuccess: false;
  StatusCode: 500;
  message: string;
  data: any;
}
