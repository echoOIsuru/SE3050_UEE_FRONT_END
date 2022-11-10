import axios from 'react-native-axios'; 
const URL = 'http://192.168.231.199:8090/api/v1/';

//Modules

// get modules
const getModules = () => {
    return axios.get(URL + "modules/");
}

// get modules by IDs
const getModulesByIds = (ids) => {
    return axios.post(URL + "userModules/", ids);
}

// get module by object ID
const getModuleByObjId = (id) => {
    return axios.get(URL + "moduleById/" + id);
}

//insert module details
const insertModule = (data) => {
    return axios.post(URL + "addModule/", data);
}

// update module
const updateModule = (id, data) => {
    return axios.put(URL + "module/" + id, data);
}

// delete module
const deleteModule = (id) => {
    return axios.delete(URL + "module/" + id);
}


//Courses

// get course deatils
const getcourseDetails = () => {
    return axios.get(URL + "courseDetails/");
}

// get course deatils by IDs
const getcourseDetailsByIds = (ids) => {
    return axios.post(URL + "courseDetailsByModule/", ids);
}

// get course deatils by object ID
const getcourseDetailsByObjId = (id) => {
    return axios.get(URL + "courseDataByObj/" + id);
}

//insert course deatils
const insertcourseDetails = (data) => {
    return axios.post(URL + "courseDetails/", data);
}

// update course deatils
const updatecourseDetails = (id, data) => {
    return axios.put(URL + "courseDetails/" + id, data);
}

// delete course deatils
const deletecourseDetails = (id) => {
    return axios.delete(URL + "courseDetails/" + id);
}


export default {getModules, getModuleByObjId, getModulesByIds, deleteModule, updateModule, insertModule, 
getcourseDetails, getcourseDetailsByIds, getcourseDetailsByObjId, insertcourseDetails, updatecourseDetails, deletecourseDetails};