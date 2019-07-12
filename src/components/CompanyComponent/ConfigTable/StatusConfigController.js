import axios from "axios";

function AddStatusApi(data) {
  axios.post("http://localhost:8083/productservice/Status", data).then(res => {
    if (res.status === 200) {
      alert("Status Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateStatusApi(data) {
  return fetch("http://localhost:8083/productservice/Status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteStatusApi(stausId) {
  fetch("http://localhost:8083/productservice/Status/" + stausId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + stausId);
}

export default { AddStatusApi, UpdateStatusApi, DeleteStatusApi };
