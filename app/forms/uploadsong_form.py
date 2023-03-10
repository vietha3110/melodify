from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList
from wtforms.validators import DataRequired


class UploadSongForm(FlaskForm):
    name = StringField('Song name', validators=[DataRequired()])
    artist_name = StringField('Artist', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    length = IntegerField('Length', validators=[DataRequired()])
