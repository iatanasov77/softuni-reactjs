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

export const getPublished = () => {
    return fetch( `${apiUrl}/published` )
            .then( res => res.json() );
};

export const getMyTablatures = async ( apiToken ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/my-tablatures`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};

export const getMyFavorites = async ( apiToken ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/my-favorites`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};

export const getOne = ( tabId ) => {
	return fetch( `${apiUrl}/tablatures/${tabId}` )
			.then( res => res.json() );
};

export const createTablature = ( apiToken, formData, successCallback, errorCallback ) => {
    // Work-Around
    formData.append( 'apiToken', apiToken );
    
	$.ajax({
	    url: `${apiUrl}/tablatures-new`,
	    //beforeSend: function( xhr ){ xhr.setRequestHeader( 'X-AUTH-TOKEN', apiToken ); },
	    //headers: {"X-AUTH-TOKEN": apiToken},
	    data: formData,
	    type: "POST",
	    contentType: false,
	    processData: false,
	    success: successCallback,
	    error: errorCallback
	});
}

export const updateTablature = ( apiToken, tabId, formData, successCallback, errorCallback ) => {
    // Work-Around
    formData.append( 'apiToken', apiToken );
    
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

export const deleteTablature = async ( apiToken, tabId ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/tablatures/${tabId}/delete`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};

export const addToFavorites = async ( apiToken, tabId ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/tablatures/${tabId}/add-favorite`, {
        method: 'GET',
        headers: {
            'X-AUTH-TOKEN': apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};
