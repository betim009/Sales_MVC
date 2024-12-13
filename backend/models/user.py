from . import db  # Importando o objeto db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<User {self.name}>"


# Criando usuários
users = [
    User(name="João Silva", email="joao@email.com", phone="123456789"),
    User(name="Maria Oliveira", email="maria@email.com", phone="987654321"),
    User(name="Carlos Santos", email="carlos@email.com", phone="456123789"),
]
