import Axios from 'axios';

const URL = "http://192.168.1.4:8090/api/v1/";

const viewCourses = () => {
    return Axios.get(URL + 'get_all_su')
}

const viewFavoriteCourses = () => {
    return Axios.get(URL + 'get_all_favorite_su')
}

const addToFavorite = (item, id) => {
    return Axios.patch(URL + 'update_course_su/' + id, item);
}

const updateFavoriteCourse = (item, id) => {
    return Axios.patch(URL + 'update_favorite_course_su/' + id, item);
}

const deletedFavoriteCourse = (id) => {
    return Axios.delete(URL + 'delete_favorite_course_su/' + id);
}

export default { viewCourses, addToFavorite, viewFavoriteCourses, updateFavoriteCourse, deletedFavoriteCourse };