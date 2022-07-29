import { apiUrl, applicationUrl } from './Constants';

export const login = ( formData, successCallback, errorCallback ) => {
    $.ajax({
        url: `${apiUrl}/login`,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: successCallback,
        error: errorCallback
    });
}

export const register = ( formData, successCallback, errorCallback ) => {
    $.ajax({
        url: `${apiUrl}/register`,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: successCallback,
        error: errorCallback
    });
}

export const logout = ( formData, successCallback, errorCallback ) => {
    $.ajax({
        url: `${apiUrl}/logout`,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: successCallback,
        error: errorCallback
    });
}
