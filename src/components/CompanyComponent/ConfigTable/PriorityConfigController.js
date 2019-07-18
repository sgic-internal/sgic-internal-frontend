import axios from "axios";

function AddPriorityApi(data) {
  axios
    .post("http://localhost:8083/productservice/Priority", data)
    .then(res => {
      if (res.status === 200) {
        alert("Status Successfylly Added...!");
        console.log(res.data);
      }
    });
}

function UpdatePriorityApi(data) {
  return fetch("http://localhost:8083/productservice/Priority", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeletePriorityApi(priorityId) {
  fetch("http://localhost:8083/productservice/Priority/" + priorityId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + priorityId);
}

export default { AddPriorityApi, UpdatePriorityApi, DeletePriorityApi };
