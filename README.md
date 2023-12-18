# Project_3

Project Overview:
This project aims to analyze and derive insights from a dataset containing intelligence-related metrics of various countries. The dataset was and cleaned to prepare it for analysis. The primary objectives include investigating correlations between a country's average IQ and its literacy percentage, exploring the relationship between average education levels and Nobel Prize winners, and assessing geographical variations in intelligence levels across different regions. 

In this project, the process commenced with the importation of a dataset from [Kaggle](https://www.kaggle.com/) in csv format, serving as the initial source of raw data. Subsequently, the dataset underwent a cleaning process using Python code within Jupyter Notebook. This cleaning process involved straightforward operations, including column drops and renames, aimed at preparing the data for integration into a web application.

Following this, a Flask application named app.py was created to serve as the project's foundation. Flask-SQLAlchemy was imported to facilitate the integration of this application with a database, providing a tool for database management in Flask. Additionally, Flask-Migrate was included to simplify the management of database schema changes. As part of the database integration process, the cleaned dataset, transformed into a CSV file using Python code, was stored within an SQLite database.

To data storage and retrieval, a database model named ProjectModel was defined using SQLAlchemy. This model effectively represents a table in the database, featuring various columns such as 'Country', 'Average_IQ', 'Literacy_Percentage', and more, each designed  country-related information.
Two  functions were established within the Flask application: create_tables() and import_data(). The create_tables() function was responsible for generating the necessary database tables, ensuring their structure aligned with the defined model. Meanwhile, the import_data() function was tasked with reading the cleaned CSV file and importing its contents into the database, populating the tables with  country-related data. A separate Python file, align_countries, was created to match and correct the country name differences in the SQLite database and GeoJSON file that used to map that was extracted from https://www.naturalearthdata.com/.


In this project, intentionally a data set is chosen that does not include any personal information or sensitive data. This decision was made to prioritize data privacy and security and to mitigate potential ethical and legal concerns associated with the handling of personal information. 

Instructions for application to use and what it offers:
1.	Begin by running the Flask application. Execute the app.py file.
2.	Once the application is running, access it through a web browser using the provided URL (http://127.0.0.1:5000).
3.	The application offers a user-friendly interface where you can explore and compare intelligence-related data for different countries.
4.	Use the dropdown menu to select a specific country of interest.
5.	When selecting a country, the application will display relevant data, including average IQ, literacy percentage, number of cumulative Nobel Prize winners, education levels, HDI and population.
6.	To check a country's IQ level on the geographical maps, simply click on the country of interest. The maps use a colour scheme: dark green for countries with an IQ of 100 or more (high level), light green for countries with IQ levels between 90 and 100 (medium level), and yellow for countries with IQ levels below 90 (low level). This interactive feature allows you to quickly grasp the distribution of intelligence levels across regions.

7.	Find the correlations and geographical patterns that provide valuable insights into global intelligence metrics.

Research Questions:
The project explores three main research questions:

Is there a correlation between a country's average IQ and its literacy percentage?
Do countries with a higher average education level tend to produce more Nobel Prize winners?
Is there a geographical correlation with people's intelligence levels?

Assumption:
An assumption made in this project is that different metrics calculated in various years (2019, 2021, 2022) have minimal impact. Therefore, it is assumed that these metrics remain unchanged in 2023, the year in which population data is recorded in the DataFrame.
Analysis:
In the first analysis, the correlation between a country's average IQ in 2019 and its literacy percentage in 2023 was examined. The scatterplot revealed a weak positive correlation, suggesting that countries with higher average IQ tend to have somewhat higher literacy rates. In the second analysis, the relationship between a country's average school education in 2021 and the cumulative number of Nobel Prize winners in 2022 was explored. The scatterplot indicated no considerable correlation, implying that no connection between education levels and Nobel Prize achievements in a considerable manner. Geographical map illustrates in colour shows entire continent Africa, Soth America (except French Guyana (Indicated as France) and Suriname), Entire Asia except China, Japan, Myanmar, South Korea, and Thailand are low in IQ levels. North America, almost everywhere in Europe and Meduim level of IQ level. However, high level IQ level geographically spread in Europe and Asia among a few countries. 

Limitations: 
Due to time constraints, not all errors could be addressed. Using the "align_countries.py" script, country names and other columns in both the GeoJSON and SQLite database were successfully integrated. However, there was insufficient time to resolve the same issue for continent and GNI data, which currently display as "undefined" when viewing country information. Fixing this would be somewhat time-consuming if a similar program to "align_countries.py" were employed. Alternatively, manual entry of corrections for approximately 40 instances could be in the process. 

References

Anon, (n.d.). Natural Earth. [online] Available at: https://www.naturalearthdata.com/.

www.w3schools.com. (n.d.). JavaScript Fetch API. [online] Available at: https://www.w3schools.com/jsref/api_fetch.asp#:~:text=The%20fetch()%20method%20starts [Accessed 18 Dec. 2023].

Grinberg, M. (2018). The Flask Mega-Tutorial Part VII: Error Handling - miguelgrinberg.com. [online] Miguelgrinberg.com. Available at: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-vii-error-handling.

Grinberg, M. (n.d.). The Flask Mega-Tutorial Part IV: Database. [online] blog.miguelgrinberg.com. Available at: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database.

Stack Overflow. (n.d.). How do I know if I can disable SQLALCHEMY_TRACK_MODIFICATIONS? [online] Available at: https://stackoverflow.com/questions/33738467/how-do-i-know-if-i-can-disable-sqlalchemy-track-modifications [Accessed 16 Dec. 2023].

flask-sqlalchemy.palletsprojects.com. (n.d.). Flask-SQLAlchemy — Flask-SQLAlchemy Documentation (3.1.x). [online] Available at: https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/.

flask.palletsprojects.com. (n.d.). Welcome to Flask — Flask Documentation (2.1.x). [online] Available at: https://flask.palletsprojects.com/en/2.1.x/.


www.kaggle.com. (n.d.). Average global IQ per country with other stats. [online] Available at: https://www.kaggle.com/datasets/mlippo/average-global-iq-per-country-with-other-stats [Accessed 14 Dec. 2023]

flask.palletsprojects.com. (n.d.). Welcome to Flask — Flask Documentation (2.1.x). [online] Available at: https://flask.palletsprojects.com/en/2.1.x/.

flask-migrate.readthedocs.io. (n.d.). Flask-Migrate — Flask-Migrate documentation. [online] Available at: https://flask-migrate.readthedocs.io/en/latest/ [Accessed 17 Dec. 2023].

Fullstackpython.com. (2010). Flask. [online] Available at: https://www.fullstackpython.com/flask.html.

W3schools.com. (2019). HTML Form Elements. [online] Available at: https://www.w3schools.com/html/html_form_elements.asp.

Mozilla (2019). HTML basics. [online] MDN Web Docs. Available at: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics.

www.chartjs.org. (n.d.). Information | Chart.js. [online] Available at: https://www.chartjs.org/docs/latest/samples/information.html.

Instructure.com. (2023). Login. [online] Available at: https://bootcampspot.instructure.com/courses/4171/external_tools/313 [Accessed 18 Dec. 2023].

Leaflet (2019). Leaflet — an open-source JavaScript library for interactive maps. [online] Leafletjs.com. Available at: https://leafletjs.com/.

developer.mozilla.org. (n.d.). Fetch API - Web APIs | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API.

tobiasahlin.com. (n.d.). 10 Chart.js example charts to get you started. [online] Available at: https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/.

datatracker.ietf.org. (n.d.). RFC 7946 - The GeoJSON Format. [online] Available at: https://datatracker.ietf.org/doc/html/rfc7946.


leafletjs.com. (n.d.). Quick Start Guide - Leaflet - a JavaScript library for interactive maps. [online] Available at: https://leafletjs.com/examples/quick-start/.


GitHub. (2020). seatgeek/fuzzywuzzy. [online] Available at: https://github.com/seatgeek/fuzzywuzzy

flask-sqlalchemy.palletsprojects.com. (n.d.). Flask-SQLAlchemy — Flask-SQLAlchemy Documentation (3.1.x). [online] Available at: https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/.

flask.palletsprojects.com. (n.d.). SQLAlchemy in Flask — Flask Documentation (2.1.x). [online] Available at: https://flask.palletsprojects.com/en/2.1.x/patterns/sqlalchemy/ [Accessed 17 Dec. 2023].

flask.palletsprojects.com. (n.d.). Large Applications as Packages — Flask Documentation (2.1.x). [online] Available at: https://flask.palletsprojects.com/en/2.1.x/patterns/packages/ [Accessed 17 Dec. 2023].
