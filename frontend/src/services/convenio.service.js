import http from "../http-common";

class convenioService {
  getAll() {
    return http.get("/convenios");
  }

  create(data) {
    return http.post("/convenios", data);
  }

  update(id, data) {
    return http.put(`/convenios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/convenios/${id}`);
  }

  addCategoria(id, data) {
    return http.put(`/convenios/${id}/agregarCategoria`, data);
  }
  addSubCategoria(id, data) {
    return http.put(`/convenios/${id}/agregarSubCategoria`, data);
  }
}

export default new convenioService();