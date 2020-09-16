const bcrypt = require('bcrypt');
const mysql = require('../../database/mysql');

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

class User {
  constructor({
    id, name, email, password, createdAt,
  }) {
    this.id = id || 0;
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
    this.createdAt = createdAt || '';
  }

  create() {
    return new Promise((resolve, reject) => {
      const newUser = {
        name: this.name,
        email: this.email,
        password: encryptPassword(this.password),
      };
      mysql('tb_user').insert({ ...newUser }).returning('id')
        .then((user) => {
          this.id = user.id;
          this.name = newUser.name;
          this.password = newUser.password;
          this.email = newUser.email;
          resolve(true);
        })
        .catch((err) => {
          console.log('erro');
          reject(err);
        });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      mysql('tb_user').where({ id }).first()
        .then((user) => {
          if (user) {
            this.id = user.id;
            this.name = user.name;
            this.password = user.password;
            this.email = user.email;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getByEmail(email) {
    return new Promise((resolve, reject) => {
      mysql('tb_user').where({ email }).first()
        .then((user) => {
          if (user) {
            this.id = user.id;
            this.name = user.name;
            this.password = user.password;
            this.email = user.email;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      mysql('tb_user').update({ name: this.name }).where({ id: this.id }).returning('*')
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updatePassword(password) {
    return new Promise((resolve, reject) => {
      mysql('tb_user').update({ password: encryptPassword(password) }).where({ id: this.id }).returning('*')
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      mysql('tb_user').delete().where({ id: this.id })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getScopes() {
    try {
      const scopes = await mysql('tb_user_scope').where({ id_user: this.id });
      return scopes;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  grantScope(scope) {
    return new Promise((resolve, reject) => {
      mysql('tb_user_scope').insert({ id_user: this.id, scope })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  revokeScope(scope) {
    return new Promise((resolve, reject) => {
      mysql('tb_user_scope').delete().where({ id_user: this.id, scope })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = User;
