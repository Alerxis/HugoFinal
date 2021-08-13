export class Users {
    _id: string;
    name: string;
    type: number;
    email: string;
    points: number;
    password: string;

    constructor(_id = '', name = '', type= 1, email = '', points = 0, password = '')
    {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.email = email;
        this.points = points;
        this.password = password;
    }
}
