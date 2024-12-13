from flask import Flask, request
from flask_restx import Api, Resource, fields
from models import db, User, Sales  # Importando o db e os modelos
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Configurando o Flask-RESTX
api = Api(
    app,
    version="1.0",
    title="Sales API",
    description="API para gerenciar usuários e vendas",
)

# Namespaces
user_ns = api.namespace("users", description="Operações relacionadas aos usuários")
sales_ns = api.namespace("sales", description="Operações relacionadas às vendas")

# Modelos de dados para Swagger
user_model = api.model(
    "User",
    {
        "id": fields.Integer(readonly=True, description="ID do usuário"),
        "name": fields.String(required=True, description="Nome do usuário"),
        "email": fields.String(required=True, description="E-mail do usuário"),
        "phone": fields.String(required=True, description="Telefone do usuário"),
    },
)

sales_model = api.model(
    "Sales",
    {
        "id": fields.Integer(readonly=True, description="ID da venda"),
        "user_id": fields.Integer(
            required=True, description="ID do usuário relacionado"
        ),
        "date": fields.String(required=True, description="Data da venda (YYYY-MM-DD)"),
        "type": fields.String(required=True, description="Tipo da venda"),
        "value": fields.Float(required=True, description="Valor da venda"),
        "status": fields.String(required=True, description="Status da venda"),
    },
)


# Rotas para usuários
@user_ns.route("/")
class UserList(Resource):
    @user_ns.marshal_list_with(user_model)
    def get(self):
        """Lista todos os usuários"""
        users = User.query.all()
        return users, 200


# Rotas para vendas
@sales_ns.route("/")
class SalesList(Resource):
    @sales_ns.marshal_list_with(sales_model)
    def get(self):
        """Lista todas as vendas"""
        sales = Sales.query.all()
        return sales, 200

    @sales_ns.expect(sales_model)
    def post(self):
        """Cria uma nova venda"""
        data = request.json
        try:
            new_sale = Sales(
                user_id=data["user_id"],
                date=datetime.strptime(data["date"], "%Y-%m-%d").date(),
                type=data["type"],
                value=data["value"],
                status=data["status"],
            )
            db.session.add(new_sale)
            db.session.commit()
            return {"message": "Venda criada com sucesso!"}, 201
        except Exception as e:
            return {"error": str(e)}, 400


@sales_ns.route("/<int:id>")
class SalesResource(Resource):
    def delete(self, id):
        """Exclui uma venda"""
        sale = Sales.query.get(id)
        if not sale:
            return {"error": "Venda não encontrada!"}, 404
        db.session.delete(sale)
        db.session.commit()
        return {"message": "Venda excluída com sucesso!"}, 200


if __name__ == "__main__":
    app.run(debug=True)
