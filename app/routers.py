from flask import Flask, redirect, url_for, request, jsonify, session, render_template
import json
import random
import string
import os
import uuid
import sqlalchemy as sa
import sqlalchemy.orm as so

app = Flask(__name__)
app.secret_key = 'your-secret-key'


class WallPaper(so.DeclarativeBase):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[int] = so.mapped_column()
    discription: so.Mapped[str] = so.mapped_column(sa.String(64))
    user: so.Mapped[str] = so.mapped_column(sa.String(120), unique=True)
    track: so.Mapped[str] = so.mapped_column(sa.String, unique=True)


@app.route('/')
def index():
    return render_template("site.html")


@app.route('/upload')
def upload():
    return render_template("upload.html")


if __name__ == '__main__':
    app.run(debug=True)
