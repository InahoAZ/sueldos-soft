import http from "../http-common";

class liquidacionService {
    
  getAll() {
    return http.get("/liquidaciones");
  }

  create(data) {
    return http.post("/liquidaciones", data);
  }

  update(id, data) {
    return http.put(`/liquidaciones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/liquidaciones/${id}`);
  }

 
}

export default new liquidacionService();