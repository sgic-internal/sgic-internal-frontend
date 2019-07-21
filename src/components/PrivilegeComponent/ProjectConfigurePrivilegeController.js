import axios from "axios";

function UpdateProjectConfigurePrivilegeApi(projectStatus) {
  //   return fetch(
  //     "http://localhost:8081/defectservices/ProjectPrivilegeConfiguration",
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   );

  axios
    .post(
      "http://localhost:8081/defectservices/ProjectPrivilegeConfiguration",
      projectStatus
    )
    .then(res => {
      if (res.status === 200) {
        alert("projectStatus Update Successfylly...!");
        console.log(res.data);
      }
    });
}

export default {
  UpdateProjectConfigurePrivilegeApi
};
