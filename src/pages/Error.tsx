import {isRouteErrorResponse, useRouteError} from "react-router-dom"
import type {ErrorResponse} from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    console.error(error);
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        const typedError = error as ErrorResponse;
        // error is dto `ErrorResponse`
        errorMessage = typedError.data || error.statusText;
    } else if (error instanceof Error) {
        const errorOfError = error as Error;
        errorMessage = errorOfError.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    localStorage.removeItem('persist:root')

    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems: 'center',
            flexDirection:'column'
        }}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}