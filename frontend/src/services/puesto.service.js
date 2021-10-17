import http from "../http-common";

class puestoService {
  getAll() {
    return http.get("/puestos");
  }

  create(data) {
    return http.post("/puestos", data);
  }

  update(id, data) {
    return http.put(`/puestos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/puestos/${id}`);
  }

 
}

export default new puestoService();