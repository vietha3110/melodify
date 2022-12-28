from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class AddSongForm(FlaskForm):
    song_id = IntegerField('Song id', validators=[DataRequired()])
  