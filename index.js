const tableElement = document.querySelector("table");
let sortingOrder = "asc";

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    return result;
  } catch (error) {
    tableElement.textContent = "Something went wrong. Please try again later";
    throw new Error();
  }
}

const data = await fetchUsers();

function createTable(data) {
  console.log(data);
  data.forEach((element) => {
    const itemElement = document.createElement("tr");
    itemElement.innerHTML = `
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.address.city}</td>
          <td class="age">${element.email.toLowerCase()}</td>
          `;

    itemElement.classList.add("sort");
    itemElement.classList.add("table-body");
    itemElement.setAttribute("data-id", element.id);
    itemElement.setAttribute("data-name", element.name);
    itemElement.setAttribute("data-email", element.email);
    itemElement.setAttribute("data-location", element.address.city);

    tableElement.appendChild(itemElement);
  });
}

function sortData(key) {
  const dataElements = Array.from(tableElement.querySelectorAll("tr[data-id]"));

  dataElements.sort((a, b) => {
    const valueA = a.getAttribute(`data-${key}`);
    const valueB = b.getAttribute(`data-${key}`);

    // check if value is an integer
    if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
      if (sortingOrder === "asc") {
        return Number(valueA) - Number(valueB);
      } else if (sortingOrder === "desc") {
        return Number(valueB) - Number(valueA);
      } else return 0;
    }

    if (sortingOrder === "desc") {
      return valueB.localeCompare(valueA);
    } else if (sortingOrder === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return 0;
    }
  });

  dataElements.forEach((element) => tableElement.appendChild(element));
}

function sortByKey(id, key) {
  document.getElementById(id).addEventListener("click", function () {
    if (sortingOrder === "asc") {
      sortingOrder = "desc";
      sortData(key);
    } else {
      sortingOrder = "asc";
      sortData(key);
    }
  });
}

sortByKey("sort-name", "name");
sortByKey("sort-id", "id");
sortByKey("sort-city", "location");
sortByKey("sort-email", "email");

createTable(data);
