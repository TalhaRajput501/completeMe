

// Generic ApiResponse - works for any data type
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message?: string;        // optional, for human-readable messages
  data?: T;                // actual response data
  error?: string;          // optional, for error details
}