import http from "../http-common";

class empleadoService {
  getAll() {
    return http.get("/empleados");
  }

  create(data) {
    return http.post("/empleados", data);
  }

  update(id, data) {
    return http.put(`/empleados/${id}`, data);
  }

  delete(id) {
    return http.delete(`/empleados/${id}`);
  }

 
}

export default new empleadoService();