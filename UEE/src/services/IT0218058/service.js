import axios from "axios";
const URL = "http://10.0.2.2:8090/api/v1/";

/**
 * Retrieve available career paths
 */
 const retrieveCareerPaths = (skill) => {
    return axios.post(URL + "get_career_paths", skill);
}

/**
 * Insert new request
 */
 const addRequest = (request) => {
    return axios.post(URL + "add_request", request);
}

/**
 * Retrieve all requests
 */
 const retrieveRequests = () => {
    return axios.get(URL + "get_requests");
}

/**
 * Retrieve request data
 */
 const retrieveRequestData = (id) => {
    return axios.get(URL + "get_requests/"+id);
}

/**
 *  Delete a request
 */
 const deleteRequest = (id) => {
    return axios.delete(URL + "delete_request/"+id);
}

/**
 *  Update a request
 */
 const updateRequest = (id, data) => {
    return axios.put(URL + "update_request/"+id, data);
}

export default {retrieveCareerPaths, addRequest, retrieveRequests, retrieveRequestData, deleteRequest, updateRequest};