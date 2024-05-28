#!/usr/bin/env python3
""" 2-app.py """
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """ config class """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False


def get_locale():
    """ locae setup """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    """ main route """
    return render_template('2-index.html')


babel = Babel(app)
if __name__ == '__main__':
    app.run(debug=True)
