import { GET_VIDEO_LIST_REQUEST, GET_VIDEO_LIST_SUCCESS, GET_VIDEO_LIST_FAILURE  } from '../actions/types';

const initilState = {
    loading: false,
    errorMessage: "",
    videoList: [],

};

const videoListReducer = (state = initilState, action) => {
    switch (action.type) {
        case GET_VIDEO_LIST_REQUEST:
            return { ...state, loading: true };
        case GET_VIDEO_LIST_SUCCESS:
            return { ...state, loading: false, videoList: state.videoList.concat(action.payload) };
        case GET_VIDEO_LIST_FAILURE:
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }

};

export default videoListReducer;
