import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";

// createHeader = (toAccess, method) => {
//     let axiosParam = {};
//   if (toAccess === "user") {
//       if(method == "get") {
//         axiosParam = {
//             url: "/user",

//         }
//       } else if(method == "post") {

//       }
//   } else if(toAccess === "todo"){
//     if(method === "get"){

//     } else if(method=== "post"){

//     } else if(method ===  "patch") {
//         method: "patch",
//         url : "/api/todos"

//     } else if(method === "delete"){

//     }
//   }
// };

// createData = info => {};

// export function getData(url, header) {
//   createUrl(url);
//   axios
// }

// export function postData(url, header, data) {
//   createUrl(url);
// }

// export function deleteData(url, header, data) {}

// export function updateData(url, header, data) {}

// module.exports = {
//   getData: getData,
//   postData: postData,
//   deleteData: deleteData,
//   updateData: updateData
// };
export default axios;
