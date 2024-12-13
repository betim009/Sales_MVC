from .db import db  # Importando o db
from .user import User  # Importando o modelo User
from .sales import Sales  # Importando o modelo Sales

__all__ = ["db", "User", "Sales"]  # Exportando para que o Flask possa usar
