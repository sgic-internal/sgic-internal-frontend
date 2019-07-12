import axios from "axios";

function AddSeverityApi(data) {
  axios
    .post("http://localhost:8083/productservice/Severity", data)
    .then(res => {
      if (res.status === 200) {
        alert("Status Successfylly Added...!");
        console.log(res.data);
      }
    });
}

function UpdateSeverityApi(data) {
  return fetch("http://localhost:8083/productservice/Severity", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteSeverityApi(stausId) {
  fetch("http://localhost:8083/productservice/Severity/" + stausId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + stausId);
}

export default { AddSeverityApi, UpdateSeverityApi, DeleteSeverityApi };
