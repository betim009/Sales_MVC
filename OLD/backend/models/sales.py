from . import db  # Importando o objeto db


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
