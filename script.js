const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Ambil data dari localStorage saat website dibuka
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tampilkanTugas();

function tambahTugas() {
    const tugasBaru = taskInput.value.trim();

    if (tugasBaru === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    tasks.push({
        text: tugasBaru,
        selesai: false
    });

    simpanData();
    tampilkanTugas();

    taskInput.value = "";
}

function tampilkanTugas() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="
                text-decoration: ${task.selesai ? "line-through" : "none"};
            ">
                ${task.text}
            </span>

            <button onclick="toggleSelesai(${index})">
                ${task.selesai ? "Batal" : "Selesai"}
            </button>

            <button onclick="hapusTugas(${index})">
                Hapus
            </button>
        `;

        taskList.appendChild(li);
    });
}

function toggleSelesai(index) {
    tasks[index].selesai = !tasks[index].selesai;

    simpanData();
    tampilkanTugas();
}

function hapusTugas(index) {
    tasks.splice(index, 1);

    simpanData();
    tampilkanTugas();
}

function simpanData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}