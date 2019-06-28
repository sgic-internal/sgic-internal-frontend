export default function CreateEmployee(data) {
  fetch("http://localhost:8080/employeeservice/createemployee", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
