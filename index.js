const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.productos = [];
  }

  save(objeto) {
    // console.log(objeto)
    if (this.productos.length === 0) {
      let obj = objeto;
      obj.id = this.productos.length + 1;
      this.productos.push(obj);

      fs.writeFileSync(`./${this.archivo}`, JSON.stringify(this.productos));
      return obj.id;
    } else {
      let arch = JSON.parse(fs.readFileSync(`./${this.archivo}`, "utf-8"));
      // console.log(arch)
      let obj = objeto;
      obj.id = arch.length + 1;
      arch.push(objeto);
      // console.log(arch)
      fs.writeFileSync(`./${this.archivo}`, JSON.stringify(arch));
      return obj.id;
    }
  }

  getById(id) {
    let arch = JSON.parse(fs.readFileSync(`./${this.archivo}`, "utf-8"));
    let obj = arch.filter((e) => e.id == id);
    if (arch.length < id) {
      return null;
    } else {
      return obj[0];
    }
  }

  getAll() {
    let arch = JSON.parse(fs.readFileSync(`./${this.archivo}`, "utf-8"));
    return arch;
  }

  deleteById(id) {
    let arch = JSON.parse(fs.readFileSync(`./${this.archivo}`, "utf-8"));
    let obj = arch.filter((e) => e.id != id);
    // console.log(obj[0].id)
    let arrNew = obj;
    let idNew = arrNew.map((e) => e);
    console.log(idNew);
    fs.writeFileSync(`./${this.archivo}`, JSON.stringify(arrNew));
  }

  deleteAll() {
    let all = this.getAll();
    if (all.length > 0) {
      let all = [];
      fs.writeFileSync(`./${this.archivo}`, JSON.stringify(all), "utf-8");
    } else {
      console.log("No hay objetos para eliminar");
    }
  }
}

const nueva = new Contenedor("productos.txt");
let vela = { title: "VELA", price: 1000, thumbnail: "url" };
let buzo = { title: "BUZO", price: 1000, thumbnail: "url" };
let remera = { title: "remera", price: 1000, thumbnail: "url" };

nueva.save(vela);
nueva.save(buzo);
nueva.save(remera);
nueva.getById(2)
nueva.getAll()
nueva.deleteById(3)
nueva.deleteAll();
