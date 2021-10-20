import http from "../http-common";

class EmpresaService {
  getAll() {
    return http.get("/empresas");
  }

  create(data) {
    return http.post("/empresas", data);
  }

  update(id, data) {
    return http.put(`/empresas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/empresas/${id}`);
  }

 
}

export default new EmpresaService();