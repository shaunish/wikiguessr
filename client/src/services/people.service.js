import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/people");
  }

  getMale(ids) {
    const requests = ids.map((id) => http.get(`/dudes/${id}`));
    return Promise.all(requests);
  }

  getFemale(ids) {
    const requests = ids.map((id) => http.get(`/ladies/${id}`));
    return Promise.all(requests);
  }

}

export default new DataService();
