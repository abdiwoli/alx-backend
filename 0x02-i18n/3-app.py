#!/usr/bin/env python3
""" 3-app.py """
from flask_babel import Babel, gettext as _
from flask import Flask, render_template, request


class Config:
    """ config class """

    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale():
    """ locale setup """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    """ main route """
    return render_template('3-index.html')


if __name__ == '__main__':
    app.run(debug=True)
