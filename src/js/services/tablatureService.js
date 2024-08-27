import { apiUrl, tablaturesUrl, applicationUrl } from './Constants';

export const appUrl = () => {
    return applicationUrl;
}

export const tabUrl = () => {
    return tablaturesUrl;
}

export const serviceUrl = () => {
	return apiUrl;
}

export const getAll = () => {
	return fetch( `${apiUrl}/tablatures` )
			.then( res => res.json() );
};

export const getPublished = () => {
    return fetch( `${apiUrl}/latest-tablatures` )
            .then( res => res.json() );
};

export const getMyTablatures = async ( apiToken ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/my-tablatures`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken
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
            'Authorization': 'Bearer ' + apiToken
        }
    });
           
    const response  = await buildRequest;
    const result    = await response.json();
    
    return result;
};

export const getOne = ( apiToken, tabId ) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiToken
        }
    };
    
	return fetch( `${apiUrl}/tablatures/${tabId}`, requestOptions )
			.then( res => res.json() );
};

export const createTablature = ( apiToken, formData, successCallback, errorCallback ) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiToken
        },
        body: formData
    };
    
    fetch( `${apiUrl}/tablatures/new`, requestOptions )
        .then( response => response.json() )
        .then( data => successCallback( data ) );
}

export const updateTablature = ( apiToken, tabId, formData, successCallback, errorCallback ) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiToken
        },
        body: formData
    };
    
    fetch( `${apiUrl}/tablatures/${tabId}`, requestOptions )
        .then( response => response.json() )
        .then( data => successCallback( data ) );
}

export const deleteTablature = async ( apiToken, tabId ) => {
    let buildRequest;
    
    buildRequest    =  fetch( `${apiUrl}/tablatures/${tabId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + apiToken
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
