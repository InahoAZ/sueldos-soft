import http from "../http-common";

class liquidacionService {
    
  getAll() {
    return http.get("/liquidacion");
  }

  create(data) {
    return http.post("/liquidacion", data);
  }

  update(id, data) {
    return http.put(`/liquidacion/${id}`, data);
  }

  delete(id) {
    return http.delete(`/liquidacion/${id}`);
  }

 
}

export default new liquidacionService();