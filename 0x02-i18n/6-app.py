#!/usr/bin/env python3
""" 3-app.py """
from flask_babel import Babel, gettext as _
from flask import Flask, g, render_template, request


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """ get user fin """
    global users
    user_id = request.args.get('login_as')
    if user_id:
        data = users.get(int(user_id), {})
        return data
    return None


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
    if 'locale' in request.args:
        locale = request.args.get('locale')
        if locale in Config.LANGUAGES:
            return locale

    if g.user:
        locale = g.user['locale']
        if locale in Config.LANGUAGES:
            return locale

    accepted = request.headers.get('Accept-Language')
    if accepted:
        return request.headers.get('Accept-Language')
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.before_request
def before_request():
    """ before function user """
    g.user = get_user()


@app.route('/')
def home():
    """ main route """
    return render_template('6-index.html')


if __name__ == '__main__':
    app.run(debug=True)
