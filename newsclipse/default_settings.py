import os
PROJECT_NAME = 'Newsclipse'
PROJECT_DESCRIPTION = 'You know, an IDE for news!'

PRODUCTION = os.environ.get('PRODUCTION') == 'TRUE'
DEBUG = not PRODUCTION
ASSETS_DEBUG = DEBUG

SECRET_KEY = os.environ.get('SECRET_KEY', 'banana pancakes')
WTF_CSRF_ENABLED = False
MONGO_URL = os.environ.get('MONGOHQ_URL', 'mongodb://localhost:27017/newsclipse')

OPENCORPORATES_TOKEN = os.environ.get('OPENCORPORATES_TOKEN')
CALAIS_KEY = os.environ.get('CALAIS_KEY')

CELERY_ALWAYS_EAGER = False
CELERY_TASK_SERIALIZER = 'json'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TIMEZONE = 'UTC'
CELERY_BROKER_URL = os.environ.get('RABBITMQ_BIGWIG_URL',
                                   'amqp://guest:guest@localhost:5672//')
