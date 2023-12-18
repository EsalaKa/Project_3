# Import modules and libraries
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pandas as pd

# Configure the SQLAlchemy database URI and disable track modifications
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///avgIQpercountry.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and database migration
db = SQLAlchemy(app)
migrate = Migrate(app, db)



# Define SQLAlchemy database model called ProjectModel with multiple columns
class ProjectModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Country = db.Column(db.String(255))
    Average_IQ = db.Column(db.Float)
    Literacy_Percentage = db.Column(db.Float)
    Cumulative_Nobel_Prize = db.Column(db.Float)
    Average_School_Education = db.Column(db.Float)
    HDI = db.Column(db.Float)
    Population = db.Column(db.Float)
    continent = db.Column(db.String(255))  
    gni = db.Column(db.Float) 

# Function to create database tables
def create_tables():
    with app.app_context():
        db.create_all()

# Function to import data from CSV into the database, with error handling (Error kept occuring at beggining, left the coding )
def import_data():
    try:
        csv_file_path = 'C:/Users/User/OneDrive/Desktop/Project3New/avgIQpercountry_cleaned.csv'
        cleaned_df = pd.read_csv('C:/Users/User/OneDrive/Desktop/Project3New/avgIQpercountry_cleaned.csv')

        with app.app_context():
            for index, row in cleaned_df.iterrows():
                new_entry = ProjectModel(
                    Country=row['Country'],
                    Average_IQ=row['Average_IQ'],
                    Literacy_Percentage=row['Literacy_Percentage'],
                    Cumulative_Nobel_Prize=row['Cumulative_Nobel_Prize'],
                    Average_School_Education=row['Average_School_Education'],
                    HDI=row['HDI'],
                    Population=row['Population'],
                    continent=row['Continent'],  
                    gni=row['GNI']
                )
                db.session.add(new_entry)
            db.session.commit()
        print("Data import successful.")
    except Exception as e:
        print(f"Error during data import: {e}")

# Define a route for the root URL ('/') that queries data from the ProjectModel table
# and displays a webpage with information about countries..
@app.route('/')
def index():
    data = ProjectModel.query.all()
    countries = [entry.Country for entry in data]
    country_data = {entry.Country: {
                        "Average_IQ": entry.Average_IQ,
                        "Literacy_Percentage": entry.Literacy_Percentage,
                        "Cumulative_Nobel_Prize": entry.Cumulative_Nobel_Prize,
                        "Average_School_Education": entry.Average_School_Education,
                        "HDI": entry.HDI,
                        "Population": entry.Population
                     } for entry in data}
    return render_template('index.html', countries=countries, country_data=country_data)

# Check if this script is the main program that is directly executed from the command line.
if __name__ == '__main__':
    # Initialize the database and import initial data only on the first run.
    # COMMENT the 2 lines below after intializing
    create_tables()
    import_data()
    app.run(host='0.0.0.0', debug=True) # host part included at the beggining stage, and left the coding




