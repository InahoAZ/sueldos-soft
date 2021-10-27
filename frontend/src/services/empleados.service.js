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

  getOne(id) {
    return http.get(`/empleados/${id}`);
  }
  updateWork(id, data) {
    return http.put(`/empleados/${id}/asignarPuesto`, data);
  };
  updateWithoutWork(id, data) {
    return http.put(`/empleados/${id}/desasignarPuesto`, data);
  };

 
}

export default new empleadoService();