import axios from "axios";

function AddTypeApi(data) {
  axios.post("http://localhost:8083/productservice/Type", data).then(res => {
    if (res.status === 200) {
      alert("Status Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateTypeApi(data) {
  return fetch("http://localhost:8083/productservice/Type", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteTypeApi(typeId) {
  fetch("http://localhost:8083/productservice/Type/" + typeId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + typeId);
}

export default { AddTypeApi, UpdateTypeApi, DeleteTypeApi };
