from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import configs


jwt = JWTManager()


def create_app(config='dev'):
    app = Flask(__name__)
    app.config.from_object(configs[config])

    jwt.init_app(app)
    CORS(app)
    app.app_context().push()

    app.route('/')(lambda: 'Hello, World!')
    
    return app