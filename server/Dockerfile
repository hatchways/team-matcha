FROM python:3.7.2-alpine


# install dependencies
# pipenv is another tool that allows you to maintain logical dependencies
# (in a Pipfile) and pinned dependencies (in a Pipfile.lock).
RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile* /tmp/
RUN cd /tmp && pipenv lock --requirements > requirements.txt
RUN pip install -r /tmp/requirements.txt

# Set Enviornment Variables

#Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1

#Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED 1


COPY . /usr/src/app

WORKDIR /usr/src/app

