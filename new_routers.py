import os
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import sqlalchemy as sa
import sqlalchemy.orm as so

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Настройки загрузки
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# SQLAlchemy setup
engine = sa.create_engine('sqlite:///wallpapers.db', echo=True)
Session = so.sessionmaker(bind=engine)
session = Session()

Base = so.declarative_base()

class WallPaper(Base):
    __tablename__ = 'wallpapers'
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(64), nullable=False)
    description = sa.Column(sa.String(256))
    filename = sa.Column(sa.String(256), unique=True, nullable=False)

Base.metadata.create_all(engine)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    wallpapers = session.query(WallPaper).all()
    return render_template("site.html", images=wallpapers)

@app.route('/upload')
def upload_page():
    return render_template("upload.html")

@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify(success=False, error="Файл не найден в запросе"), 400

    file = request.files['file']
    name = request.form.get('name')
    description = request.form.get('description')

    if not file or file.filename == '':
        return jsonify(success=False, error="Файл не выбран"), 400

    if not allowed_file(file.filename):
        return jsonify(success=False, error="Недопустимый формат файла"), 400

    if not name:
        return jsonify(success=False, error="Введите название"), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Проверка на существование файла с таким именем
    if os.path.exists(save_path):
        return jsonify(success=False, error="Файл с таким именем уже существует"), 400

    file.save(save_path)

    # Добавляем запись в базу
    wallpaper = WallPaper(name=name, description=description, filename=filename)
    session.add(wallpaper)
    session.commit()

    return jsonify(success=True, filename=filename)

if __name__ == '__main__':
    app.run(debug=True)
