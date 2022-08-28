import { Response } from "express";
import {
  ErrorResponseWrapper,
  SuccessResponseWrapper,
} from "../types";

export const responseWrapper = async <T>(
  fn: () => Promise<T>,
  res: Response<SuccessResponseWrapper<T> | ErrorResponseWrapper>
) => {
  try {
    const response = await fn();   
    res.send(successResponse(response ?? null));
  } catch (error) {
    res.send(
      errorResponse({
        errorMsg: error.msg,
        stack: error.stack,
      })
    );
  }
};

export const successResponse = <T>(data: T): SuccessResponseWrapper<T> => ({
  success: true,
  error: false,
  data: data,
});


export const errorResponse = <T = null>({
  errorMsg,
  stack,
  metaData,
}: {
  errorMsg: string;
  stack?: string;
  metaData?: T;
}): ErrorResponseWrapper<T> => ({
  success: false,
  error: {
    message: errorMsg,
    stack,
  },
  metaData,
});
