import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { HtmlParser } from '@angular/compiler';

declare var M: any;
declare var CanvasJS: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  addUser(form?: NgForm) {
    if (form) {
      if (form.value._id) {
        this.usersService.putUser(form.value).subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Usuario actualizado exitosamente' });
          this.getUsers();
        });

      } else {
        delete form.value._id;
        this.usersService.postUser(form.value).subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Usuario guardado exitosamente' });
          this.getUsers();
        })
      }
    }
  }

  getUsers() {
    var admin = 0, tech = 0, ope = 0, client = 0, security = 0;
    this.usersService.getUsers().subscribe(res => {
      this.usersService.users = res as Users[];

      for (var i = 0; i < this.usersService.users.length; i++) {

        if (this.usersService.users[i].type == 1) {
          admin++;
        } else if (this.usersService.users[i].type == 2) {
          tech++;
        } else if (this.usersService.users[i].type == 3) {
          ope++;
        } else if (this.usersService.users[i].type == 4) {
          client++;
        } else if (this.usersService.users[i].type == 5) {
          security++;
        }
      };

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
          text: "Rangos de usuarios"
        },
        axisX: {
          // includeZero: true
          title: 'Tipo de usuario'
        },
        axisY: {
          // includeZero: true
          title: 'Total'
        },
        data: [{
          type: "pie", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelFontSize: 16,
          indexLabelPlacement: "outside",
          toolTipContent: "<b>{label}<b/>: {y}",
          dataPoints: [
            { y: admin, label: "Administradores" },
            { y: tech, label: "Tecnicos" },
            { y: ope, label: "Operadores" },
            { y: client, label: "Clientes" },
            { y: security, label: "Guardias" },
          ]
        }]
      });
      chart.render();


    });
  }


  updateUser(user: Users) {
    this.usersService.selectedUser = user;
  }


  deleteUser(_id: string) {
    if (confirm('Esta seguro de querer eliminar este usuario?')) {
      this.usersService.deleteUser(_id).subscribe(res => {
        this.getUsers();
        M.toast({ html: 'Usuario eliminado exitosamente' });
      });
    }
  }

  getUsersByNameAndEmail() {
    var searchvalue = (<HTMLInputElement>document.getElementById("searchfield")).value;
    if (searchvalue != '') {
      var filter = this.usersService.users.filter(function (value) {
        return value.name.toUpperCase().includes(searchvalue.toUpperCase()) ||
          value.email.toUpperCase().includes(searchvalue.toUpperCase());
      });
      this.usersService.users = filter as Users[];
    } else {
      this.getUsers();
    }

  }

}
