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
  saveData(dict){
    return http.post("/liquidacion/guardar", dict);
  }

 
}

export default new liquidacionService();