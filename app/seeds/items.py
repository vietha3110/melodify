from app.models import db, Item

def seed_items():
    item1 = Item(name="item1")
    item2 = Item(name="item2")

    db.session.add(item1)
    db.session.add(item2)

    db.session.commit()

def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
