import http from "../http-common";

class EmpresaService {
  getAll() {
    return http.get("/empresa");
  }

  create(data) {
    return http.post("/empresa", data);
  }

  update(id, data) {
    return http.put(`/empresa/${id}`, data);
  }

  delete(id) {
    return http.delete(`/empresa/${id}`);
  }

 
}

export default new EmpresaService();