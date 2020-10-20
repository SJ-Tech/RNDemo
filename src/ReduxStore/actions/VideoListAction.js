import { GET_VIDEO_LIST_REQUEST, GET_VIDEO_LIST_SUCCESS, GET_VIDEO_LIST_FAILURE } from './types';

export const getVideoRequest = () => ({
    type: GET_VIDEO_LIST_REQUEST
});

export const getVideoSuccess = (data) => ({
    type: GET_VIDEO_LIST_SUCCESS,
    payload: data
});

export const getVideoFailure = (error) => ({
    type: GET_VIDEO_LIST_FAILURE,
    payload: error
});


export const getVideoList = () => {
    return async (dispatch) => {

        dispatch(getVideoRequest());
        try {
            let response = await fetch('https://private-c31a5-task27.apiary-mock.com/videos');
             console.log(response);
             const resonseJson = await response.json();
            dispatch(getVideoSuccess(resonseJson.videos));
        }
        catch (error) {
            dispatch(getVideoFailure(error));
        }
    };
};
