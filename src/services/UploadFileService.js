import http from "../http-common";

class UploadFilesService {
  upload(file, filters, config) {
    let formData = new FormData();

    formData.append("file", file);

    filters.forEach((filter) => {
        formData.append("filter[]", filter)
    })

    formData.append("config", config);

    return http.post("/api/pattern", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
  uploadSequence(file) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/api/sequence-diagram", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}

export default new UploadFilesService();