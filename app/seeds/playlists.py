from app.models import db, Playlist


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    playlist1 = Playlist(
        name='Christmas Song', description='Enjoy music full of fun and really touching your soul.', user_id=1)
    playlist2 = Playlist(
        name='A happy day', description='Beautiful morning piano music', user_id=2)
    playlist3 = Playlist(
        name='Study night', description='Soothing Relaxation Study Sleep', user_id=3)

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
