from . import db  # Importando o objeto db
from datetime import datetime


class Sales(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    date = db.Column(db.Date, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", backref=db.backref("sales", lazy=True))

    def __repr__(self):
        return f"<Sale {self.id}>"

    # Criando vendas


sales = [
    Sales(
        user_id=1,
        date=datetime(2024, 12, 12),
        type="Produto",
        value=150.0,
        status="Pago",
    ),
    Sales(
        user_id=1,
        date=datetime(2024, 12, 13),
        type="Serviço",
        value=300.0,
        status="Pendente",
    ),
    Sales(
        user_id=2,
        date=datetime(2024, 12, 10),
        type="Produto",
        value=50.0,
        status="Pago",
    ),
    Sales(
        user_id=3,
        date=datetime(2024, 12, 11),
        type="Serviço",
        value=200.0,
        status="Cancelado",
    ),
]
