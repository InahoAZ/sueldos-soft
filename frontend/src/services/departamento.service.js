import http from "../http-common";

class departamentoService {
  getAll() {
    return http.get("/departamentos");
  }

  create(data) {
    return http.post("/departamentos", data);
  }

  update(id, data) {
    return http.put(`/departamentos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/departamentos/${id}`);
  }

 
}

export default new departamentoService();