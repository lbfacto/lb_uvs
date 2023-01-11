# We will use python:3.10-alpine as the base image for building the Flask container
FROM python:3.8-alpine


# copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt
# It specifies the working directory where the Docker container will run
WORKDIR /app
# Copying all the application files to the working directory
COPY . .
# Install all the dependencies required to run the Flask application
RUN pip install -r requirements.txt
# Expose the Docker container for the application to run on port 5000
EXPOSE 5000
# The command required to run the Dockerized application
#entrypoint
ENTRYPOINT [ "python" ]
CMD ["main.py"]


