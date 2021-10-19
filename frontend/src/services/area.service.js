import http from "../http-common";

class areaService {
  getAll() {
    return http.get("/areas");
  }

  create(data) {
    return http.post("/areas", data);
  }

  update(id, data) {
    return http.put(`/areas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/areas/${id}`);
  }

 
}

export default new areaService();