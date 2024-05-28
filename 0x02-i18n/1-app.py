#!/usr/bin/env python3
""" 0-app,py """
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask(__name__)
app.config.from_object(Config)


def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    """ main route """
    return render_template('0-index.html')


babel = Babel(app, locale_selector=get_locale)
if __name__ == '__main__':
    app.run(debug=True)
