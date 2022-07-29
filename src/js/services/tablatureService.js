import { apiUrl, applicationUrl } from './Constants';

export const appUrl = () => {
    return applicationUrl;
}

export const serviceUrl = () => {
	return apiUrl;
}

export const getAll = () => {
	return fetch( `${apiUrl}/tablatures` )
			.then( res => res.json() );
};

/* 
 * https://symfony.com/doc/5.2/security/guard_authentication.html
 */
export const getPublished_Async = async () => {
    let buildRequest;
    
    let data        = {};
    let apiToken    = 'REAL';
    buildRequest    =  fetch( `${apiUrl}/published`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};

export const getPublished = () => {
    return fetch( `${apiUrl}/published` )
            .then( res => res.json() );
};

export const getMyTablatures = ( userId ) => {
    return fetch( `${apiUrl}/my-tablatures/${userId}` )
            .then( res => res.json() );
};

export const getMyFavorites = ( userId ) => {
    return fetch( `${apiUrl}/my-favorites/${userId}` )
            .then( res => res.json() );
};

export const getOne = ( tabId ) => {
	return fetch( `${apiUrl}/tablatures/${tabId}` )
			.then( res => res.json() );
};

export const createTablature = ( formData, successCallback, errorCallback ) => {
	$.ajax({
	    url: `${apiUrl}/tablatures-new`,
	    data: formData,
	    type: "POST",
	    contentType: false,
	    processData: false,
	    success: successCallback,
	    error: errorCallback
	});
}

export const updateTablature = ( tabId, formData, successCallback, errorCallback ) => {
    $.ajax({
        url: `${apiUrl}/tablatures/${tabId}/update`,
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: successCallback,
        error: errorCallback
    });
}

export const deleteTablature = ( tabId ) => {
    return fetch( `${apiUrl}/tablatures/${tabId}/delete` )
            .then( res => res.json() );
};

export const addToFavorites = ( tabId, userId, successCallback, errorCallback ) => {    
    $.ajax({
        url: `${apiUrl}/tablatures/${tabId}/add-favorite-${userId}`,
        type: "GET",
        success: successCallback,
        error: errorCallback
    });
};
