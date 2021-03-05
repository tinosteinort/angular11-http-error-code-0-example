# ErrorHandler intercepts HttpErrorResponse with HttpStatusCode 0

Does not work in Firefox 86 (20210222142601)
Works in Chrome

## Usecase
Open an URL which should open a component which is saved by a guard. The guard
 causes a full page reload to redirect to another URL.

## Problem
* With Angular 10:
  The browser is redirected without an error
* With Angular 11:
  The browser is redirected, but the `HttpErrorInterceptor` catches a `HttpErrorResponse` with
  HttpStatusCode `0`.

After an update from `Angular 10` to `Angular 11`, you may need to update your `HttpErrorInterceptor`
to not handle HttpStatusCode `0`, because the behaviour has changed.

## The Error
```
  ERROR 
    {
    "headers": {
    "normalizedNames": {},
    "lazyUpdate": null,
    "headers": {}
    },
    "status": 0,
    "statusText": "Unknown Error",
    "url": "http://localhost:4200/assets/i18n/en-GB.json",
    "ok": false,
    "name": "HttpErrorResponse",
    "message": "Http failure response for http://localhost:4200/assets/i18n/en-GB.json: 0 Unknown Error",
    "error": {
    "isTrusted": true
    }
    }
```
If you call the URL http://localhost:4200/assets/i18n/en-GB.json you will see the resource exist.


## Steps to reproduce error

* Start app:
  ```
  npm run start
  ```
* Open `localhost:4200` in FireFox and open DeveloperTools to see the javascript console
* Enable `Persist Logs` in Developer Tools for `Console` and for `Network` tab
* Click `Go to restricted`
    * all is fine, in the console there is no error visible
    * use the browser "go back" button
* Open `localhost:4200/restricted` in the browser directly (without clicking the link)
    * redirection happened as expected, but before the browser location has changed,
      there is an error in the console:
      ```
      ERROR 
        {
        "headers": {
        "normalizedNames": {},
        "lazyUpdate": null,
        "headers": {}
        },
        "status": 0,
        "statusText": "Unknown Error",
        "url": "http://localhost:4200/assets/i18n/en-GB.json",
        "ok": false,
        "name": "HttpErrorResponse",
        "message": "Http failure response for http://localhost:4200/assets/i18n/en-GB.json: 0 Unknown Error",
        "error": {
        "isTrusted": true
        }
        }
      ```
    * The `HttpErrorInterceptor` get an error with HttpStatusCode `0`
