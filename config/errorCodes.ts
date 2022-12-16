/**
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Augurst 2022
 */

export const errorCodes = [
  // Client error responses
  {
    name: "bad_request",
    message: "Invalid request, please modify your request and try again!",
    code: 400
  },
  { name: "unauthorized", message: "This user is unauthorized!", code: 401 },
  {
    name: "forbidden",
    message: "The type of account can not perform this operation",
    code: 403
  },
  { name: "not_found", message: "Not found!", code: 404 },
  {
    name: "method_not_allowed",
    message: "The method used to make this request is unavailable",
    code: 405
  },
  {
    name: "not_accepted",
    message: "Server can not serve non-acceptable values!",
    code: 406
  },
  {
    name: "proxy_authentication_required",
    message: "Unauthorized proxy server!",
    code: 407
  },
  {
    name: "request_time_out",
    message: "Unexpectedly server wants to close connection!",
    code: 408
  },
  {
    name: "conflict",
    message: "Requests conflict occured, try again!",
    code: 409
  },
  {
    name: "gone",
    message: "Access is no longer available, please contact the admin!",
    code: 410
  },
  {
    name: "length_requried",
    message: "Please specify content length header!",
    code: 411
  },
  {
    name: "too_large_payload",
    message: "The request is too large, please try again!",
    code: 413
  },
  {
    name: "un_supported_media_type",
    message: "Unsupported request format, please try again!",
    code: 415
  },
  {
    name: "range_not_satisfiable",
    message: "The request range can not be served, please try again!",
    code: 416
  },
  {
    name: "too_many_requests",
    message: "Your amount of requests have run out, please try again later!",
    code: 429
  },

  // Server error responses
  {
    name: "internal_server_err",
    message:
      "The server encountered an unexpected condition, please contact the admin!",
    code: 500
  },
  {
    name: "bad_gateway",
    message:
      "Gateway server received an invalid response from the upstream server!",
    code: 502
  },
  {
    name: "service_unavailable",
    message: "The server is under maintenance, please contact the admin!",
    code: 503
  },

  // Success responses
  { name: "ok", message: "Operation performed successfully!", code: 200 }
];
