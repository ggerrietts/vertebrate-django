# INTRODUCTION

This project is a lightweight application designed to showcase Django and
Backbone.js integration. It's not in any way intended to be industrial-strength,
security-hardened, or state-of-the-art. It has been pared down to illustrate
concepts with as little noise as possible.

The project evolves over the course of the branches.


# REQUIREMENTS

I've included a requirements.txt file, but really the only hard and fast requirements
are Python and Django. I've tried to keep the Python and the Django relatively portable,
but I think I'm using the json library, which suggests 2.6 or newer. On a UNIXy system, 
you can get this up and running by doing something like the following:

1. sudo easy_install -U pip
2. sudo pip install -U virtualenv
3. mkdir $HOME/pythons
4. pushd $HOME/pythons
5. virtualenv --no-site-packages spiney
6. popd
7. ln -s $HOME/pythons/spiney/bin/activate
8. source ./activate
9. pip install ./requirements.txt

At that point you should be able to python manage.py startapp and have everything running.


# OVERVIEW OF BRANCHES

1. *skeleton* is a simple foundation for REST-style Django apps. It includes dependencies
   like backbone.js and jquery.
2. *django-emails* installs some Django models, views, URLs, and templates to power the app.
3. *backbone-emails* builds the Javascript layer that makes the basic app operate.
4. *add-delete* adds the ability to delete a row and some validation.
5. *add-edit* adds the ability to edit a row.


# ACKNOWLEDGEMENTS

This project has been put together with a ton of help from a lot of people.

It's using the Silk icons from FAMFAMFAM (http://www.famfamfam.com/).

I've taken a lot of advice from my colleagues.


