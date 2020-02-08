# import os
# TEAM_NAME = os.environ['TEAM_NAME']
import os

class BaseConfig:
    """Base Configuration"""
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'my_precious_key'

class DevelopmentConfig(BaseConfig):
    """Development Configuration"""
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_TEST_URL')

# class ProductionConfig(BaseConfig):
#     """Production configuration"""
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


