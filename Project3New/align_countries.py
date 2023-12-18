# THIS FILE CREATED TO MATCH AND CORRECT JSON FILE AND OUR DATABASE ALREADY STORED
from flask_sqlalchemy import SQLAlchemy
from app import app, db, ProjectModel  
from fuzzywuzzy import process
import json

# Manual corrections
manual_corrections = {
    'Costa do Marfim': 'Côte d\'Ivoire',
    
}

# Function to align country names
def align_country_names():
    with open('static/countries.json', 'r', encoding='utf-8') as file:
        geojson_data = json.load(file)

    # Extract country names from GeoJSON
    geojson_countries = [feature['properties']['ADMIN'] for feature in geojson_data['features']]

    # Create a session for database operations
    with app.app_context():  # Set up an application context
        with db.session.begin():
            # Fetch all countries from the database
            all_countries = ProjectModel.query.all()

            for country in all_countries:
                # Apply manual correction if exists
                corrected_name = manual_corrections.get(country.Country, country.Country)

                # Find the best match in GeoJSON countries
                best_match = process.extractOne(corrected_name, geojson_countries)[0]

                # Update the country name in the database if it's different
                if best_match != country.Country:
                    print(f"Updating '{country.Country}' to '{best_match}'")
                    country.Country = best_match

            # Commit the changes
            db.session.commit()

    print("Country names alignment completed.")

# Run the function
if __name__ == '__main__':
    align_country_names()





