import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', "some key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///data.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    DEBUG = True


class ProductionConfig(Config):
    ...

configs = {
    "dev": DevelopmentConfig,
    "prod": ProductionConfig
}