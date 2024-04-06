export enum Status {
  ocupata_de_zi_murdar = 1,
  ocupata_de_zi_curat = 2,
  ocupata_de_iesit = 3,
  liber_murdar = 4,
  liber_verificat = 5,
  liber_curat = 6,
  mentenanta_indisponibil = 7,
}

export enum EUserRole {
  camerista = 3,
  receptionista = 2,
  manager = 1,
}
// RoomThatHasToBeWorked = lista de camere cu cele 3 statusuri:
// ocupata_de_iesit = 1, // camerista
// ocupata_de_zi, //camerista
// libera_murdara, //camerista
// dar care sa nu aiba o persoana asignata.

//CAMERISTA screens:
//1. RoomThatHasToBeWorked
//2. MyCamerasToWorkOn

// FLOW CAMERISTA
//luni dimineata 2 cameriste online
//10 camere in lista de RoomThatHasToBeWorked
//Camerista1 -> buton select, apesi pe fiecare camera (multiselect) , si send (asigneze camerele selectate pt Camerista1) (functionat / sau nu)
// daca a functionat assign camera/camerele se sterg din lista de RoomThatHasToBeWorked (pt ca au o persoana asignata la ele)
//Camersita1 -> ecran cu MyCamerasToWorkOn - camerele asignate ei (5)
//dupa ce termina cate una schimba statusul (libera_murdara -> libera_curata) sau ( ocupata/de zi/murdara  -> ocupata/de zi/curata)
// la momentul schimbarii statusului aceasta camera trebuie sa se stearga din lista de MyCamerasToWorkOn
//respectiv sa se deasigneze persoana care a luat-o.

// Caz special
// Camerista1 pick la camera cu status de ocupata_de_iesit.
// nu lucreaza pe aceasta camera pana cand Receptionista nu o trece in libera_murdara.
// cand receptionista schimba statusul din ocupata_de_iesit -> libera_murdara nu dorim sa se deasigneze camerista.

//CAmerista::
// ocupata_de_iesit = 1, // camerista isi asigneaza, apoi asteapta sa fie libera_murdara
//   ocupata_de_zi,//murdara/curata //camerista
//   libera_murdara,

//luni dimineta - > 10 camere ocupata de zi
// 2 cameriste -> 5 fiecare - Pers1 - 105 - 110
// pers1 termina camerele la finalul zilei
//marti -> pers3 -> 105-110
// ocupata/de iesit
// ocupata/de zi/murdara
// -ocupata/de zi/curata
// liber/murdar
// liber/curat
// liber/verificat
// mentenanta/indisponibila

// RECEPTIONISTA:
//1. ALl cameras,
//2. RoomsThatHasToBeWorked
//2.1 VErifyROoms -> vede camerale cu status libera_curata -> le trece in libera_verificata. (observatiile aici pot fi sterse automat)
//3. optional -> AssignedRooms

//optional -> notificari cand camerista a schimbat un status (inseamna ca a terminat camera);

//observatiile -> pot sa fie sterse manual de receptionista

//0. Fix status -> fix logica task uri daca o scoatem.
// 1. All cameras - teorie o avem
// 2. RoomsThatHasToBeWorked
// 3. MyCamerasIWorkOn

//REceptionista -> 2 screen -> all cameras, camares with tasks. //murdar
//1. Receptionista - > assign task to rooms (one task - one room 110)
//2. Camerista -> RoomsWithTasks -> take 110 -> done each task -> eliminate from the list. -> liber_murdar - > curat;
// RoomDetailsRoom -> "Add task" -> deschide dropdown/lista mai lunga -> click pe una -> send.
