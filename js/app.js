const title = document.querySelector("#title");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const checkboxSelesaiDibaca = document.querySelector("#checkboxSelesaiDibaca");

const add = document.querySelector("#add");
const update = document.querySelector("#update");
const belumDiBaca = document.querySelector("#belumDiBaca");
const sudahDiBaca = document.querySelector("#sudahDiBaca");
let idBuku = 0;

function saveToLocalStorage(data) {
  return localStorage.setItem("data", JSON.stringify(data));
}

function reset() {
  title.value = "";
  author.value = "";
  year.value = "";
  checkboxSelesaiDibaca.checked = false;
}

if (JSON.parse(localStorage.getItem("data")) === null) {
  saveToLocalStorage([]);
}

let localStorageData = JSON.parse(localStorage.getItem("data"));

const elemenBelumDibaca = (item) => {
  return `
    <div class="perBuku">
        <h4>${item.title}</h4>
        <p>Penulis : ${item.author}</p>
        <p>Tahun : ${item.year}</p>
        
        <div class="">
            <button class="btn btn-primary btn-sm" id="btnSelesaiDibaca" onclick="changeStatus(${item.id})">Selesai Dibaca</button>

            <button class="btn btn-warning btn-sm" id="btnEditBuku" onclick="editBuku(${item.id})">Edit buku</button>
            
            <button class="btn btn-danger btn-sm" id="btnHapusBuku" onclick="hapusBuku(${item.id})">Hapus buku</button>
        </div>
        
    </div>`;
};

const elemenSudahDiBaca = (item) => {
  return `
    <div class="perBuku">
        <h4>${item.title}</h4>
        <p>Penulis : ${item.author}</p>
        <p>Tahun : ${item.year}</p>
        
        <div class="">
            <button class="btn btn-primary btn-sm" id="btnSelesaiDibaca" onclick="changeStatus(${item.id})">Belum Selesai Dibaca</button>
            
            <button class="btn btn-warning btn-sm" id="btnEditBuku" onclick="editBuku(${item.id})">Edit buku</button>
            
            <button class="btn btn-danger btn-sm" id="btnHapusBuku" onclick="hapusBuku(${item.id})">Hapus buku</button>
        </div>
    </div>`;
};

const elemenKosong = () => {
  return `
    <div class="perBuku">
        <h4>Tidak ada data</h4>
    </div>`;
};

const renderData = (data) => {
  let dataBelumDiBaca = [];
  let dataSudahDiBaca = [];

  dataBelumDiBaca.length === 0 ? (belumDiBaca.innerHTML = elemenKosong()) : "";
  dataSudahDiBaca.length === 0 ? (sudahDiBaca.innerHTML = elemenKosong()) : "";

  data.filter((item) => {
    !item.isComplete ? dataBelumDiBaca.push(item) : dataSudahDiBaca.push(item);
    if (!item.isComplete) {
      dataBelumDiBaca.length > 1
        ? (belumDiBaca.innerHTML += elemenBelumDibaca(item))
        : (belumDiBaca.innerHTML = elemenBelumDibaca(item));
    } else {
      dataSudahDiBaca.length > 1
        ? (sudahDiBaca.innerHTML += elemenSudahDiBaca(item))
        : (sudahDiBaca.innerHTML = elemenSudahDiBaca(item));
    }
  });
};

renderData(localStorageData);

const SaveAndRender = () => {
  saveToLocalStorage(localStorageData);
  renderData(localStorageData);
};

add.addEventListener("click", (event) => {
  event.preventDefault();
  let buku = {
    id: new Date().getTime(),
    title: title.value,
    author: author.value,
    year: year.value,
    isComplete: checkboxSelesaiDibaca.checked,
  };

  localStorageData.push(buku);
  SaveAndRender();
  reset();
  alert("Data berhasil ditambahkan");
  modalOverlay.classList.toggle("show");
});

const hapusBuku = (id) => {
  let dialogConfirm = confirm("Apakah anda yakin ingin menghapus buku ini?");
  if (dialogConfirm) {
    localStorageData.filter((item) => {
      if (item.id === id) {
        localStorageData.splice(localStorageData.indexOf(item), 1);
      }
    });
    SaveAndRender();
    alert("Data berhasil dihapus");
  }
};

const editBuku = (id) => {
  localStorageData.filter((item) => {
    if (item.id === id) {
      idBuku = item.id;
      title.value = item.title;
      author.value = item.author;
      year.value = item.year;
      checkboxSelesaiDibaca.checked = item.isComplete;
    }
  });

  add.style.display = "none";
  update.style.display = "flex";
};

update.addEventListener("click", (event) => {
  event.preventDefault();
  let buku = {
    id: idBuku,
    title: title.value,
    author: author.value,
    year: year.value,
    isComplete: checkboxSelesaiDibaca.checked,
  };
  localStorageData.filter((item) => {
    if (item.id === idBuku) {
      localStorageData.splice(localStorageData.indexOf(item), 1, buku);
    }
  });

  SaveAndRender();
  reset();
  alert("Data berhasil diubah");

  add.style.display = "flex";
  update.style.display = "none";
  modalOverlay.classList.toggle("show");
});

const changeStatus = (id) => {
  localStorageData.filter((item) => {
    if (item.id === id) {
      item.isComplete = !item.isComplete;
    }
  });
  SaveAndRender();
  alert("Status berhasil diubah");
};

const search = (event) => {
  let dataHasilSearch = [];
  event.preventDefault();
  localStorageData.filter((item) => {
    if (
      item.title
        .toLowerCase()
        .includes(document.querySelector("#inputSearch").value.toLowerCase()) ||
      item.author
        .toLowerCase()
        .includes(document.querySelector("#inputSearch").value.toLowerCase()) ||
      item.year
        .toLowerCase()
        .includes(document.querySelector("#inputSearch").value.toLowerCase())
    ) {
      dataHasilSearch.push(item);
    }
  });
  renderData(dataHasilSearch);
};

document.querySelector("#inputSearch").addEventListener("keyup", (event) => {
  search(event);
});

document.querySelector("#btnSearch").addEventListener("click", (event) => {
  search(event);
});

document.querySelector("#removeAll").addEventListener("click", (event) => {
  event.preventDefault();
  let dialogConfirm = confirm("Apakah anda yakin ingin menghapus semua data?");
  if (dialogConfirm) {
    localStorageData = [];
    SaveAndRender();
    alert("Data berhasil dihapus semua");
  }
});
