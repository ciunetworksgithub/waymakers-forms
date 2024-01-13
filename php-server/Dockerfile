# Use an official PHP image with Apache
FROM php:7.4-apache

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy virtual host conf
COPY 000-default.conf /etc/apache2/sites-available/

# Copy PHP files to the Apache document root
COPY ./src/ /var/www/html/

# Set the working directory
WORKDIR /var/www/html/
