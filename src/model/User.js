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

  async create() {
    try {
      const newUser = {
        name: this.name, email: this.email, password: encryptPassword(this.password),
      };
      return await mysql('tb_user').insert({ ...newUser }).returning();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getById(id) {
    try {
      const user = await mysql('tb_user').where({ id }).first();
      if (user) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getByEmail(email) {
    try {
      const user = await mysql('tb_user').where({ email }).first();
      if (user) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update() {
    try {
      return await mysql('tb_user').update({ name: this.name }).where({ id: this.id }).returning('*');
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async updatePassword(password) {
    try {
      return await mysql('tb_user')
        .update({ password: encryptPassword(password) })
        .where({ id: this.id })
        .returning();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async delete() {
    try {
      return await mysql('tb_user').delete().where({ id: this.id });
    } catch (err) {
      console.log(err);
      return false;
    }
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

  async grantScope(scope) {
    try {
      return await mysql('tb_user_scope').insert({ id_user: this.id, scope });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async revokeScope(scope) {
    try {
      return await mysql('tb_user_scope').delete().where({ id_user: this.id, scope });
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = User;
