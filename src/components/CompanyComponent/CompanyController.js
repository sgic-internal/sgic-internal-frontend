import axios from "axios";

function AddCompanyApi(data) {
  axios.post("http://localhost:8083/productservice/Company", data).then(res => {
    if (res.status === 200) {
      alert("Company Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateCompanyApi(data) {
  return fetch("http://localhost:8083/productservice/Company", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteCompanyApi(companyId) {
  fetch("http://localhost:8083/productservice/Company/" + companyId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + companyId);
}

export default { AddCompanyApi, UpdateCompanyApi, DeleteCompanyApi };
